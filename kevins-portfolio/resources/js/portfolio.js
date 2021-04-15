"use strict";

//variables
const backgroundOverlay = document.querySelector(".background"); //black overlay
const modalTwo = document.querySelector(".modal2");
const backgroundOverlayTwo = document.querySelector(".background2"); //black overlay
const modal = document.querySelector(".modal");
const clickedOnImageArray = document.querySelectorAll(".portfolio-container");
const contact = document.querySelector(".contact");
let modalImage = "";
let modalTitle = "";
let modalDescription = "";
let modalPortfolioUrl = "";
let modalgithubUrl = "";

const porfolioInfoArray = [
  {
    img: "resources/img/portfolio/guessMyNumber.PNG",
    title: "Guessing Game",
    desciption:
      "This game uses Javascript to determine if you are able to guess the mystery number behind the question mark.",
    portfolio_url: "projects/guessMyNumberGame/index.html",
    github_url:
      "https://github.com/kevinnguyen0509/KevinsPortfolioProjects/tree/master/kevinsPortfolio/Projects/showcase/guessMyNumberGame",
  },

  {
    img: "resources/img/portfolio/pig.game.PNG",
    title: "Pig Game",
    desciption:
      "This game uses Javascript to build a small interactive game for 2 players to roll a dice. The object of the game is to get to 100.",
    portfolio_url: "projects/pig-game/index.html",
    github_url:
      "https://github.com/kevinnguyen0509/KevinsPortfolioProjects/tree/master/kevinsPortfolio/Projects/showcase/pig-game",
  },

  {
    img: "resources/img/portfolio/bestcity.PNG",
    title: "Best City Guide",
    desciption:
      "This website is to demostrate a static website that was build using flex boxes to make everything responsive to different screen sizes",
    portfolio_url: "projects/Best City Guide/index.html",
    github_url:
      "https://github.com/kevinnguyen0509/KevinsPortfolioProjects/tree/master/kevinsPortfolio/Projects/showcase/Best%20City%20Guide",
  },

  {
    img: "resources/img/portfolio/Roomatelist.png",
    title: "Roommate List",
    desciption:
      "This website is to demostrate a static website that updates without hitting the refresh. This will eventually become an app but for now its a work in progress",
    portfolio_url: "projects/roomatelist/index.html",
    github_url:
      "https://github.com/kevinnguyen0509/KevinsPortfolioProjects/tree/master/kevinsPortfolio/Projects/showcase/roomatelist",
  },

  {
    img: "resources/img/portfolio/bootstrapDemo.png",
    title: "First Stack",
    desciption:
      "This website is to demostrate a static website that is built to be responsive with bootstrap",
    portfolio_url: "projects/BoostrapDemo 1/start/index.html",
    github_url:
      "https://github.com/kevinnguyen0509/KevinsPortfolioProjects/tree/master/kevinsPortfolio/Projects/BoostrapDemo%201/start",
  },

  {
    img: "resources/img/portfolio/omnifood.PNG",
    title: "Omnifood",
    desciption:
      "This website is to demostrate a static website that is built for asthetic design and small amounts of animation in ccs",
    portfolio_url: "projects/Omnifood/index.html",
    github_url:
      "https://github.com/kevinnguyen0509/KevinsPortfolioProjects/tree/master/Realworldresponsiveweb/Omnifood",
  },
];

//functions
const closeModal = function () {
  modal.classList.add("hidden");
  backgroundOverlay.classList.add("hidden");
};

const closeModalTwo = function () {
  modalTwo.classList.add("hidden");
  backgroundOverlayTwo.classList.add("hidden");
};
const getModalContentAndReplace = function (
  modalImage,
  modalTitle,
  modalDescription,
  modalPortfolioUrl,
  modalgithubUrl
) {
  document.querySelector(
    ".modal-top-side"
  ).innerHTML = `<img src="${modalImage}" />`;

  document.querySelector(".modal-title").innerHTML = `<h5>${modalTitle}</h5>`;

  document.querySelector(".description-container").innerHTML = `            <h6>
           ${modalDescription}
           </h6>`;

  document.querySelector(
    ".portfolio-btn-container"
  ).innerHTML = `<a href="${modalPortfolioUrl}" target="_blank">Website</a>`;

  document.querySelector(".github-btn-container").innerHTML = `<a
           href="${modalgithubUrl}"
           target="_blank"
           >Github</a>`;
};
const openModal = function () {
  modal.classList.remove("hidden");
  backgroundOverlay.classList.remove("hidden");
};

const openModalTwo = function () {
  modalTwo.classList.remove("hidden");
  backgroundOverlayTwo.classList.remove("hidden");
};
const openModalClicked = function (index) {
  //replace with info from index 1
  modalImage = porfolioInfoArray[index].img;
  modalTitle = porfolioInfoArray[index].title;
  modalDescription = porfolioInfoArray[index].desciption;
  modalPortfolioUrl = porfolioInfoArray[index].portfolio_url;
  modalgithubUrl = porfolioInfoArray[index].github_url;

  getModalContentAndReplace(
    modalImage,
    modalTitle,
    modalDescription,
    modalPortfolioUrl,
    modalgithubUrl
  );

  openModal();
};

for (let i = 0; i < clickedOnImageArray.length; i++) {
  clickedOnImageArray[i].addEventListener("click", function () {
    switch (i) {
      case 0:
        openModalClicked(0);
        break;

      case 1:
        openModalClicked(1);
        break;

      case 2:
        openModalClicked(2);
        break;
      case 3:
        openModalClicked(3);
        break;
      case 4:
        openModalClicked(4);
        break;
      case 5:
        openModalClicked(5);
        break;
    }
  });
}

contact.addEventListener("click", function () {
  openModalTwo();
});
backgroundOverlayTwo.addEventListener("click", closeModalTwo);
backgroundOverlay.addEventListener("click", closeModal);
