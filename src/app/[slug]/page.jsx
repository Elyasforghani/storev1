import { notFound } from 'next/navigation';
import Fullstory from '../components/Fullstory';

async function getData(url) {
  const res = await fetch(url, { cache: 'force-cache' });
  if (!res.ok) return null;
  return res.json();
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const myId = parseInt(slug, 10);

  if (Number.isNaN(myId)) notFound();

  const product = await getData(`https://dummyjson.com/products/${myId}`);
  if (!product) notFound();

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <Fullstory
        id={product.id}
        title={product.title}
        images={product.images || [product.thumbnail]}
        img={product.images?.[0] || product.thumbnail}
        des={product.description}
        disc={product.discountPercentage}
        price={product.price}
        rating={product.rating}
        brand={product.brand}
        category={product.category}
        stock={product.stock}
        warranty={product.warrantyInformation}
        shipping={product.shippingInformation}
        returnPolicy={product.returnPolicy}
      />
    </main>
  );
}