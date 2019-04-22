const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id =  id ? new mongodb.ObjectId(id) : null;
    this.userId = userId;
  }

  save() {
    const db = getDb();

    let dbOperation;

    if (this._id) {
      // update the product
      dbOperation = db
        .collection('products')
        .updateOne(
          // находим объект, совпадающий с объектом в базе по id
          {_id: this._id},
          // в $set описываем изменения, которые нужно внести в изменяемый объект
          // будет менять все поля
          // можно указать конкретные поля для замены
          {$set: this}
        );
    }
    else {
      dbOperation = db
        .collection('products')
        .insertOne(this);
    }
    return dbOperation
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection('products')
      .find({_id: new mongodb.ObjectID(prodId)})
      .next()
      .then(product => {
        console.log(product);
        return product;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static deleteById(prodId) {
    const db = getDb();
    return db
      .collection('products')
      .deleteOne({_id: new mongodb.ObjectId(prodId)})
      .then(resalt => {
        {
          console.log('Deleted!');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

}

module.exports = Product;
