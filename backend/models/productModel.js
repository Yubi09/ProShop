import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    // comment: { type: String, required: true, default: 'sample comment' },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: { type: String, required: true },
    image: { type: String, required: true },
    // image: { type: String, required: true, default: '/images/sample.jpg' },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    // category: { type: String, required: true, default: 'sample category' },
    description: { type: String, required: true },
    reviews: [reviewSchema],
    // description: { type: String, required: true, default: 'sample description' },
    price: { type: Number, required: true, default: 0 },
    // price: { type: Number, required: true },
    countInStock: { type: Number, required: true, default: 0 },
    // countInStock: { type: Number, required: true },
    rating: { type: Number, required: true, default: 0 },
    // rating: { type: Number, required: true },
    numReviews: { type: Number, required: true, default: 0 },
    // numReviews: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
