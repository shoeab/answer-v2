var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    mongoose = require('mongoose');

    // Connection to DB
    mongoose.connect('mongodb://localhost/priyo_answer_v1', function(err, res) {
      if(err) throw err;
      console.log('Connected to Database');
    });

    // Middlewares
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    // Import Models and controllers
    var models     = require('./models/tvshow')(app, mongoose);
    var TVShowCtrl = require('./controllers/tvshows');

    var models     = require('./models/question')(app, mongoose);
    var Question = require('./controllers/questions');

    // Example Route
    var router = express.Router();
    router.get('/', function(req, res) {
      res.send("Hello world!");
    });
    app.use(router);

    // API routes
    var tvshows = express.Router();

    tvshows.route('/tvshows')
      .get(TVShowCtrl.findAllTVShows)
      .post(TVShowCtrl.addTVShow);

    tvshows.route('/tvshows/:id')
      .get(TVShowCtrl.findById)
      .put(TVShowCtrl.updateTVShow)
      .delete(TVShowCtrl.deleteTVShow);

    app.use('/api', tvshows);

    var questions = express.Router();

    questions.route('/questions/:limit/:skip')
      .get(Question.findAllQuestions)
      .post(Question.addQuestion);

    questions.route('/questions/:id')
      .get(Question.findById)
      .put(Question.updateQuestion)
      .delete(Question.deleteQuestion);

    app.use('/api', questions);

    // Start server
    app.listen(3000, function() {
      console.log("Node server running on http://localhost:3000");
    });
