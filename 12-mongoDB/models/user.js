const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;


class User {
  constructor(username, email, cart, id) {
    this.name = username;
    this.email = email;
    this.cart = cart; // {items: []}
    this._id = id;
  }

  save() {
    const db = getDb();
    return db
      .collection('users')
      .insertOne(this);
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productId.toString() === product._id.toString();
    });

    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    }
    else {
      updatedCartItems.push({
        productId: new mongodb.ObjectId(product._id),
        quantity: newQuantity,
      });
    }

    // корзина пуста
    // налету добавляем поле с количеством товара
    const updatedCart = {
      items: updatedCartItems
    };
    // обновим юзера для сохранения данных
    const db = getDb();
    return db
      .collection('users')
      .updateOne(
        // находим данные по индексу
        {_id: new mongodb.ObjectId(this._id)},
        // перезаписываем данные новыми
        {$set: {cart: updatedCart}}
      );
  }

  getCart() {
    const db = getDb();

    const productsIds = this.cart.items.map(
      i => {
        return i.productId;
      }
    );

    return db
      .collection('products')
      .find(
        {
          _id: {$in: productsIds}
        }
      ).toArray()
      .then(products => {
        return products.map(p => {
            return {
              ...p, quantity: this.cart.items.find(i => {
                return i.productId.toString() === p._id.toString();
              }).quantity
            }
          }
        );
      });
  }

  deleteFromItemCart(productId) {
    const updatedCartItems = this.cart.items.filter(item => {
      // вернем все, кроме тех, у которых совпадет id
      return item.productId.toString() !== productId.toString();
    });
    return getDb()
      .collection('users')
      .updateOne(
        {_id: new mongodb.ObjectId(this._id)},
        {$set: {cart: {items: updatedCartItems}}}
      );
  }

  addOrder() {
    return this.getCart().then(products => {
      const order = {
        items: products,
        user: {
          _id: new mongodb.ObjectId(this._id),
          name: this.name,
          email: this.email,
        }
      };
      return getDb()
        .collection('orders')
        .insertOne(order)
    }).then(result => {
      this.cart = {items: []};

      return getDb()
        .collection('users')
        .updateOne(
          {_id: new mongodb.ObjectId(this._id)},
          {$set: {cart: {items: []}}}
        );
    });
  }

  getOrders() {
    return getDb()
      .collection('orders')
      .find({
        'user._id': new mongodb.ObjectId(this._id)
      }).toArray();
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection('users')
      .findOne({_id: new mongodb.ObjectId(userId)})
      .then(user => {
        return user
      })
      .catch(err => console.log(err));
  }
}

module.exports = User;
