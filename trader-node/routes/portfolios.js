var express = require('express');
var router = express.Router();

/* GET portfolios page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Stock Trader on z/OS',
    breadcrumb: 'Portfolios',
    mainPartial: 'partials/portfolios.ejs'
  });
});


module.exports = router;
