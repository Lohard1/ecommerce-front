'use client'

import Link from "next/link"
import { useContext } from "react";
import { CartContext } from "./CartContext";

export default function Header() {

    const { cartProducts, setCartProducts } = useContext(CartContext) || {};

    return (
        <header className="bg-black text-white flex flex-col items-center lg:justify-between py-4 px-1 min-w-fit lg:flex-row mobile:px-4 lg:py-16 lg:px-32 text-nowrap">
            <Link className="text-xl mobile:text-4xl text-center lg:text-left mx-4" href={'/'}>E-commerce Front</Link>
            <nav className="flex space-x-4 text-sm items-center mobile:text-xl">
                <Link className="hover:underline hidden mobile:block" href={'/'}>Home</Link>
                <Link className="hover:underline hidden mobile:block " href={'/products'}>All Products</Link>
                <Link className="hover:underline hidden mobile:block" href={'/categories'}>Categories</Link>
                {/* <Link className="hover:underline hidden mobile:block" href={'/account'}>Account</Link> */}
                <Link className="hover:underline hidden mobile:block" href={'/cart'}>Cart ({cartProducts?.length})</Link>
            </nav>
        </header>
    )
}