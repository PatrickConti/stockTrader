// const axios = require('axios'); // promised based requests - like fetch()
$("#addPortfolioButton").click(async function(){
  let owner = $("#portfolioName").val()
  let portfolio = await axios.post('/api/portfolios/' + owner);
  location.reload()
})

//var numPlatinum = 0
//var numGold = 0
//var numSilver = 0
//var numBasic = 0

async function getPortfolios() {
  let portfolios = await axios.get('/api/portfolios');
  portfolios = portfolios.data.ISTPOMAOperationResponse.ist_portfolio_manager.portfolioOutput
  //console.log("Hello")
  console.log(portfolios)

  for (var i = 0; i < portfolios.length; i++) {
    // portfolios.forEach(function(portfolio){
    let portfolio = portfolios[i]
    /*
    if (portfolio.loyalty == "PLATINUM") {
      numPlatinum++
    }
    if (portfolio.loyalty == "GOLD") {
      numGold++
    }
    if (portfolio.loyalty == "SILVER") {
      numSilver++
    }
    if (portfolio.loyalty == "BASIC") {
      numBasic++
    }
````*/
    if (portfolio.total > 0 || portfolio.owner.length > 0) {
      addPortfolioToTable(i + 1, portfolio)
    }
  }
  //console.log("Number of Platinums: " + numPlatinum + "\n")
  //console.log("Number of Gold: " + numGold + "\n")
  //console.log("Number of Silvers: " + numSilver + "\n")
  //console.log("Number of Basics: " + numBasic + "\n")
}

function addPortfolioToTable(i, portfolio) {
  console.log("Adding row for: " + JSON.stringify(portfolio))
  let $tr = $("<tr></tr>")
  $tr.append("<th scope='row'>" + i + "</th>")
  $tr.append("<td><a href='/stocks/" + portfolio.owner + "'>" + portfolio.owner + "</a></td>")
  $tr.append("<td> $" + portfolio.total + "</td>")
  $tr.append("<td>" + portfolio.loyalty + "</td>")

  let $actionsTD = $("<td class='text-right'></td>")
  let $deleteIcon = $('<i class="fa fa-times fa-lg mr-3"></i>')
  $deleteIcon.click(async function() {
    let portfolios = await axios.delete('/api/portfolios/' + portfolio.owner);
    location.reload();
  })
  $actionsTD.append($deleteIcon)
  $tr.append($actionsTD)
  $("#portfolios tbody").append($tr)
}

getPortfolios()
