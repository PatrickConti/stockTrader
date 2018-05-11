var express = require('express');
var router = express.Router();


// name: LOYALTY_HOST
//   value: localhost
// - name: QUOTE_HOST
//   value: localhost
// - name: ZCEE_URL
//   value: https://129.40.117.225:9443
// - name: ZCEE_USER
//   value: HACKR99
// - name: ZCEE_PASS
//   value: HACKR99
// - name: ZCEE_BASE_PATH
//   value: /hackr99

// let ZCEE_URL = "https://129.40.117.225:9443"
// let ZCEE_BASE_PATH = "/hackr99"
// let ZCEE_USER = "HACKR99"
// let ZCEE_PASS = "HACKR99"
// let QUOTE_HOST = "localhost"
// let LOYALTY_HOST = "localhost"

let ZCEE_URL = process.env.ZCEE_URL
let ZCEE_BASE_PATH = process.env.ZCEE_BASE_PATH
let ZCEE_USER = process.env.ZCEE_USER
let ZCEE_PASS = process.env.ZCEE_PASS
let QUOTE_HOST = process.env.QUOTE_HOST
let LOYALTY_HOST = process.env.LOYALTY_HOST

let QUOTE_SERVICE = "http://" + QUOTE_HOST + ":9081/stock-quote";
let LOYALTY_SERVICE = "http://" + LOYALTY_HOST + ":9082/loyalty";

const https = require('https');
var axios = require('axios');
axios = axios.create({
  auth: {
    username: ZCEE_USER,
    password: ZCEE_PASS
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});
// instance.get('https://something.com/foo');


/* GET portfolios listing. */
router.get('/portfolios', async function(req, res, next) {

  
  try{
    let portfolios = await axios.get(ZCEE_URL + ZCEE_BASE_PATH +'/queryPortfolio');
    // console.log("Data: " + JSON.stringify(portfolios.data))
    res.send(portfolios.data)
  }
  catch(err){
    console.error("Error getting portfolios")
    console.error(err)
  }
});



/* View portfolio. */
router.get('/portfolios/:owner', async function(req, res, next) {
  let owner = req.params.owner
  console.log("Viewing portfolio for: " + owner)

  try{
    let portfolio = await axios.get(ZCEE_URL + ZCEE_BASE_PATH +'/viewPortfolio/' + owner);
    res.send(portfolio.data)
  }
  catch(err){
    console.error("Error viewing portfolio for " + owner )
    console.error(err)
  }
});

/* Get portfolio information */
/*router.get('/portfolios/:owner', async function(req, res, next) {
  let owner = req.params.owner
  console.log("Viewing portfolio for: " + owner)

  try{
    let portfolio = await axios.get(ZCEE_URL + ZCEE_BASE_PATH +'/viewPortfolio/' + owner);
    res.send(portfolio.data)
  }
  catch(err){
    console.error("Error viewing portfolio for " + owner )
    console.error(err)
  }
});
*/

/* Get stock information */
/*router.get('/portfolios/:owner', async function(req, res, next) {
  let owner = req.params.owner
  console.log("Viewing portfolio for: " + owner)

  try{
    let portfolio = await axios.get(ZCEE_URL + ZCEE_BASE_PATH +'/viewPortfolio/' + owner);
    res.send(portfolio.data)
  }
  catch(err){
    console.error("Error viewing portfolio for " + owner )
    console.error(err)
  }
});
*/

/* Add portfolio. */
router.post('/portfolios/:owner', async function(req, res, next) {
  let owner = req.params.owner
  console.log("Adding portfolio for: " + owner)

  try{
    let deleteResp = await axios.post(ZCEE_URL + ZCEE_BASE_PATH +'/addPortfolio?owner=' + owner);
    res.send(deleteResp.status)
  }
  catch(err){
    console.error("Error adding portfolio for " + owner )
    console.error(err)
  }
});

/* Delete portfolio. */
router.delete('/portfolios/:owner', async function(req, res, next) {
  let owner = req.params.owner

  try{
    let deleteResp = await axios.delete(ZCEE_URL + ZCEE_BASE_PATH +'/deletePortfolio/' + owner);
    res.send(deleteResp.status)
  }
  catch(err){
    console.error("Error deleting portfolio for " + owner )
    console.error(err)
  }
});


/* Delete portfolio stock. */
router.delete('/portfolios/:owner/:stock', async function(req, res, next) {
  let owner = req.params.owner
  let stock = req.params.stock

  try{
    let deleteResp = await axios.delete(ZCEE_URL + ZCEE_BASE_PATH +'/deleteStock/' + owner + '/' + stock);
    res.send(deleteResp.status)
  }
  catch(err){
    console.error("Error deleting stock " + stock + " from portfolio " + owner )
    console.error(err)
  }
});


/* Add stocks. */
router.post('/stocks/:owner', async function(req, res, next) {
  let owner = req.params.owner
  let symbol = req.query.symbol
  let shares = req.query.shares

  let todayDate = formatDate(new Date())
  console.log("Adding stock for: " + owner)

  try{
    let quandlResp = await axios.get(QUOTE_SERVICE + "/" + symbol)
    let quote = quandlResp.data.price

    let addResp = await axios.post(ZCEE_URL + ZCEE_BASE_PATH + "/addStock?owner="+owner+"&symbol="+symbol+"&shares="+shares+"&quote="+quote+"&dateQuoted="+todayDate);
    // console.log("Adding stock response: " + JSON.stringify(addResp.data))

    let oldLoyalty = addResp.data.ISTPOMAOperationResponse.ist_portfolio_manager.oldLoyalty
    let currentLoyalty = addResp.data.ISTPOMAOperationResponse.ist_portfolio_manager.portfolioInfo.loyalty

    if (oldLoyalty !== "" && oldLoyalty !== currentLoyalty) {
      let loyaltyResp = await axios.get(LOYALTY_SERVICE + "?owner="+owner+"&oldLoyalty="+oldLoyalty+"&currentLoyalty="+currentLoyalty)
      console.log("Sent loyalty update with status code: " + loyaltyResp.status)
    }

    res.send(addResp.status)
  }
  catch(err){
    console.error("Error adding portfolio for " + owner )
    console.error(err)
  }
});

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

module.exports = router;
