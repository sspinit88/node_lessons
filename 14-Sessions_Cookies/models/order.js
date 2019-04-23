const
  mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const
  orderSchema = new Schema({
    products: [{
      productData: {type: Object, require: true,},
      quantity: {type: Number, require: true,}
    }],
    user: {
      name: {
        type: String,
        require: true,
      },
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
      }
    }
  });

module.exports = mongoose.model('Order', orderSchema);
