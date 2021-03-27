
$(document).ready(function(){
    window.revenuesGlobalArray = new Array();
    window.netMarins = new Array();
    window.year = new Array();
    window.freeCashflowGlobalArray = new Array();
    window.cashToSalesRatio = new Array();
    requestIncomeStatementData();  
    
    

        
    
});





function requestIncomeStatementData(){
    $( "#Calculate" ).click(function() {

      freeCashflowGlobalArray = 0;
      freeCashflowGlobalArray = new Array();
    
      cashToSalesRatio = 0;
      cashToSalesRatio = new Array();
      revenuesGlobalArray = 0;
      revenuesGlobalArray = new Array();

    var tickerSymbol = String(document.getElementById("tickerSymbol").value).toUpperCase();
    var request = new XMLHttpRequest()
    request.open('GET', 'https://financialmodelingprep.com/api/v3/income-statement/'+tickerSymbol+'?limit=10&apikey=8793a5dd98d50075b3ed2d6ef0f66b4d', true)
    
    request.onload = function () {

      // Begin accessing JSON data here
      var data = JSON.parse(this.response)
      createThreeTables(data,tickerSymbol); //Gets the last 10 Years of Revenues From lowest to highest 
      //addNetMarginTable(netMarins,year);
     
    }
    
    // Send request
    request.send()
      });
    


    


    // Open a new connection, using the GET request on the URL endpoint
   /* 
    
*/
}

/*
* @params Takes in json data from income statement to be used to pull out the last 10 years of revenue data of a company
*/
function createThreeTables(data,tickerSymbol){
    
    var revenueArray = [];
    var dateArray = [];
    var netIncomeArray = [];
    var grossProfitArray = [];
    var freeCashflowArray = [];
    var freeCashflowArrayDate = [];
    var revenueGrowth = [];
    var revenueGrowthDate = [];
    
    //console.log(data);
    addToArrays(data, revenueArray, dateArray, netIncomeArray, grossProfitArray);
    addNetIcomeTable(revenueArray, dateArray, netIncomeArray, grossProfitArray);

    //Gets Cashflow API
    var request = new XMLHttpRequest()
    request.open('GET', 'https://financialmodelingprep.com/api/v3/cash-flow-statement/'+tickerSymbol+'?apikey=8793a5dd98d50075b3ed2d6ef0f66b4d&limit=10', true)
      
    request.onload = function () {
      
      // Begin accessing JSON data here
      var data = JSON.parse(this.response)
      //console.log(data);

      createCashflowTable(data, freeCashflowArray, freeCashflowArrayDate, revenueGrowth, revenueGrowthDate,tickerSymbol)

            
     
    }
    
    // Send request
    request.send()
}
function createCashflowTable(data, freeCashflowArray, freeCashflowArrayDate,revenueGrowth, revenueGrowthDate,tickerSymbol){
    for(var i = data.length-1; i >= 0; i--)
    {
      freeCashflowArray.push(data[i]["freeCashFlow"]);
      freeCashflowArrayDate.push(data[i]["date"].substring(0, 4));
      freeCashflowGlobalArray.push(data[i]["freeCashFlow"]);
     


    }
    freeCashflowGlobalArray = freeCashflowArray;
    console.log(freeCashflowGlobalArray.length);
    document.getElementById("CashflowTable").innerHTML = '<table class="table table-dark">'+
    '<thead>'+
      '<tr>'+
        '<th scope="col">Year</th>'+
        '<th scope="col">'+freeCashflowArrayDate[0]+'</th>'+
        '<th scope="col">'+freeCashflowArrayDate[1]+'</th>'+
        '<th scope="col">'+freeCashflowArrayDate[2]+'</th>'+
        '<th scope="col">'+freeCashflowArrayDate[3]+'</th>'+
        '<th scope="col">'+freeCashflowArrayDate[4]+'</th>'+
        '<th scope="col">'+freeCashflowArrayDate[5]+'</th>'+
        '<th scope="col">'+freeCashflowArrayDate[6]+'</th>'+
        '<th scope="col">'+freeCashflowArrayDate[7]+'</th>'+
        '<th scope="col">'+freeCashflowArrayDate[8]+'</th>'+
        '<th scope="col">'+freeCashflowArrayDate[9]+'</th>'+
      '</tr>'+
    '</thead>'+
    '<tbody>'+
      '<tr>'+
        '<th scope="row">Free CashFlows</th>'+
        '<td>'+freeCashflowArray[0]+'</td>'+
        '<td>'+freeCashflowArray[1]+'</td>'+
        '<td>'+freeCashflowArray[2]+'</td>'+
        '<td>'+freeCashflowArray[3]+'</td>'+
        '<td>'+freeCashflowArray[4]+'</td>'+
        '<td>'+freeCashflowArray[5]+'</td>'+
        '<td>'+freeCashflowArray[6]+'</td>'+
        '<td>'+freeCashflowArray[7]+'</td>'+
        '<td>'+freeCashflowArray[8]+'</td>'+
        '<td>'+freeCashflowArray[9]+'</td>'+
      '</tr>'+
    '</tbody>'+
  '</table>'
  
  var request = new XMLHttpRequest()
  request.open('GET', 'https://financialmodelingprep.com/api/v3/income-statement-growth/'+tickerSymbol+'?apikey=8793a5dd98d50075b3ed2d6ef0f66b4d&limit=10', true)
    
  request.onload = function () {
    
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
    for(var i = data.length-1; i >= 0; i--)
    {
      revenueGrowth.push(parseFloat(data[i]["growthRevenue"]* 100).toFixed(2))
      revenueGrowthDate.push(data[i]["date"].substring(0, 4))
    }

    document.getElementById("GrowthTable").innerHTML = '<table class="table table-dark">'+
    '<thead>'+
      '<tr>'+
        '<th scope="col">Year</th>'+
        '<th scope="col">'+revenueGrowthDate[0]+'</th>'+
        '<th scope="col">'+revenueGrowthDate[1]+'</th>'+
        '<th scope="col">'+revenueGrowthDate[2]+'</th>'+
        '<th scope="col">'+revenueGrowthDate[3]+'</th>'+
        '<th scope="col">'+revenueGrowthDate[4]+'</th>'+
        '<th scope="col">'+revenueGrowthDate[5]+'</th>'+
        '<th scope="col">'+revenueGrowthDate[6]+'</th>'+
        '<th scope="col">'+revenueGrowthDate[7]+'</th>'+
        '<th scope="col">'+revenueGrowthDate[8]+'</th>'+
        '<th scope="col">'+revenueGrowthDate[9]+'</th>'+
      '</tr>'+
    '</thead>'+
    '<tbody>'+
      '<tr>'+
        '<th scope="row">Revenue Growth</th>'+
        '<td>'+revenueGrowth[0]+'</td>'+
        '<td>'+revenueGrowth[1]+'</td>'+
        '<td>'+revenueGrowth[2]+'</td>'+
        '<td>'+revenueGrowth[3]+'</td>'+
        '<td>'+revenueGrowth[4]+'</td>'+
        '<td>'+revenueGrowth[5]+'</td>'+
        '<td>'+revenueGrowth[6]+'</td>'+
        '<td>'+revenueGrowth[7]+'</td>'+
        '<td>'+revenueGrowth[8]+'</td>'+
        '<td>'+revenueGrowth[9]+'</td>'+
      '</tr>'+
    '</tbody>'+
  '</table>'
  }

  addNetMarginTable(netMarins,year);
  
      // Send request
      request.send()
}
function addToArrays(data, revenueArray, dateArray, netIncomeArray, grossProfitArray)
{
  for(var i = data.length-1; i >= 0; i--)
  {
      revenueArray.push(data[i]["revenue"]);
      revenuesGlobalArray.push(data[i]["revenue"]);
      dateArray.push(data[i]["date"].substring(0, 4));
      netIncomeArray.push(data[i]["netIncome"]);
      grossProfitArray.push(data[i]["grossProfit"]);
      netMarins.push(parseFloat(data[i]["netIncome"]/data[i]["revenue"] * 100).toFixed(2));
      year.push(data[i]["date"].substring(0, 4));

  }
    
}

function addNetIcomeTable(revenueArray , dateArray, netIncomeArray, grossProfitArray){
document.getElementById("RevenueGrowth").innerHTML = '<table class="table table-dark">'+
  '<thead>'+
    '<tr>'+
      '<th scope="col">Year</th>'+
      '<th scope="col">'+dateArray[0]+'</th>'+
      '<th scope="col">'+dateArray[1]+'</th>'+
      '<th scope="col">'+dateArray[2]+'</th>'+
      '<th scope="col">'+dateArray[3]+'</th>'+
      '<th scope="col">'+dateArray[4]+'</th>'+
      '<th scope="col">'+dateArray[5]+'</th>'+
      '<th scope="col">'+dateArray[6]+'</th>'+
      '<th scope="col">'+dateArray[7]+'</th>'+
      '<th scope="col">'+dateArray[8]+'</th>'+
      '<th scope="col">'+dateArray[9]+'</th>'+
    '</tr>'+
  '</thead>'+
  '<tbody>'+
    '<tr>'+
      '<th scope="row">Revenues</th>'+
      '<td>'+revenueArray[0]+'</td>'+
      '<td>'+revenueArray[1]+'</td>'+
      '<td>'+revenueArray[2]+'</td>'+
      '<td>'+revenueArray[3]+'</td>'+
      '<td>'+revenueArray[4]+'</td>'+
      '<td>'+revenueArray[5]+'</td>'+
      '<td>'+revenueArray[6]+'</td>'+
      '<td>'+revenueArray[7]+'</td>'+
      '<td>'+revenueArray[8]+'</td>'+
      '<td>'+revenueArray[9]+'</td>'+
    '</tr>'+
    '<tr>'+
      '<th scope="row">Net Income</th>'+
      '<td>'+netIncomeArray[0]+'</td>'+
      '<td>'+netIncomeArray[1]+'</td>'+
      '<td>'+netIncomeArray[2]+'</td>'+
      '<td>'+netIncomeArray[3]+'</td>'+
      '<td>'+netIncomeArray[4]+'</td>'+
      '<td>'+netIncomeArray[5]+'</td>'+
      '<td>'+netIncomeArray[6]+'</td>'+
      '<td>'+netIncomeArray[7]+'</td>'+
      '<td>'+netIncomeArray[8]+'</td>'+
      '<td>'+netIncomeArray[9]+'</td>'+
    '</tr>'+
    '<tr>'+
      '<th scope="row">Gross Profit</th>'+
      '<td>'+grossProfitArray[0]+'</td>'+
      '<td>'+grossProfitArray[1]+'</td>'+
      '<td>'+grossProfitArray[2]+'</td>'+
      '<td>'+grossProfitArray[3]+'</td>'+
      '<td>'+grossProfitArray[4]+'</td>'+
      '<td>'+grossProfitArray[5]+'</td>'+
      '<td>'+grossProfitArray[6]+'</td>'+
      '<td>'+grossProfitArray[7]+'</td>'+
      '<td>'+grossProfitArray[8]+'</td>'+
      '<td>'+grossProfitArray[9]+'</td>'+
    '</tr>'+
  '</tbody>'+
'</table>'
     
    
}

function addNetMarginTable(netMarins, year){

  for(var i = 0; i < freeCashflowGlobalArray.length; i++)
  {
    cashToSalesRatio.push(parseFloat(freeCashflowGlobalArray[i]/revenuesGlobalArray[i] * 100).toFixed(2));
      

  }
 
 

  
  document.getElementById("moatMetrics").innerHTML = '<table class="table table-dark">'+
    '<thead>'+
      '<tr>'+
        '<th scope="col">Year</th>'+
        '<th scope="col">'+year[0]+'</th>'+
        '<th scope="col">'+year[1]+'</th>'+
        '<th scope="col">'+year[2]+'</th>'+
        '<th scope="col">'+year[3]+'</th>'+
        '<th scope="col">'+year[4]+'</th>'+
        '<th scope="col">'+year[5]+'</th>'+
        '<th scope="col">'+year[6]+'</th>'+
        '<th scope="col">'+year[7]+'</th>'+
        '<th scope="col">'+year[8]+'</th>'+
        '<th scope="col">'+year[9]+'</th>'+
      '</tr>'+
    '</thead>'+
    '<tbody>'+
      '<tr>'+
        '<th scope="row">Net Margins</th>'+
        '<td>'+netMarins[0]+'</td>'+
        '<td>'+netMarins[1]+'</td>'+
        '<td>'+netMarins[2]+'</td>'+
        '<td>'+netMarins[3]+'</td>'+
        '<td>'+netMarins[4]+'</td>'+
        '<td>'+netMarins[5]+'</td>'+
        '<td>'+netMarins[6]+'</td>'+
        '<td>'+netMarins[7]+'</td>'+
        '<td>'+netMarins[8]+'</td>'+
        '<td>'+netMarins[9]+'</td>'+
      '</tr>'+
      '<tr>'+
      '<th scope="row">Cash To Sales Ratio</th>'+
      '<td>'+cashToSalesRatio[0]+'</td>'+
      '<td>'+cashToSalesRatio[1]+'</td>'+
      '<td>'+cashToSalesRatio[2]+'</td>'+
      '<td>'+cashToSalesRatio[3]+'</td>'+
      '<td>'+cashToSalesRatio[4]+'</td>'+
      '<td>'+cashToSalesRatio[5]+'</td>'+
      '<td>'+cashToSalesRatio[6]+'</td>'+
      '<td>'+cashToSalesRatio[7]+'</td>'+
      '<td>'+cashToSalesRatio[8]+'</td>'+
      '<td>'+cashToSalesRatio[9]+'</td>'+
    '</tr>'+

    '</tbody>'+
  '</table>'
   netMarins.length=0;
   year.length=0;     
  netMarins = new Array();
  year = new Array();
  }