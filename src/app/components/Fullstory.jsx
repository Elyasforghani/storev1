'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ShoppingCart,
  Star,
  Check,
  ArrowLeft,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import useStore from '../store/Store';

export default function Fullstory({
  id,
  title,
  img,
  images = [],
  des,
  price,
  disc = 0,
  rating = 4.5,
  brand,
  category,
  stock,
  warranty,
  shipping,
  returnPolicy,
}) {
  const [selectedImg, setSelectedImg] = useState(img);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const updatePro = useStore((state) => state.updatePro);

  const discountedPrice = (price - (price * (disc || 0)) / 100).toFixed(2);
  const savedAmount = (price - Number(discountedPrice)).toFixed(2);

  const handleAddToCart = () => {
    updatePro({
      id,
      title,
      img: selectedImg || img,
      price: Number(discountedPrice),
      originalPrice: price,
      count: quantity,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const imageList = images && images.length > 0 ? images : [img];

  return (
    <div className="space-y-6">
      {/* Breadcrumb / Back link */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        <Link
          href="/"
          className="inline-flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Store
        </Link>
        {category && (
          <>
            <span>/</span>
            <span className="capitalize">{category}</span>
          </>
        )}
        <span>/</span>
        <span className="text-slate-900 dark:text-slate-200 font-medium truncate max-w-xs">
          {title}
        </span>
      </nav>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-sm">
        {/* Left Column: Image Showcase */}
        <div className="flex flex-col gap-4">
          <div className="relative w-full aspect-square bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex items-center justify-center p-6">
            {disc > 0 && (
              <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-rose-500 text-white shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                {Math.round(disc)}% OFF
              </span>
            )}
            <img
              src={selectedImg}
              alt={title}
              className="w-full h-full object-contain transition-all duration-300"
            />
          </div>

          {/* Thumbnail Gallery */}
          {imageList.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {imageList.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImg(thumb)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 flex-shrink-0 bg-slate-50 dark:bg-slate-800/50 p-1 cursor-pointer transition-all ${
                    selectedImg === thumb
                      ? 'border-indigo-600 dark:border-indigo-400 ring-2 ring-indigo-500/20'
                      : 'border-transparent hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <img
                    src={thumb}
                    alt={`${title} view ${idx + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info & Purchase Controls */}
        <div className="flex flex-col justify-between gap-6">
          <div className="space-y-4">
            {/* Brand & Stock */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              {brand ? (
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-1 rounded-md">
                  {brand}
                </span>
              ) : (
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                  Featured
                </span>
              )}

              {typeof stock === 'number' && (
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-md ${
                    stock > 10
                      ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50'
                      : 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50'
                  }`}
                >
                  {stock > 10 ? `In Stock (${stock} available)` : `Only ${stock} left!`}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              {title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-5 h-5 fill-amber-400" />
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  {rating?.toFixed(1) ?? '4.5'}
                </span>
              </div>
              <span className="text-xs text-slate-400 dark:text-slate-500">
                • Verified customer ratings
              </span>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-900 dark:text-slate-100">
                ${discountedPrice}
              </span>
              {disc > 0 && (
                <>
                  <span className="text-base text-slate-400 line-through">
                    ${price.toFixed(2)}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    Save ${savedAmount}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1.5">
                Overview
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                {des}
              </p>
            </div>
          </div>

          {/* Action Area */}
          <div className="space-y-4 pt-4 border-t border-slate-200/80 dark:border-slate-800/80">
            {/* Quantity Stepper */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Quantity:
              </span>
              <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3.5 py-1.5 text-base font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="px-4 py-1.5 text-sm font-semibold text-slate-900 dark:text-slate-100 min-w-10 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3.5 py-1.5 text-base font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-sm transition-all cursor-pointer shadow-md ${
                  added
                    ? 'bg-emerald-600 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </>
                )}
              </button>

              <Link
                href="/cart"
                className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-sm border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-colors"
              >
                View Cart &amp; Checkout
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-3 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex flex-col items-center text-center p-2 rounded-xl bg-slate-50 dark:bg-slate-800/30">
                <Truck className="w-4 h-4 mb-1 text-indigo-600 dark:text-indigo-400" />
                <span>{shipping || 'Free Shipping'}</span>
              </div>
              <div className="flex flex-col items-center text-center p-2 rounded-xl bg-slate-50 dark:bg-slate-800/30">
                <ShieldCheck className="w-4 h-4 mb-1 text-indigo-600 dark:text-indigo-400" />
                <span>{warranty || '2 Years Warranty'}</span>
              </div>
              <div className="flex flex-col items-center text-center p-2 rounded-xl bg-slate-50 dark:bg-slate-800/30">
                <RotateCcw className="w-4 h-4 mb-1 text-indigo-600 dark:text-indigo-400" />
                <span>{returnPolicy || '30-Day Return'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}