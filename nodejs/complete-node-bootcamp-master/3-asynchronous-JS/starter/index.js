const fs = require("fs");
const superAgent = require("superagent");

const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find what you were looking for.😒");

      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("file not found");
      resolve("success!");
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/dogggg.txt`);
    console.log(`This is what was in the file: ${data}`);

    const resp = await superAgent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(`This is the resp from superAgent: ${resp.body.message}`);

    await writeFilePromise(`dog-img.txt`, `${resp.body.message}`);
    console.log("File saved");
  } catch (err) {
    console.log(err);
  }
};

getDogPic();
/*
readFilePromise(`${__dirname}/dog.txt`)
  .then((data) => {
    return superAgent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log("Inside of write: " + res.body.message);

    return writeFilePromise("dog-img.txt", res.body.message);
  })
  .then(() => {
    console.log("random img saved");
  })
  .catch((err) => {
    console.log(err.message);
  });
*/
