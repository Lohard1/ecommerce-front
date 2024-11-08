'use client'
//ruta: app/cart/page.tsx

import { useContext, useEffect } from "react";
import { CartContext } from "@/components/CartContext";
import { ProductCart } from "@/types/product";

const CartPage = () => {
    const { cartProducts, setCartProducts, isLoading } = useContext(CartContext) || {};

    useEffect(() => {
        console.log(cartProducts)
        console.log(isLoading)
    }, [cartProducts, isLoading])

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    function handleIncrement(product:ProductCart){
        if (setCartProducts ){
            const existingProductIndex = cartProducts?.findIndex((item) => item._id === product._id)
            if (existingProductIndex !== -1 ) {
                             setCartProducts((prev) =>
                                 prev.map((item, index) =>
                                     index === existingProductIndex
                                         ? { ...item, quantity: item.quantity + 1 }
                                         : item
                                 )
                             );
                         }
        }
    }

    function handleDecrement(product:ProductCart){
        if (setCartProducts ){
            const existingProductIndex = cartProducts?.findIndex((item) => item._id === product._id)
            if (existingProductIndex !== -1 ) {
                             setCartProducts((prev) =>
                                 prev.map((item, index) =>
                                     index === existingProductIndex
                                         ? { ...item, quantity: item.quantity - 1 }
                                         : item
                                 )
                             );
                             if (product.quantity === 1){
                                setCartProducts((prev) => prev.filter((_,index) => index !== existingProductIndex ))
                             }
                         }
            
        }

    }

    return (
        <div>
            {!cartProducts?.length && (

                <div>
                    Your cart is empty
                </div>
            )}
            {cartProducts && cartProducts?.length > 0 && (
                <div className="flex flex-col mobile:flex-row w-full place-content-around p-4">
                    <div className="w-full mobile:w-full mr-4 h-fit bg-white rounded-3xl mb-2">
                        <div className="text-xl text-left font-semibold sm:text-3xl p-4">
                            Cart

                            <table className="basic text-base text-black border-collapse mt-4">
                                <thead>
                                    <tr>
                                        <td className="w-96">Products</td>
                                        <td>    </td>
                                        <td>Qty</td>
                                        <td>Price</td>
                                        <td>Total Price</td>
                                    </tr>
                                </thead>
                                <tbody>

                                    {cartProducts.map((item, index) => (
                                        <tr key={index}>
                                            <td className="">{item.title}</td>
                                            <td>
                                                <div className="flex w-full place-content-center bg-white rounded-2xl">
                                                    {item?.images && (
                                                        <img className="w-16 h-16" src={item?.images[0]} />
                                                    )}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-4 text-right">{item.quantity}</div>
                                                    <div className="flex flex-col space-y-[2px]">
                                                        <button className="bg-gray-400/70 text-white text-xs font-semibold px-1 rounded hover:bg-green-700 transition-colors duration-200"
                                                        onClick={() => handleIncrement(item)}>+</button>
                                                        <button className="bg-gray-400/70 text-white text-xs font-semibold px-1 rounded hover:bg-red-700 transition-colors duration-200"
                                                        onClick={() => handleDecrement(item)}>-</button>
                                                    </div>
                                                </div>
                                                </td>
                                            <td>{item.price}</td>
                                            <td>{item.price * item.quantity}</td>
                                            
                                        </tr>
                                    ))}

                                </tbody>
                            </table>




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