import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      // ref: 'User',
      ref: 'User', // User is the name of the model
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product', // Product is the name of the model
        },
      },
    ],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String }, // from PayPal
      status: { type: String }, // from PayPal
      update_time: { type: String }, // from PayPal
      email_address: { type: String }, // from PayPal
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: { type: Boolean, required: true, default: false }, // isPaid is a boolean value
    paidAt: { type: Date }, // paidAt is a date
    isDelivered: { type: Boolean, required: true, default: false }, // isDelivered is a boolean value
    deliveredAt: { type: Date }, // deliveredAt is a date
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
