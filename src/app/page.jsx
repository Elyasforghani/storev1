import Link from 'next/link';
import {
  Truck,
  ShieldCheck,
  Headphones,
  RotateCcw,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Percent,
  CheckCircle2,
} from 'lucide-react';
import ProductCatalog from './components/ProductCatalog';

async function getData(url) {
  const res = await fetch(url, { cache: 'force-cache' });
  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }
  const data = await res.json();
  return data.products;
}

export default async function Page() {
  const products = await getData('https://dummyjson.com/products?limit=32');
  const featuredDeal = products[0] || null;

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 border-b border-slate-200/60 dark:border-slate-800/60 bg-gradient-to-b from-indigo-50/50 via-white to-transparent dark:from-indigo-950/20 dark:via-slate-950 dark:to-transparent">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/10 dark:bg-indigo-500/15 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-100/80 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Buy freely  • Special Launch Deals</span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-slate-100 leading-[1.15]">
                Cosmetic Essentials and{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 dark:from-indigo-400 dark:via-purple-300 dark:to-pink-400">
                  Modern Living materials
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Discover exceptional electronics, beauty, fragrances, and home goods. Experience verified authenticity, transparent pricing, and next-day dispatch.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <a
                  href="#catalog"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl text-sm shadow-md hover:shadow-lg transition-all"
                >
                  Explore Collection
                  <ArrowRight className="w-4 h-4" />
                </a>

                <Link
                  href="/cart"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-semibold rounded-2xl text-sm transition-all shadow-xs"
                >
                  View My Cart
                </Link>
              </div>

              {/* Social Proof Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 max-w-lg mx-auto lg:mx-0 text-left">
                <div>
                  <h4 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">
                    10K+
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Orders Shipped
                  </p>
                </div>
                <div>
                  <h4 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">
                    4.9★
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Customer Rating
                  </p>
                </div>
                <div>
                  <h4 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">
                    100%
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Authentic Goods
                  </p>
                </div>
              </div>
            </div>

            {/* Hero Right: Featured Deal Card */}
            {featuredDeal && (
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-xl space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500 text-white shadow-xs">
                      <TrendingUp className="w-3.5 h-3.5" />
                      Deal of the Day
                    </span>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      -{Math.round(featuredDeal.discountPercentage)}% OFF
                    </span>
                  </div>

                  <div className="relative aspect-video rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-4 flex items-center justify-center overflow-hidden">
                    <img
                      src={featuredDeal.images?.[0] || featuredDeal.thumbnail}
                      alt={featuredDeal.title}
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      {featuredDeal.category}
                    </span>
                    <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100 truncate mt-1">
                      {featuredDeal.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                      {featuredDeal.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                    <div>
                      <div className="text-xl font-black text-slate-900 dark:text-slate-100">
                        $
                        {(
                          featuredDeal.price -
                          (featuredDeal.price *
                            featuredDeal.discountPercentage) /
                            100
                        ).toFixed(2)}
                      </div>
                      <span className="text-xs text-slate-400 line-through">
                        ${featuredDeal.price.toFixed(2)}
                      </span>
                    </div>

                    <Link
                      href={`/${featuredDeal.id}`}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl transition-all shadow-xs"
                    >
                      Grab Deal
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trust & Features Value Props Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                Free Fast Shipping
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                On all orders over $50
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                Buyer Protection
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                100% money back guarantee
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center flex-shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                Hassle-Free Returns
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                30 days return policy
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                Dedicated Support
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                24/7 customer assistance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Catalog Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Curated Inventory</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
            Explore All Products
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Filter by categories, search keywords, or sort by rating and best savings.
          </p>
        </div>

        <ProductCatalog products={products} />
      </div>

      {/* Promotional Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white p-8 sm:p-12 shadow-xl">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md">
              <Percent className="w-3.5 h-3.5" />
              Special Promo
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Enjoy 10% Off Your Purchase Today
            </h3>
            <p className="text-indigo-200 text-sm leading-relaxed">
              Use promo code <strong className="text-white underline">SAVE10</strong> during checkout to claim your instant discount. Valid across all store categories.
            </p>
            <div className="pt-2">
              <Link
                href="/cart"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-900 font-bold rounded-xl text-xs hover:bg-indigo-50 transition-colors shadow-md"
              >
                Go to Cart
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}