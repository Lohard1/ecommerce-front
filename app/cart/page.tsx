'use client'
//ruta: app/cart/page.tsx

import Layout from "@/components/Layout";
import { useContext, useEffect } from "react";
import { CartContext } from "@/components/CartContext";

const CartPage = () => {
    const { cartProducts, setCartProducts, isLoading } = useContext(CartContext) || {};

    useEffect(()=>{
        console.log(cartProducts)
        console.log(isLoading)
    },[cartProducts, isLoading])

    if (isLoading) {
        return(
                <div>
                    Loading...
                </div>
        )
    }

    return (
        <div>
            {!cartProducts?.length && (
                
                <div>
                    Your cart is empty
                </div>
            )}
            {cartProducts && cartProducts?.length > 0 && (
                <div className="flex flex-col mobile:flex-row w-full border-4 border-green-300 place-content-around p-4">
                    <div className="w-full mobile:w-1/2 h-44 bg-white rounded-3xl mb-2">
                    <div className="text-xl text-center font-semibold sm:text-3xl">
                            Cart
                        </div>
                    </div>
                    <div className="w-full mobile:w-1/3 h-44 bg-white rounded-3xl">
                        <div className="text-xl text-center font-semibold sm:text-3xl">
                            Order Information
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CartPage;