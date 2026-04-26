import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('PENTING: MONGODB_URI tidak ditemukan di file .env.local');
}

/** * Global digunakan untuk menjaga koneksi tetap aktif saat development.
 * Ini mencegah error "too many connections" di MongoDB Atlas.
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000, // Tunggu maksimal 10 detik untuk konek
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      console.log('✅ DATABASE TERHUBUNG KE CLOUD');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('❌ GAGAL KONEK KE DATABASE:', e);
    throw e;
  }

  return cached.conn;
}

export default connectDB;
