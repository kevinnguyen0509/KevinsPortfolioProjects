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

      storeGrowth(incomeStatement, revenueGrowthArray, "revenue");
      storeGrowth(incomeStatement, netIncomeGrowthArray, "netIncome");
      storeGrowth(incomeStatement, epsGrowthArray, "eps");
      storeEbitArray(incomeStatement);
      storeInterestCoverageRatio(ebitArray, incomeStatement);
      storeMoatMetricInArray(
        incomeStatement,
        "revenue",
        incomeStatement,
        netMarginArray,
        "netIncome"
      );

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
      );
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
      );

      storeMoatMetricInArray(
        balanceSheetStatement,
        "totalStockholdersEquity",
        incomeStatement,
        returnOnEquityArray,
        "netIncome"
      );

      storeDebtMetricInArray(
        balanceSheetStatement,
        "totalCurrentLiabilities",
        balanceSheetStatement,
        currentRatioArray,
        "totalCurrentAssets"
      );

      //Statements: Comment out after
      console.log(incomeStatement);
      console.log(balanceSheetStatement);
      console.log(cashFlowStatement);
    })
    .catch((err) => {
      PageComponents.hideLoadingAll();
      console.error(`${err} 💥`);
    })
    .finally(() => {
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

      console.log("bal");

      renderTitles();
      renderCharts();

      //console.log(revenueGrowthArray);

      clearAllGrowthArray();

      PageComponents.hideLoadingAll();
      PageComponents.showTitles();
      PageComponents.showCharts();
    });
};

///////////////////helper methods////////////////////////////////////////////

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

  console.log(interestCoverageRatioArray.length);
}

function calculateGrowth(originalNumber, newNumber) {
  return parseFloat(
    (((newNumber - originalNumber) / originalNumber) * 100).toFixed(2)
  );
}

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

function storeEquityMultiplier(balancesheet, equityMultiplierArray) {
  for (let i = 0; i < balancesheet.length; i++) {
    equityMultiplierArray.push(
      calculateDivideTwoNumbers(
        balancesheet[i].totalAssets,
        balancesheet[i].totalStockholdersEquity
      )
    );
  }
  console.log("EMA");
  console.log(equityMultiplierArray);
}

function calculateDivideTwoNumbers(numerator, denominator) {
  return parseFloat((numerator / denominator).toFixed(2));
}
//netincome + incomeTaxExpense + interestExpense = ebit
//Ebit/interestExpense

function calculateDebtMetric(incomeStatement, financialStatementTwoNumber) {
  return parseFloat((financialStatementTwoNumber / incomeStatement).toFixed(2));
}

/*************calculations******************************** */
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

function clearAllGrowthArray() {
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
