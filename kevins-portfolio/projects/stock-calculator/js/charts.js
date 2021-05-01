//https://canvasjs.com/docs/charts/basics-of-creating-html5-chart/updating-chart-options/

window.onload = function () {
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
          { y: 300878, label: "Venezuela" },
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
  let chart12 = new CanvasJS.Chart(
    "chartContainer12",
    createDeepCopy(chartObject)
  );

  chart.options.title.text = "Revenue Growth: 10% + is good";
  chart2.options.title.text = "Chart 222222";
  chart3.options.title.text = "Chart 3!!";

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
  chart12.render();
};
