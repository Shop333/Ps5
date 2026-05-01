import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { Product } from '@/models/Product';

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengambil data' }, { status: 500 });
  }
}

export async function POST() {
  try {
    await connectDB();
    await Product.deleteMany({});

    const initialData = [
      // --- KONSOL (PS5 & PS4) ---
      { name: "PS5 Disc Edition", price: 8900000, category: "PS5", stock: 5, description: "Standard Edition dengan Ultra HD Blu-ray drive." },
      { name: "PS5 Digital Edition", price: 7800000, category: "PS5", stock: 3, description: "Versi ramping tanpa slot kaset." },
      { name: "PS5 Slim Disc Edition", price: 8500000, category: "PS5", stock: 7, description: "Desain lebih tipis dengan storage 1TB." },
      { name: "PS4 Pro 1TB", price: 4500000, category: "PS4", stock: 4, description: "Support resolusi 4K untuk game PS4." },
      { name: "PS4 Slim 500GB", price: 3200000, category: "PS4", stock: 6, description: "Lebih hemat energi dan ringan." },

      // --- KASET GAME (10 Macam) ---
      { name: "God of War Ragnarok", price: 780000, category: "Kaset", stock: 15, description: "Edisi terbaru petualangan Kratos." },
      { name: "Marvel's Spider-Man 2", price: 850000, category: "Kaset", stock: 10, description: "Bermain sebagai Peter dan Miles." },
      { name: "Elden Ring", price: 650000, category: "Kaset", stock: 8, description: "Game RPG open-world tersulit dan terbaik." },
      { name: "EA Sports FC 24", price: 720000, category: "Kaset", stock: 20, description: "Game sepak bola paling populer." },
      { name: "Resident Evil 4 Remake", price: 690000, category: "Kaset", stock: 5, description: "Klasik horor yang dibuat ulang." },
      { name: "Hogwarts Legacy", price: 750000, category: "Kaset", stock: 12, description: "Masuki dunia sihir Harry Potter." },
      { name: "Gran Turismo 7", price: 800000, category: "Kaset", stock: 7, description: "Simulator balap paling nyata." },
      { name: "Final Fantasy VII Rebirth", price: 900000, category: "Kaset", stock: 9, description: "Kelanjutan kisah Cloud Strife." },
      { name: "Ghost of Tsushima Director's Cut", price: 700000, category: "Kaset", stock: 6, description: "Menjadi samurai di pulau Tsushima." },
      { name: "Horizon Forbidden West", price: 680000, category: "Kaset", stock: 11, description: "Petualangan Aloy di dunia robot." }, 
      { name: "Resident Evil 8 village", price: 690000, category: "Kaset", stock: 5, description: "Klasik horor yang dibuat ulang." },

      // --- STIK / CONTROLLER (2 Macam) ---
      { name: "DualSense Wireless Controller White", price: 950000, category: "Stik", stock: 15, description: "Stik original bawaan PS5." },
      { name: "DualSense Midnight Black", price: 980000, category: "Stik", stock: 10, description: "Warna hitam elegan dengan fitur haptic." }
    ];

    await Product.insertMany(initialData);
    return NextResponse.json({ message: 'Berhasil mengisi 17 produk ke database!' });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal mengisi data' }, { status: 500 });
  }
}
