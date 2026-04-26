import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  items: [
    {
      _id: String,
      name: String,
      price: Number,
      qty: Number,
    }
  ],
  totalPrice: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
