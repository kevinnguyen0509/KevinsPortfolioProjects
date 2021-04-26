const fs = require("fs"); //fs is the file system lib
const http = require("http");
const url = require("url");

const slugify = require("slugify");
const replaceTemplate = require("./modules/replaceTemplate");

/***********************Files************************************* */
//blocking synchronous way
// const textIn = fs.readFileSync("grid.css", "utf-8");
// console.log(textIn);

// const textOut = textIn;

// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("written");

// //Non-blocking, asynchronous way
// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data2) => {
//     fs.readFile(`./txt/append.txt`, "utf-8", (err, data3) => {
//       fs.writeFile(`./txt/final.txt`, `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("Files have been read and written");
//       });
//     });
//   });
// });
/**************server***************** */
//Code here gets executed once

//Reading Files
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const dataObj = JSON.parse(data);
const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));

console.log(slugs);

const server = http.createServer((req, res) => {
  //Excuted everytime there is a request

  const { query, pathname } = url.parse(req.url, true);

  const pathName = req.url;

  //Overview and default page
  if (pathName === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHTML = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHTML);

    res.end(output);
  }

  //Product Page
  else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);

    res.end(output);
  }

  //API page
  else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  }
  //Not found page
  else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "Hello-world",
    });
    res.end("<h1>Page Not Found!</h1>");
  }
});

server.listen(8090, "127.0.0.1", () => {
  console.log("Listening on port 8090");
});
