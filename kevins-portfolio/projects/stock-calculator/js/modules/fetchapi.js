import * as PageComponents from "./components.js";
//api
//28c1b1a5d13224c0631e01c01dd92c2c
//7208a8f188376ca532027e8143ecce9a
let apikey = "28c1b1a5d13224c0631e01c01dd92c2c";

//Financial statements
let incomeStatement;
let cashFlowStatement;
let balanceSheetStatement;

//Growth Charts
let chart;
let chartTwo;
let chartThree;

//Moat charts
let chartFive;
let chartSix;
let chartSeven;
let chartEight;

//debt metrics
let chartNine;
let chartTen;
let chartEleven;

//Growth Arrays
let newDataPoint = [];
let revenueGrowthArray = [];
let netIncomeGrowthArray = [];
let epsGrowthArray = [];

//moat
let cashToSalesRatioArray = [];
let netMarginArray = [];
let returnOnAssets = [];
let returnOnEquityArray = [];

//debt metrics
let currentRatioArray = [];
let ebitArray = [];
let interestCoverageRatioArray = [];
let equityMultiplierArray = [];

export const renderAllCharts = function (stockSymbol) {
  createCharts();
  fetch(fetchIncomeStatementData(stockSymbol, apikey))
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      incomeStatement = data; //Stores income statement

      storeGrowth(incomeStatement, revenueGrowthArray, "revenue"); //Stores revenue growth
      storeGrowth(incomeStatement, netIncomeGrowthArray, "netIncome"); //Stores netIncome Growth
      storeGrowth(incomeStatement, epsGrowthArray, "eps"); //Store eps growth
      storeEbitArray(incomeStatement);
      storeInterestCoverageRatio(ebitArray, incomeStatement);
      storeMoatMetricInArray(
        incomeStatement,
        "revenue",
        incomeStatement,
        netMarginArray,
        "netIncome"
      ); //Store net margins in an array

      return fetch(fetchCashflowStatementData(stockSymbol, apikey));
    })
    .then((response) => response.json())
    .then((cashFlowData) => {
      cashFlowStatement = cashFlowData; //Stores cashflow statement

      storeMoatMetricInArray(
        incomeStatement,
        "revenue",
        cashFlowStatement,
        cashToSalesRatioArray,
        "freeCashFlow"
      ); //Stores Cash to sales ratio in an array
      return fetch(fetchBalancesheetData(stockSymbol, apikey));
    })
    .then((data) => data.json())
    .then((balanceSheetData) => {
      balanceSheetStatement = balanceSheetData; // stores balancesheet statement

      storeEquityMultiplier(balanceSheetStatement, equityMultiplierArray);
      storeMoatMetricInArray(
        balanceSheetStatement,
        "totalAssets",
        incomeStatement,
        returnOnAssets,
        "netIncome"
      ); //stores Return on Assets in an array

      storeMoatMetricInArray(
        balanceSheetStatement,
        "totalStockholdersEquity",
        incomeStatement,
        returnOnEquityArray,
        "netIncome"
      ); //stores Return on Equity in an array

      storeDebtMetricInArray(
        balanceSheetStatement,
        "totalCurrentLiabilities",
        balanceSheetStatement,
        currentRatioArray,
        "totalCurrentAssets"
      ); //stores Return on Assets in an array
    })
    .catch((err) => {
      PageComponents.hideLoadingAll();
      console.error(`${err} 💥`);
    })
    .finally(() => {
      insertDataToCharts();
      renderTitles();
      renderCharts();

      clearAllArrays();

      hideLoadingScreen();
    });
};

///////////////////helper methods////////////////////////////////////////////

/*
 * Creates a chart object with no data to be displayed
 * Datapoint - Data point takes in an array of objects {Y: number, Label: Date date}
 */
const chartObject = {
  animationEnabled: true,
  theme: "light2", // "light1", "light2", "dark1", "dark2"
  title: {
    text: "Top Oil Reserves",
  },
  axisY: {
    title: "Percentage/year",
  },

  data: [
    {
      type: "column",
      showInLegend: true,
      legendMarkerColor: "grey",
      legendText: "Measures Annual growth",
      dataPoints: [],
    },
  ],
};

/*
 * Creates a new instance of the chart object to be used in a new chart.
 */
function createDeepCopy(chartObject) {
  let createDeepCopyOfObject = JSON.parse(JSON.stringify(chartObject));
  return createDeepCopyOfObject;
}
/***********Financial statement URLs*************/

function fetchIncomeStatementData(stockSymbol, apikey) {
  return `https://financialmodelingprep.com/api/v3/income-statement/${stockSymbol.toUpperCase()}?limit=10&apikey=${apikey}`;
}

function fetchCashflowStatementData(stockSymbol, apikey) {
  return `https://financialmodelingprep.com/api/v3/cash-flow-statement/${stockSymbol.toUpperCase()}?limit=10&apikey=${apikey}`;
}

function fetchBalancesheetData(stockSymbol, apikey) {
  return `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${stockSymbol.toUpperCase()}?limit=10&apikey=${apikey}`;
}

/***********ARRAYS*************/

/*
* Creates a resuable function that stores the growth calculations into an array
  @params - Incomestatement: takes in the income statement fetch from API
  @params - growthArray takes in an array to store calculations from incomesatement. I.E calculates revenue growth from one year to  the nex and stores it in growth array params
  @params - lineItem Takes in index name of the income statement. I.E if you want the revenue thats stored when we fetch the income statement api we put in revenues in line item

*/
function storeGrowth(incomeStatement, growthArray, lineItem) {
  for (let i = 0; i < incomeStatement.length - 1; i++) {
    growthArray.push(
      calculateGrowth(
        incomeStatement[i + 1][lineItem],
        incomeStatement[i][lineItem]
      )
    );
  }
}

/*
* Creates a resuable function that replaces a certain chart with new data
  @params - newDataPoint new array to be put inside of the charts
  @params - array takes in the array of calculations. I.E if you are working on the revenue growth charts then pass it the revenue growth array
  @params - statementArray takes in the financial statement. Usually its the income statement
  @Params - current chart takes in the chart that you are changing

*/
function replaceDatapointForCharts(
  newDataPoint,
  array,
  statementArray,
  currentChart
) {
  for (let i = 0; i < array.length; i++) {
    newDataPoint.push({ y: array[i], label: statementArray[i].date });
  }
  currentChart.options.data[0].dataPoints = newDataPoint.reverse();
}

/*
* Creates a resuable function that calculates the growth using two numbers
  @params - originalNumber starting number or last years number
  @params - newNumber how much that unit has growth/current years numbers

*/
function calculateGrowth(originalNumber, newNumber) {
  return parseFloat(
    (((newNumber - originalNumber) / originalNumber) * 100).toFixed(2)
  );
}

/*
* Creates a resuable function that calculates the moat metrics 
  @params - incomeStatement takes in an incomestatement
  @params - incomeStatementLineItem takes the line you want to grab from the financialStatement data I.E revenue line or netIncome line
  @params - financialStatementTwo takes in a financial statement
  @params - moatArray the array to store the moat calculations
  @params - lineItem takes the line you want to grab from the financialStatement data I.E revenue line or netIncome line

*/
function storeMoatMetricInArray(
  incomeStatement,
  incomeStatementLineItem,
  financialStatementTwo,
  moatArray,
  lineItem
) {
  for (let i = 0; i < incomeStatement.length; i++) {
    moatArray.push(
      calculateMoatMetric(
        incomeStatement[i][incomeStatementLineItem],
        financialStatementTwo[i][lineItem],
        lineItem
      )
    );
  }
}

/*
* Creates a resuable function that calculates the moat metrics 
  @params - incomeStatement takes in an incomestatement
  @params - incomeStatementLineItem takes the line you want to grab from the financialStatement data I.E revenue line or netIncome line
  @params - financialStatementTwo takes in a financial statement
  @params - moatArray the array to store the moat calculations
  @params - lineItem takes the line you want to grab from the financialStatement data I.E revenue line or netIncome line

*/
function storeDebtMetricInArray(
  incomeStatement,
  incomeStatementLineItem,
  financialStatementTwo,
  moatArray,
  lineItem
) {
  for (let i = 0; i < incomeStatement.length; i++) {
    moatArray.push(
      calculateDebtMetric(
        incomeStatement[i][incomeStatementLineItem],
        financialStatementTwo[i][lineItem],
        lineItem
      )
    );
  }
}

/*
* Creates a resuable function that calculates the EBIT from the incomestatement
  @params - incomeStatement takes in an incomestatement

*/
function storeEbitArray(incomeStatement) {
  for (let i = 0; i < incomeStatement.length; i++) {
    ebitArray.push(
      calculateEbit(
        incomeStatement[i].netIncome,
        incomeStatement[i].incomeTaxExpense,
        incomeStatement[i].interestExpense
      )
    );
  }
}

/*
* Creates a resuable function that calculates the interest Coverage Ratio
  @params - incomeStatement takes in an incomestatement
  @params - ebitArray takes in an ebitArray to store the calculations

*/
function storeInterestCoverageRatio(ebitArray, incomeStatement) {
  for (let i = 0; i < ebitArray.length; i++) {
    interestCoverageRatioArray.push(
      calculateDivideTwoNumbers(
        ebitArray[i],
        incomeStatement[i].interestExpense
      )
    );
  }
}

//create
//totalAssetst/totalShareholdersEquity

/*
* Creates a resuable function that calculates and stores the equityMultiplier into an array
  @params - balancesheet takes in a balancesheet array
  @params - equityMultiplierArray takes in an equityMultiplierArray to store the calculations

*/

function storeEquityMultiplier(balancesheet, equityMultiplierArray) {
  for (let i = 0; i < balancesheet.length; i++) {
    equityMultiplierArray.push(
      calculateDivideTwoNumbers(
        balancesheet[i].totalAssets,
        balancesheet[i].totalStockholdersEquity
      )
    );
  }
}
/*************calculations******************************** */
/*
* Creates a resuable function that calculates and stores the equityMultiplier into an array
  @params - numerator takes in int for the numberator
  @params - denominator takes in int for the Denominator

*/
function calculateDivideTwoNumbers(numerator, denominator) {
  return parseFloat((numerator / denominator).toFixed(2));
}
//netincome + incomeTaxExpense + interestExpense = ebit
//Ebit/interestExpense

/*
* Creates a resuable function that calculates and stores the Debt metrics into an array
  @params - financialStatementTwoNumber takes in int for the numberator
  @params - incomeStatement takes in int for the Denominator

*/
function calculateDebtMetric(incomeStatement, financialStatementTwoNumber) {
  return parseFloat((financialStatementTwoNumber / incomeStatement).toFixed(2));
}

/*
* Creates a  function that calculates the EBIT
  @params - netincome takes in netincome
  @params - incomeTaxExpense takes in tax expense line
  @params - interestExpense takes in interest expense line

*/
function calculateEbit(netincome, incomeTaxExpense, interestExpense) {
  return parseFloat(
    (netincome + incomeTaxExpense + interestExpense).toFixed(2)
  );
}

function calculateMoatMetric(incomeStatement, financialStatementTwoNumber) {
  return parseFloat(
    ((financialStatementTwoNumber / incomeStatement) * 100).toFixed(2)
  );
}

/*
 * Creates a  function that clears all growth, moat metrics, and debt arrays
 */
function clearAllArrays() {
  revenueGrowthArray = [];
  netIncomeGrowthArray = [];
  epsGrowthArray = [];
  cashToSalesRatioArray = [];
  netMarginArray = [];
  returnOnAssets = [];
  returnOnEquityArray = [];
  currentRatioArray = [];
  ebitArray = [];
  interestCoverageRatioArray = [];
  equityMultiplierArray = [];
}
/***********Chart*************/
/*
 * Creates all the charts so they exisit but does not display them. These charts also do not have any data in their datapoint array index
 */
export function createCharts() {
  chart = new CanvasJS.Chart("chartContainer", createDeepCopy(chartObject));
  chartTwo = new CanvasJS.Chart("chartContainer2", createDeepCopy(chartObject));
  chartThree = new CanvasJS.Chart(
    "chartContainer3",
    createDeepCopy(chartObject)
  );

  chartFive = new CanvasJS.Chart(
    "chartContainer5",
    createDeepCopy(chartObject)
  );
  chartSix = new CanvasJS.Chart("chartContainer6", createDeepCopy(chartObject));
  chartSeven = new CanvasJS.Chart(
    "chartContainer7",
    createDeepCopy(chartObject)
  );
  chartEight = new CanvasJS.Chart(
    "chartContainer8",
    createDeepCopy(chartObject)
  );

  chartNine = new CanvasJS.Chart(
    "chartContainer9",
    createDeepCopy(chartObject)
  );
  chartTen = new CanvasJS.Chart(
    "chartContainer10",
    createDeepCopy(chartObject)
  );
  chartEleven = new CanvasJS.Chart(
    "chartContainer11",
    createDeepCopy(chartObject)
  );
}

function renderTitles() {
  changeChartTitle(chart, "EPS Growth (Diluted)");
  changeChartTitle(chartTwo, "Net Income Growth");
  changeChartTitle(chartThree, "Revenue Growth: 15-30%+");

  changeChartTitle(chartFive, "Cashflow to Sales: 5%+");
  changeChartTitle(chartSix, "Net Margins: 12-15%+");
  changeChartTitle(chartSeven, "Return on Assets: 7-8%+");
  changeChartTitle(chartEight, "Return on equity: 12-15%+");

  changeChartTitle(chartNine, "Current Ratio: 1.2 - 2");
  changeChartTitle(
    chartTen,
    "Equity Multiplier:(compare with other companies)"
  );
  changeChartTitle(chartEleven, "Interest Coverage: 2+");
}

/*
 * Creates charts and renders them to their divs
 */
export function renderCharts() {
  chart.render();
  chartTwo.render();
  chartThree.render();

  chartFive.render();
  chartSix.render();
  chartSeven.render();
  chartEight.render();

  chartNine.render();
  chartTen.render();
  chartEleven.render();
}

function changeChartTitle(chart, newChartTitle) {
  chart.options.title.text = newChartTitle;
}

function insertDataToCharts() {
  replaceDatapointForCharts(
    newDataPoint,
    revenueGrowthArray,
    incomeStatement,
    chartThree
  );
  newDataPoint = [];
  replaceDatapointForCharts(
    newDataPoint,
    netIncomeGrowthArray,
    incomeStatement,
    chartTwo
  );
  newDataPoint = [];

  replaceDatapointForCharts(
    newDataPoint,
    epsGrowthArray,
    incomeStatement,
    chart
  );
  newDataPoint = [];

  replaceDatapointForCharts(
    newDataPoint,
    cashToSalesRatioArray,
    incomeStatement,
    chartFive
  );
  newDataPoint = [];

  replaceDatapointForCharts(
    newDataPoint,
    netMarginArray,
    incomeStatement,
    chartSix
  );
  newDataPoint = [];

  replaceDatapointForCharts(
    newDataPoint,
    returnOnAssets,
    balanceSheetStatement,
    chartSeven
  );
  newDataPoint = [];

  replaceDatapointForCharts(
    newDataPoint,
    returnOnEquityArray,
    balanceSheetStatement,
    chartEight
  );
  newDataPoint = [];

  replaceDatapointForCharts(
    newDataPoint,
    currentRatioArray,
    balanceSheetStatement,
    chartNine
  );
  newDataPoint = [];

  replaceDatapointForCharts(
    newDataPoint,
    equityMultiplierArray,
    incomeStatement,
    chartTen
  );
  newDataPoint = [];

  replaceDatapointForCharts(
    newDataPoint,
    interestCoverageRatioArray,
    balanceSheetStatement,
    chartEleven
  );
  newDataPoint = [];
}

/*
 * Hides all loading screen components
 */
function hideLoadingScreen() {
  PageComponents.hideLoadingAll();
  PageComponents.showTitles();
  PageComponents.showCharts();
}
