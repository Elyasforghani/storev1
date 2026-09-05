'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Star, Check, ArrowRight } from 'lucide-react';
import useStore from '../store/Store';

export default function ShortStory({
  id,
  title,
  img,
  des,
  price,
  disc = 0,
  rating = 4.5,
  brand,
}) {
  const [added, setAdded] = useState(false);
  const updatePro = useStore((state) => state.updatePro);

  const discountedPrice = (price - (price * (disc || 0)) / 100).toFixed(2);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    updatePro({
      id,
      title,
      img,
      price: Number(discountedPrice),
      originalPrice: price,
      count: 1,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Top Image Section */}
      <div className="relative w-full aspect-square bg-slate-50 dark:bg-slate-800/50 p-6 flex items-center justify-center overflow-hidden">
        {/* Discount Badge */}
        {disc > 0 && (
          <span className="absolute top-3 left-3 z-10 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500 text-white shadow-sm">
            -{Math.round(disc)}%
          </span>
        )}

        {/* Brand Tag */}
        {brand && (
          <span className="absolute top-3 right-3 z-10 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-900/60 dark:bg-slate-800/80 text-white backdrop-blur-xs">
            {brand}
          </span>
        )}

        {/* Product Image */}
        <Link href={`/${id}`} className="w-full h-full flex items-center justify-center">
          <img
            src={img}
            alt={title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </Link>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {rating ? rating.toFixed(1) : '4.5'}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              (Reviews)
            </span>
          </div>

          {/* Title */}
          <Link href={`/${id}`}>
            <h2 className="font-semibold text-base text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 line-clamp-1 transition-colors">
              {title}
            </h2>
          </Link>

          {/* Description */}
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {des}
          </p>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-col gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-slate-900 dark:text-slate-100">
              ${discountedPrice}
            </span>
            {disc > 0 && (
              <span className="text-xs text-slate-400 line-through">
                ${price.toFixed(2)}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/${id}`}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Details
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleAddToCart}
              className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Added
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  Add
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}