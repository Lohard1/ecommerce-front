'use client'

import FeaturedProduct from "@/components/featured";
import Header from "@/components/header";
import LatestProducts from "@/components/latest";

export default function Home() {
  return (
    <div className="w-full contain-content">
      <Header></Header>
      <div>
      <FeaturedProduct></FeaturedProduct>
      </div>
      <div className="bg-gray-200">
      <LatestProducts></LatestProducts>
      </div>
    </div>
  );
}
