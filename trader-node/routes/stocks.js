var express = require('express');
var router = express.Router();

/* GET stocks page. */
router.get('/:owner', function(req, res, next) {
  let owner = req.params.owner
  console.log("Getting portfolio for owner " + owner)

  breadcrumbText = owner + " Stocks"
  res.render('index', {
    title: 'Stock Trader on z/OS',
    breadcrumb: breadcrumbText,
    mainPartial: 'partials/stocks.ejs'
  });
});

module.exports = router;
