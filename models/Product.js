import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Title is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    price: { type: Number, required: [true, 'Price is required'], min: 0 },
    category: {
      type: String,
      required: true,
      enum: ['pottery', 'jewelry', 'textiles', 'woodwork', 'other'],
    },
    images: [{ type: String }],
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sellerName: { type: String, required: true },
    averageRating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    dimensions: { type: String, default: '' },
    materials: { type: String, default: '' },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
