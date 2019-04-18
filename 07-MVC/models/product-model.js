const fs = require('fs'); // позводяет сохранять данные в файл
const path = require('path');

const rootDir = require('../util/path');

const filePath = path.join(
  rootDir, // корневая дир
  'data', // указываем папку
  'products.json' // файл, в котор созраняем данные
);

const getProductsFromFile = (cb) => {
  fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class ProductModel {
  constructor(t) {
    this.title = t;
  }

  save() {
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(filePath, JSON.stringify(products), err => {
        console.log('err', err);
      });
    });
  }

  static getAll(cb) {
    getProductsFromFile(cb);
  }

};