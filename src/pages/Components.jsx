import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import Footer from "../components/Footer";
import Container from "../components/Container";
import ProductCard from "../components/ProductCard";
import Card from "../components/Card";
import Table from "../components/Table";

const headers = ["No", "Nama Produk", "Kategori", "Harga", "Aksi"];

const products = [
  {
    id: 1,
    name: "Laptop Asus",
    category: "Elektronik",
    price: "Rp 8.000.000",
  },
  {
    id: 2,
    name: "Sepatu Sport",
    category: "Fashion",
    price: "Rp 450.000",
  },
  {
    id: 3,
    name: "Jam Tangan",
    category: "Aksesoris",
    price: "Rp 799.000",
  },
];

export default function Components() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 font-poppins flex flex-col gap-6">
      <PageHeader title="Components" breadcrumb={["Dashboard", "Components"]} />

      <div>
        <div className="flex gap-2">
          <Button type="primary">Edit</Button>
          <Button type="success">Simpan</Button>
          <Button type="danger">Hapus</Button>
        </div>
      </div>

      <div>
        <div className="flex gap-2">
          <Badge type="success">Aktif</Badge>
          <Badge type="warning">Pending</Badge>
          <Badge type="danger">Selesai</Badge>
        </div>
      </div>

      <div>
        <div className="flex gap-2">
          <Avatar name="Fikri" />
          <Avatar name="Hendra" />
          <Avatar name="Suci" />
        </div>
      </div>

      <Container className="bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">Daftar Produk</h1>
        <p className="text-gray-600">Berikut adalah daftar produk terbaru.</p>
      </Container>
      <div>
        <Card>
          <h2 className="text-xl font-bold">Judul Card</h2>
          <p className="text-gray-600">Ini adalah isi dari card.</p>
        </Card>
      </div>

      <div className="flex flex-wrap gap-4">
        <ProductCard
          image="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
          title="Sepatu Sport"
          category="Fashion"
          price="Rp 450.000"
          description="Sepatu sport modern dengan desain nyaman dan ringan untuk aktivitas sehari-hari."
        />

        <ProductCard
          image="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
          title="Smartphone"
          category="Elektronik"
          price="Rp 4.500.000"
          description="Smartphone dengan performa cepat, kamera jernih, dan baterai tahan lama."
        />
        <Table headers={headers}>
          {products.map((product, index) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="border px-4 py-3">{index + 1}</td>

              <td className="border px-4 py-3">{product.name}</td>

              <td className="border px-4 py-3">{product.category}</td>

              <td className="border px-4 py-3">{product.price}</td>

              <td className="border px-4 py-3">
                <button className="bg-blue-600 text-white px-3 py-1 rounded">
                  Detail
                </button>
              </td>
            </tr>
          ))}
        </Table>
      </div>

      <Footer />
    </div>
  );
}
