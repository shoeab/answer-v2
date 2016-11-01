//File: controllers/tvshows.js
var mongoose = require('mongoose');
var Question  = mongoose.model('Question');

//GET - Return all tvshows in the DB
var options = {
    "limit": 2
}

exports.findAllQuestions = function(req, res) {
    /*console.log(req.params.skip);
    console.log(req.params.limit);*/
    if(req.params.skip==undefined)
      var skip = 0;
    else
      var skip = parseInt(req.params.skip);
    // isNaN(req.params.skip) ? skip=0 : skip = skip;
    if(req.params.limit==undefined)
       var limit = 10;
    else
      var limit = parseInt(req.params.limit);
    // isNaN(req.params.limit) ? limit=10 : limit = limit;

    

    Question.find(function(err, questions) {
      if(err) {
        res.send(500, err.message);
      }
      console.log('GET /questions')
      res.status(200).jsonp(questions);
      console.log(questions.length);
    }).skip(skip).limit(limit).sort({created_at:-1});
};

//GET - Return a Question with specified ID
exports.findById = function(req, res) {
    Question.findById(req.params.id, function(err, question) {
      if(err) {
        return res.send(500, err.message);
      }
      console.log('GET /question/' + req.params.id);
      res.status(200).jsonp(question);
    });
};

//POST - Insert a new Question in the DB
exports.addQuestion = function(req, res) {
    console.log('POST');
    //console.log(req.body);

    var question = new Question({
        title:    req.body.title,
        description:  req.body.description,
        created_at:  req.body.created_at,
        updated_at:   req.body.updated_at,
        category:  req.body.category,
        status:    req.body.status,
        summary:  req.body.summary
    });

    question.save(function(err, question) {
        if(err) {
          return res.status(500).send( err.message);
        }
        res.status(200).jsonp(question);
    });
};

//PUT - Update a register already exists
exports.updateQuestion = function(req, res) {
    Question.findById(req.params.id, function(err, question) {
      if(req.body.title)
        question.title   = req.body.title;

      if(req.body.description)
        question.description    = req.body.description;

        question.updated_at = Date.now();

      if(typeof(req.body.category)=='string')
        var cat = JSON.parse(req.body.category);
      else if(typeof(req.body.category)=='object')
        question.category  = req.body.category;
      
      if(req.body.category)
        question.category  = cat;
      

      if(req.body.status)
        question.status = req.body.status;

      if(req.body.summary)
        question.summary = req.body.summary;

        question.save(function(err) {
            if(err) {
              return res.status(500).send(err.message);
            }
            res.status(200).jsonp(question);
        });
    });
};

//DELETE - Delete a TVShow with specified ID
exports.deleteQuestion = function(req, res) {
    Question.findById(req.params.id, function(err, question) {
        question.remove(function(err) {
            if(err) {
              return res.status(500).send(err.message);
            }
            res.status(200).send();
        })
    });
};
