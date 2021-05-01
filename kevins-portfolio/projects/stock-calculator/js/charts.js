//https://canvasjs.com/docs/charts/basics-of-creating-html5-chart/updating-chart-options/

window.onload = function () {
  let searchBtn = document.querySelector(".search-container__search-icon");
  let allCharts = document.querySelectorAll(".chart-container__charts");
  let titles = document.querySelectorAll(".title-container");
  let chartContainer = document.querySelectorAll(".chart-container");
  let loading = document.querySelector(".loading");
  let chartObject = {
    animationEnabled: true,
    theme: "light2", // "light1", "light2", "dark1", "dark2"
    title: {
      text: "Top Oil Reserves",
    },
    axisY: {
      title: "Reserves(MMbbl)",
    },

    data: [
      {
        type: "column",
        showInLegend: true,
        legendMarkerColor: "grey",
        legendText: "MMbbl = one million barrels",
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

  let chart = new CanvasJS.Chart("chartContainer", createDeepCopy(chartObject));
  let chart2 = new CanvasJS.Chart(
    "chartContainer2",
    createDeepCopy(chartObject)
  );
  let chart3 = new CanvasJS.Chart(
    "chartContainer3",
    createDeepCopy(chartObject)
  );

  let chart5 = new CanvasJS.Chart(
    "chartContainer5",
    createDeepCopy(chartObject)
  );
  let chart6 = new CanvasJS.Chart(
    "chartContainer6",
    createDeepCopy(chartObject)
  );
  let chart7 = new CanvasJS.Chart(
    "chartContainer7",
    createDeepCopy(chartObject)
  );
  let chart8 = new CanvasJS.Chart(
    "chartContainer8",
    createDeepCopy(chartObject)
  );

  let chart9 = new CanvasJS.Chart(
    "chartContainer9",
    createDeepCopy(chartObject)
  );
  let chart10 = new CanvasJS.Chart(
    "chartContainer10",
    createDeepCopy(chartObject)
  );
  let chart11 = new CanvasJS.Chart(
    "chartContainer11",
    createDeepCopy(chartObject)
  );

  let changeTitle = () => {
    chart.options.title.text = "Revenue Growth: 10% + is good";
    chart2.options.title.text = "Net income growth: 12% + is good";
    chart3.options.title.text = "eps growth: 10% +";
    chart5.options.title.text = "net income growth: 15% +";
    chart6.options.title.text = "Cash/Sales ratio: 5% +";
    chart7.options.title.text = "Return on assets ratio: 7% +";
    chart8.options.title.text = "Return on Equity ratio: 15% +";
  };

  let renderCharts = () => {
    chart2.render();
    chart.render();
    chart3.render();

    chart5.render();
    chart6.render();
    chart7.render();
    chart8.render();

    chart9.render();
    chart10.render();
    chart11.render();
  };

  setTimeout(function () {
    allCharts.forEach((element) => {
      element.classList.toggle("hidden");
    });

    titles.forEach((element) => {
      element.classList.toggle("hidden");
    });

    //show tony the t-rex searching/loading
    loading.classList.toggle("hidden");
  }, 1);
  searchBtn.addEventListener("click", () => {
    //show tony the t-rex searching/loading

    loading.classList.toggle("hidden");

    //hide tony when search result is found
    setTimeout(function () {
      allCharts.forEach((element) => {
        element.classList.toggle("hidden");
      });

      titles.forEach((element) => {
        element.classList.toggle("hidden");
      });

      //show tony the t-rex searching/loading
      loading.classList.toggle("hidden");
    }, 3000);

    //if not found then show animation for not found
  });
  changeTitle();
  renderCharts();
};
