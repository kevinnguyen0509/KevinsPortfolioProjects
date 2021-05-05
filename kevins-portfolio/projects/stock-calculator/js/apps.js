//https://canvasjs.com/docs/charts/basics-of-creating-html5-chart/updating-chart-options/
import { renderAllCharts } from "./modules/fetchapi.js";
import { createScrollingFeature } from "./modules/scrolling.js";
import * as PageComponents from "./modules/components.js";

//btn even listeners
let searchBtn = document.querySelector(".search-container__search-icon");
let searchBox = document.querySelector(".search-container__search");

//enables smooth scrolling to page section.
createScrollingFeature();

//Sets up the landing page
PageComponents.showStartScreen();
PageComponents.hideTitles();

/*
 * eventlistener that listens to magnifying glass click
 */
searchBtn.addEventListener("click", () => {
  let searchBoxValue = searchBox.value.trim();
  if (!searchBoxValue) {
    //do nothing
  } else {
    PageComponents.startLoadingAll();
    renderAllCharts(searchBoxValue);
  }
});

/*
 * eventlistener that listens for the enter button being clicked
 */
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
