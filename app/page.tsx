'use client'

import { CartContextProvider } from "@/components/CartContext";
import FeaturedProduct from "@/components/featured";
import Header from "@/components/header";
import LatestProducts from "@/components/latest";
import Layout from "@/components/Layout";

export default function Home() {
  return (
    <div className="w-full contain-content">
      <CartContextProvider>
      <Header></Header>
      <div>
      <FeaturedProduct></FeaturedProduct>
      </div>
      <div className="bg-gray-200">
      <LatestProducts></LatestProducts>
      </div>
      </CartContextProvider>
    </div>
  );
}
