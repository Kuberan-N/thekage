import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/services/api/products";

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="bg-black min-h-screen text-white">
      <Navbar />

      <section className="px-4 py-12">
        <h2 className="text-sm text-white/50 mb-6">Latest Drops</h2>

        {products.length === 0 ? (
          <p className="text-center text-gray-400 mt-20">
            No products yet 🚀
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <BottomNav />
    </main>
  );
}