const puppeteer = require("puppeteer");
let activitiesArray = [];
(async function main() {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36"
    );

    await page.goto(
      "https://www.atlasobscura.com/things-to-do/seattle-washington/places"
    );

    await page.waitForSelector(".index-card-wrap"); //Page is now loaded

    const cardWrapers = await page.$$(".index-card-wrap");
    let allCardItems = await page.$$(".index-card-wrap");

    for (let items of allCardItems) {
      const cardItem = await items.$eval("h3", (h3) => h3.innerText);
      activitiesArray.push({ title: cardItem });
      console.log("Title", cardItem);
    }

    console.log("----------------Page: 1--------------");

    for (let i = 2; i < 8; i++) {
      await page.goto(
        `https://www.atlasobscura.com/things-to-do/seattle-washington/places?page=${i}`
      );

      await page.waitForSelector(".index-card-wrap"); //Page is now loaded
      allCardItems = "";
      allCardItems = await page.$$(".index-card-wrap");
      for (let items of allCardItems) {
        const cardItem = await items.$eval("h3", (h3) => h3.innerText);
        activitiesArray.push({ title: cardItem });
        console.log("Title", cardItem);
      }

      console.log(`----------------Page: ${i}--------------`);
    }

    console.log(activitiesArray);
    console.log("first", activitiesArray[0]);

    // const nextBtn = await page.$("span.next");
    // nextBtn.click();

    // for (const cardWrapper of cardWrapers) {
    // }
  } catch (e) {
    console.log("OUR ERROR: 😢😢😢😢😢", e);
  }
})();
