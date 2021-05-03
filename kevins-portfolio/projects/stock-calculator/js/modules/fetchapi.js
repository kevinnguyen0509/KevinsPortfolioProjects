import * as PageComponents from "./components.js";
//api
let apikey = "8793a5dd98d50075b3ed2d6ef0f66b4d";

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

export const renderAllCharts = function (stockSymbol) {
  createCharts();
  fetch(fetchIncomeStatementData(stockSymbol, apikey))
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      incomeStatement = data; //Stores income statement

      return fetch(fetchCashflowStatementData(stockSymbol, apikey));
    })
    .then((response) => response.json())
    .then((cashFlowData) => {
      cashFlowStatement = cashFlowData; //Stores cashflow statement

      return fetch(fetchBalancesheetData(stockSymbol, apikey));
    })
    .then((data) => data.json())
    .then((balanceSheetData) => {
      balanceSheetStatement = balanceSheetData; // stores balancesheet statement

      //Statements: Comment out after
      console.log(incomeStatement);
      console.log(balanceSheetStatement);
      console.log(cashFlowStatement);
    })
    .catch((err) => {
      PageComponents.hideLoadingAll();
      console.error(`${err} 💥`);
      renderError(`Something went wrong: ${err.message}`);
    })
    .finally(() => {
      renderTitles();
      renderCharts();

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
      dataPoints: [
        { y: 300684, label: "Venezuela" },
        { y: 266455, label: "Saudi" },
        { y: 169709, label: "Canada" },
        { y: 158400, label: "Iran" },
        { y: 142503, label: "Iraq" },
        { y: 101500, label: "Kuwait" },
        { y: 97800, label: "UAE" },
        { y: 80000, label: "Russia" },
      ],
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

/***********Revenue Chart*************/

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
  changeChartTitle(chart, "EPS Growth");
  changeChartTitle(chartTwo, "Net Income Growth");
  changeChartTitle(chartThree, "Revenue Growth: 10-30%+");

  changeChartTitle(chartFive, "Cashflow to Sales: 5%+");
  changeChartTitle(chartSix, "Net Income Growth: 12-15%+");
  changeChartTitle(chartSeven, "Return on Assets: 7-8%+");
  changeChartTitle(chartEight, "Return on equity: 12-15%+");

  changeChartTitle(chartNine, "Current Ratio: 1.2 - 2");
  changeChartTitle(chartTen, "finacial Leverage: > 4");
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

function calculateGrowth(originalNumber, newNumber) {
  return ((newNumber - originalNumber) / originalNumber) * 100;
}

function changeChartTitle(chart, newChartTitle) {
  chart.options.title.text = newChartTitle;
}

/*

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

*/
