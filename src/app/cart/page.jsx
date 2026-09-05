'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ShoppingBag,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
} from 'lucide-react';
import useStore from '../store/Store';

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);

  const product = useStore((state) => state.product);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const updateCount = useStore((state) => state.updateCount);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 flex justify-center items-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  const subtotal = product.reduce((sum, item) => sum + item.price * item.count, 0);
  const discountAmount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 9.99;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  if (checkedOut) {
    return (
      <main className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
          Order Placed Successfully!
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Thank you for your demo purchase. Your items will be dispatched soon.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            onClick={() => {
              product.forEach((p) => removeFromCart(p.id));
              setCheckedOut(false);
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  if (product.length === 0) {
    return (
      <main className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800/80 rounded-full flex items-center justify-center mx-auto mb-5 text-slate-400">
          <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Your cart is empty
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          Looks like you haven't added anything to your cart yet. Discover great products in our collection!
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Explore Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Title */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
            Shopping Cart
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {product.reduce((s, i) => s + i.count, 0)} items in your cart
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {product.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs transition-colors"
            >
              {/* Image */}
              <Link
                href={`/${item.id}`}
                className="w-20 h-20 rounded-xl bg-slate-50 dark:bg-slate-800/60 p-2 flex-shrink-0 flex items-center justify-center border border-slate-100 dark:border-slate-800"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              </Link>

              {/* Title & Price */}
              <div className="flex-1 min-w-0">
                <Link href={`/${item.id}`}>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm sm:text-base hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors truncate">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Unit Price: ${item.price.toFixed(2)}
                </p>

                {/* Mobile Stepper & Delete */}
                <div className="flex items-center gap-4 mt-3 sm:hidden">
                  <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-800">
                    <button
                      onClick={() => updateCount(item.id, Math.max(1, item.count - 1))}
                      className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-semibold">{item.count}</span>
                    <button
                      onClick={() => updateCount(item.id, item.count + 1)}
                      className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-rose-500 hover:text-rose-600 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Desktop Stepper */}
              <div className="hidden sm:flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-800">
                <button
                  onClick={() => updateCount(item.id, Math.max(1, item.count - 1))}
                  className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-xs font-semibold text-slate-900 dark:text-slate-100 min-w-8 text-center">
                  {item.count}
                </span>
                <button
                  onClick={() => updateCount(item.id, item.count + 1)}
                  className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Total & Remove */}
              <div className="hidden sm:flex flex-col items-end gap-2 min-w-24">
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
                  ${(item.price * item.count).toFixed(2)}
                </span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-slate-400 hover:text-rose-500 transition-colors cursor-pointer p-1"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Col: Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm sticky top-24 space-y-5">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Order Summary
            </h2>

            {/* Promo Code Input */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Discount code (e.g. SAVE10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 uppercase"
              />
              <button
                onClick={() => {
                  if (promoCode.trim().toUpperCase() === 'SAVE10') {
                    setPromoApplied(true);
                  } else {
                    alert('Invalid code. Try "SAVE10" for 10% off!');
                  }
                }}
                className="px-3 py-2 bg-slate-900 dark:bg-slate-800 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 cursor-pointer transition-colors"
              >
                Apply
              </button>
            </div>

            {promoApplied && (
              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                ✓ 10% discount applied!
              </div>
            )}

            {/* Cost Breakdown */}
            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              {promoApplied && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span>Promo Discount (10%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      FREE
                    </span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-800 pt-3 flex justify-between text-base font-extrabold text-slate-900 dark:text-slate-100">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => setCheckedOut(true)}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <CreditCard className="w-4 h-4" />
              Proceed to Checkout
            </button>

            {/* Security Guarantee */}
            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 dark:text-slate-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Encrypted &amp; Secure 256-Bit Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}