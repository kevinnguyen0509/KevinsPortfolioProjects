const fs = require("fs");
const http = require("http");
const url = require("url");

//replacing card function
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);

  if (!product.organic)
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");

  return output;
};

//reading html files
const productData = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const productDataAsJson = JSON.parse(productData);
const overviewFile = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8"
);

const cardTemplate = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);

const productTemp = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);
//Creating a server
const server = http.createServer((request, response) => {
  const { pathname, query } = url.parse(request.url, true);
  const pathName = request.url;

  if (pathName === "/" || pathName === "/overview") {
    response.writeHead(200, { "Content-type": "text/html" });
    const overview = productDataAsJson
      .map((el) => replaceTemplate(cardTemplate, el))
      .join("");

    const output = overviewFile.replace("{%PRODUCT_CARDS%}", overview);

    response.end(output);
  } else if (pathname === "/product") {
    const productData = productDataAsJson[query.id];
    const output = replaceTemplate(productTemp, productData);
    console.log(output);

    response.end(output);
  } else {
    response.writeHead(404, { "Content-type": "text/html" });
    response.end("<h1>Page Not Found</h1>");
  }
});

//Calling the server
server.listen(8090, "127.0.0.1", () => {
  console.log("Listening on port 8090");
});
