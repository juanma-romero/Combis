var express = require('express');
var router = express.Router();
var ctrolMain = require('../controllers/main');

/* GET home page. */

var homePageController = function (req, res) {
  res.render('index', { title: 'Combis'});
}


router.get('/', ctrolMain.index);

module.exports = router;
