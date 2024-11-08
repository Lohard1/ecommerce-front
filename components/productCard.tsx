import IconCart from "@/assets/IconCart";
import { useEffect, useContext } from "react";
import { ProductType } from "@/types/product";
import { CartContext } from "./CartContext";

export default function ProductCard(product: ProductType | null) {
    const { cartProducts, setCartProducts } = useContext(CartContext) || {};

    function addProductToCart() {
        if (setCartProducts && product){
            const existingProductIndex = cartProducts?.findIndex((item) => item._id === product._id)

            if (existingProductIndex !== -1 ) {
                setCartProducts((prev) =>
                    prev.map((item, index) =>
                        index === existingProductIndex
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                );
            } else {
                setCartProducts ( (prev) => [...prev, {...product, quantity : 1}])
            }
        }
    }

    useEffect(() => {
        
    }, [])

    return (
        <div className="flex flex-col shrink-1 p-2 ">
            <div className="flex w-full place-content-center bg-white rounded-2xl mb-4 cursor-pointer">
            {product?.images && (
                <img className="p-2 w-56 h-56" src={product?.images[0]} />
            )}
            </div>
            <div className="font-semibold text-wrap"> {product?.title} </div>
            <div>
                <div className="w-full flex flex-row place-content-between items-center">
                    <div className=" w-fit font-extrabold text-lg">S/ {product?.price}</div>
                    <button className="bg-none ring-1 ring-purple-700 px-2 rounded-md hover:ring-purple-950 text-lg text-purple-700" onClick={addProductToCart}><IconCart className="h-5 w-5 inline-flex m-1" ></IconCart>Add to cart</button>
                </div>
            </div>
        </div>
    )
}