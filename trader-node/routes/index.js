var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', {
  //   title: 'Stock Trader on z/OS',
  //   breadcrumb: 'Portfolios',
  //   mainPartial: 'partials/examples.ejs'
  // });
  res.redirect('/portfolios')
});

module.exports = router;
