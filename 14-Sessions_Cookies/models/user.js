const
  mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const
  userSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    cart: {
      items: [
        {
          productId: {
            type: Schema.Types.ObjectId, // как тип указываем ссылку на id продукта
            ref: 'Product', // устанавливаем связь с моделью
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          }
        }
      ],
    }
  });

userSchema.methods
  .addToCart = function (product) {
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
      productId: product._id,
      quantity: newQuantity,
    });
  }
  // корзина пуста
  // налету добавляем поле с количеством товара
  this.cart = {
    items: updatedCartItems
  };

  return this.save();
};

userSchema.methods.removeFromCart = function (productId) {
  this.cart.items = this.cart.items.filter(item => {
    return item.productId.toString() !== productId.toString();
  });

  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = {items: []};
  return this.save();
};

module.exports = mongoose.model('User', userSchema);
