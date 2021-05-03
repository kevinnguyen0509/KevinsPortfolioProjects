//https://canvasjs.com/docs/charts/basics-of-creating-html5-chart/updating-chart-options/
import {
  renderAllCharts,
  createCharts,
  renderCharts,
} from "./modules/fetchapi.js";
import { createScrollingFeature } from "./modules/scrolling.js";
import * as PageComponents from "./modules/components.js";

let searchBtn = document.querySelector(".search-container__search-icon");
let searchBox = document.querySelector(".search-container__search");

createScrollingFeature();
PageComponents.showStartScreen();
PageComponents.hideTitles();

//clicking button
searchBtn.addEventListener("click", () => {
  let searchBoxValue = searchBox.value.trim();
  if (!searchBoxValue) {
    //Create redborder around inputbox
    console.log("do nothing");
  } else {
    PageComponents.startLoadingAll();
    renderAllCharts(searchBoxValue);
  }
});

//clicking button
searchBox.addEventListener("keyup", (e) => {
  if (e.key == "Enter" || e.keyCode === 13) {
    let searchBoxValue = searchBox.value.trim();
    if (!searchBoxValue) {
      console.log("do nothing");
    } else {
      PageComponents.startLoadingAll();
      renderAllCharts(searchBoxValue);
    }
  }
});

//hideGraphsAndTitles();
//changeTitle();
//renderAllCharts("Intc");
//renderCharts();
