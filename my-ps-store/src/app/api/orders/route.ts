import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

// Fungsi POST: Untuk membuat pesanan baru
export async function POST(req: Request) {
  try {
    // 1. Koneksi ke MongoDB
    await dbConnect();
    console.log("✅ API ORDER: Menghubungkan ke Database");

    // 2. Ambil data yang dikirim dari Frontend (Cart)
    const body = await req.json();
    const { items, totalPrice, paymentMethod } = body;

    // 3. Validasi sederhana
    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Keranjang masih kosong" }, { status: 400 });
    }

    // 4. Simpan ke koleksi 'orders' di MongoDB
    const newOrder = await Order.create({
      items,
      totalPrice,
      paymentMethod,
      status: 'Pending', // Status awal saat dipesan
    });

    console.log("✅ PESANAN DISIMPAN:", newOrder._id);

    // 5. Kirim respon balik ke frontend
    return NextResponse.json({ 
      success: true, 
      message: "Pesanan berhasil dibuat",
      orderId: newOrder._id 
    }, { status: 201 });

  } catch (error: any) {
    console.error("❌ ERROR API ORDER:", error.message);
    return NextResponse.json({ error: "Gagal memproses pesanan" }, { status: 500 });
  }
}

// Fungsi GET: (Opsional) Untuk melihat semua riwayat pesanan
export async function GET() {
  try {
    await dbConnect();
    const orders = await Order.find({}).sort({ createdAt: -1 });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "Gagal mengambil data pesanan" }, { status: 500 });
  }
}
// Fungsi DELETE: Untuk membatalkan/menghapus pesanan berdasarkan ID
export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "ID pesanan diperlukan" }, { status: 400 });
    }

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return NextResponse.json({ error: "Pesanan tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Pesanan berhasil dibatalkan" });
  } catch (error) {
    return NextResponse.json({ error: "Gagal membatalkan pesanan" }, { status: 500 });
  }
}
