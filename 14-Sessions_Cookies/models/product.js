const
  mongoose = require('mongoose'),
  Schema = mongoose.Schema; //  Schema - конструктор, позволяющий создавать новые схемы

const
  productSchema = new Schema({
    // поле _id не указываем, так как оно будет добавлено автоматически
    title: {
      type: String, // указываем тип тайтла
      require: true, // говорим, что это поле является обязательным
    },
    price: {
      type: Number,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    imageUrl: {
      type: String,
      require: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User', // ссылаемся на модель, через ее название, таким образом привязываем к ней _id
      required: true,
    }
  });

module.exports = mongoose.model('Product', productSchema);
