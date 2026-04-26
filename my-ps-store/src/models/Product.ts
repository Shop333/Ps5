import mongoose, { Schema, model, models } from 'mongoose';

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { 
    type: String, 
    enum: ['PS4', 'PS5', 'Kaset', 'Stik', 'Aksesoris'], 
    required: true 
  },
  description: String,
  image: { type: String, default: '' },
  stock: { type: Number, default: 0 },
}, { 
  timestamps: true 
});

// Baris ini yang paling penting! Harus ada kata 'export'
export const Product = models.Product || model('Product', ProductSchema);
