import { getProducts } from "@/services/api/products";

export default async function Page() {
  const products = await getProducts();

  return (
    <section className="px-4 py-12">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-xs tracking-[0.5em] uppercase text-white/30 font-bold">
          Latest Drops
        </h2>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-gray-400 mt-20">
          No products yet 🚀
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <div key={product.id} className="text-white">
              {product.name}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}