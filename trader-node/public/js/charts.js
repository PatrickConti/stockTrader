async function getPortfolios() {
  let portfolios = await axios.get('/api/portfolios');
  portfolios = portfolios.data.ISTPOMAOperationResponse.ist_portfolio_manager.portfolioOutput
  //console.log("Hello")
  console.log(portfolios)

  var numPlatinum = 0
  var numGold = 0
  var numSilver = 0
  var numBronze = 0
  var numBasic = 0

  var sumPlatinum = 0
  var sumGold = 0
  var sumSilver = 0
  var sumBronze = 0
  var sumBasic = 0


  for (var i = 0; i < portfolios.length; i++) {
    // portfolios.forEach(function(portfolio){
    let portfolio = portfolios[i]
    if (portfolio.loyalty == "PLATINUM") {
      numPlatinum++
      sumPlatinum = sumPlatinum + portfolio.total
    }
    if (portfolio.loyalty == "GOLD") {
      numGold++
      sumGold = sumGold + portfolio.total
    }
    if (portfolio.loyalty == "SILVER") {
      numSilver++
      sumSilver = sumSilver + portfolio.total
    }
    if (portfolio.loyalty == "BRONZE") {
      numBronze++
      sumBronze = sumBronze + portfolio.total
    }
    if (portfolio.loyalty == "BASIC") {
      numBasic++
      sumBasic = sumBasic + portfolio.total
    }

    if (portfolio.total > 0 || portfolio.owner.length > 0) {
      addPortfolioToTable(i + 1, portfolio)
    }
  }

  var ctxP = document.getElementById("pieChart").getContext('2d');
  var myPieChart = new Chart(ctxP, {
      type: 'pie',
      data: {
          datasets: [
              {
                  data: [numPlatinum, numGold, numSilver, numBronze, numBasic],
                  //data: [300, 50, 100, 40, 120],
                  backgroundColor: ["#E5E4E2", "#C5B358", "#C0C0C0", "#CD7F32", "#000000"],
                  hoverBackgroundColor: ["#E5E4E2", "#C5B358", "#C0C0C0", "#CD7F32", "#000000"]
              }
          ],

          labels: [
            'Platinum',
            'Gold',
            'Silver',
            'Bronze',
            'Basic'
            //'Other'
          ]
      },
      options: {
          responsive: true
      }
  });

if(numPlatinum == 0){
  avgPlatinum = 0
}
else {
  avgPlatinum = (sumPlatinum/numPlatinum).toFixed(2)
}
if(numGold == 0){
  avgGold = 0
}
else {
  avgGold = (sumGold/numGold).toFixed(2)
}
if(numSilver == 0){
  avgSilver = 0
}
else {
  avgSilver = (sumSilver/numSilver).toFixed(2)
}
if(numBronze == 0){
  avgBronze = 0
}
else {
  avgBronze = (sumBronze/numBronze).toFixed(2)
}
if(numBasic == 0){
  avgBasic = 0
}
else {
  avgBasic = (sumBasic/numBasic).toFixed(2)
}

  //avgGold = sumGold/numGold
  //avgSilver = sumSilver/numSilver
  //avgBronze = sumBronze/numBronze
  //avgBasic = sumBasic/numBasic

  //console.log(avgPlatinum)
  //console.log(avgGold)
  //console.log(avgSilver)
  //console.log(avgBronze)
  //console.log(avgBasic)


  // Line
  /*var ctx = document.getElementById("myChart").getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ["Platinum", "Gold", "Silver", "Bronze", "Basic"],
          datasets: [{
              label: 'Total Average of Loyalty',
              data: [avgPlatinum, avgGold, avgSilver, avgBronze, avgBasic],
              backgroundColor: [
                  'rgba(229, 228, 226, 0.6)',
                  'rgba(197, 179, 88, 0.6)',
                  'rgba(192, 192, 192, 0.6)',
                  'rgba(205, 127, 50, 0.6)',
                  'rgba(0, 0, 0, 0.6)'
              ],
              borderColor: [
                  'rgba(229, 228, 226, 1)',
                  'rgba(197, 179, 88, 1)',
                  'rgba(192, 192, 192, 1)',
                  'rgba(205, 127, 50, 1)',
                  'rgba(0, 0, 0, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true,
                      min: 0,
                      max: avgGold + 1000
                  }
              }]
          }
      }
  });*/

  // Line
  var ctx = document.getElementById("myChart").getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          //labels: ["Platinum", "Gold", "Silver", "Bronze", "Basic"],
          datasets: [{
              label: 'Platinum Average',
              data: [avgPlatinum],
              backgroundColor: [
                  'rgba(229, 228, 226, 0.6)'
              ],
              borderColor: [
                  'rgba(229, 228, 226, 1)'
              ],
              borderWidth: 1
          },
          {
              label: 'Gold Average',
              data: [avgGold],
              backgroundColor: [
                  'rgba(197, 179, 88, 0.6)'
              ],
              borderColor: [
                  'rgba(197, 179, 88, 1)'
              ],
              borderWidth: 1
          },
          {
              label: 'Silver Average',
              data: [avgSilver],
              backgroundColor: [
                  'rgba(192, 192, 192, 0.6)'
              ],
              borderColor: [
                  'rgba(192, 192, 192, 1)'
              ],
              borderWidth: 1
          },
          {
              label: 'Bronze Average',
              data: [avgBronze],
              backgroundColor: [
                  'rgba(205, 127, 50, 0.6)'
              ],
              borderColor: [
                  'rgba(205, 127, 50, 1)'
              ],
              borderWidth: 1
          },
          {
              label: 'Basic Average',
              data: [avgBasic],
              backgroundColor: [
                  'rgba(0, 0, 0, 0.6)'
              ],
              borderColor: [
                  'rgba(0, 0, 0, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true,
                      min: 0,
                      //max: avgGold + 1000
                  }
              }]
          }
      }
  });

}

getPortfolios()



//console.log(numPlatinum);
//console.log(this.numPlatinum)
//pie


/*
//line
var ctxL = document.getElementById("lineChart").getContext('2d');
var myLineChart = new Chart(ctxL, {
    type: 'line',
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    },
    options: {
        responsive: true
    }
});


//radar
var ctxR = document.getElementById("radarChart").getContext('2d');
var myRadarChart = new Chart(ctxR, {
    type: 'radar',
    data: {
        labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 90, 81, 56, 55, 40]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [28, 48, 40, 19, 96, 27, 100]
            }
        ]
    },
    options: {
        responsive: true
    }
});

//doughnut
var ctxD = document.getElementById("doughnutChart").getContext('2d');
var myLineChart = new Chart(ctxD, {
    type: 'doughnut',
    data: {
        labels: ["Red", "Green", "Yellow", "Grey", "Dark Grey"],
        datasets: [
            {
                data: [300, 50, 100, 40, 120],
                backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
                hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
            }
        ]
    },
    options: {
        responsive: true
    }
});
*/
