//File: controllers/tvshows.js
var mongoose = require('mongoose');
var Category  = mongoose.model('Category');

//GET - Return all tvshows in the DB
var options = {
    "limit": 2
}

exports.findAllCategories = function(req, res) {
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

    

    Category.find(function(err, categories) {
      if(err) {
        res.send(500, err.message);
      }
      console.log('GET /categories')
      res.status(200).jsonp(categories);
      console.log(categories.length);
    });
};

//GET - Return a Category with specified ID
exports.findById = function(req, res) {
    Category.findById(req.params.id, function(err, category) {
      if(err) {
        return res.send(500, err.message);
      }
      console.log('GET /category/' + req.params.id);
      res.status(200).jsonp(category);
    });
};

//POST - Insert a new Category in the DB
exports.addCategory = function(req, res) {
    console.log('POST');
    //console.log(req.body);

    var category = new Category({
        title:    req.body.title,
        description:  req.body.description,
        created_at:  req.body.created_at,
        updated_at:   req.body.updated_at,
        status:    req.body.status
    });

    category.save(function(err, category) {
        if(err) {
          return res.status(500).send( err.message);
        }
        res.status(200).jsonp(category);
    });
};

//PUT - Update a register already exists
exports.updateCategory = function(req, res) {
    Category.findById(req.params.id, function(err, category) {
        if(req.body.title)
          category.title  = req.body.title;
        
        if(req.body.description)
          category.description = req.body.description;
        
        category.updated_at = req.body.updated_at;

        if(req.body.status)
          category.status = req.body.status;

        category.save(function(err) {
            if(err) {
              return res.status(500).send(err.message);
            }
            res.status(200).jsonp(category);
        });
    });
};

//DELETE - Delete a TVShow with specified ID
exports.deleteCategory = function(req, res) {
    Category.findById(req.params.id, function(err, category) {
        category.remove(function(err) {
            if(err) {
              return res.status(500).send(err.message);
            }
            res.status(200).send();
        })
    });
};
