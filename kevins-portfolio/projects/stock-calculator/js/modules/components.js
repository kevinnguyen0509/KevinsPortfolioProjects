let charts = document.querySelectorAll(".charts");
let titles = document.querySelectorAll(".title");
let loading = document.querySelector(".loading");
let startScreen = document.querySelector(".loading-one");
let rightSide = document.querySelector(".right-side");

/**********hide Components************/
export function hideCharts() {
  charts.forEach((chart) => chart.classList.add("hidden"));
}

export function hideTitles() {
  titles.forEach((title) => title.classList.add("hidden"));
}

export function hideStartScreen() {
  startScreen.classList.add("hidden");
}

export function hideLoadingScreen() {
  loading.classList.add("hidden");
}

/************Show Components*************/
export function showCharts() {
  charts.forEach((chart) => chart.classList.remove("hidden"));
  charts.forEach((chart) => (chart.style.visibility = "visible"));
  rightSide.style.height = "auto";
}

export function showTitles() {
  titles.forEach((title) => title.classList.remove("hidden"));
}

export function showStartScreen() {
  startScreen.classList.remove("hidden");
}

export function showLoadingScreen() {
  loading.classList.remove("hidden");
  charts.forEach((chart) => (chart.style.visibility = "hidden"));
  rightSide.style.height = "100%";
}
