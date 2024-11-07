import IconCart from "@/assets/IconCart";
import { useContext, useEffect, useState } from "react";
import { ProductType } from "@/types/product";
import { CartContext } from "./CartContext";

export default function FeaturedProduct() {
    const [product, setProduct] = useState<ProductType | null>(null);
    const [loading, setLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const {cartProducts, setCartProducts } = useContext(CartContext) || {};

    function addFeaturedToCart() {
        if (setCartProducts && product){
            const existingProductIndex = cartProducts?.findIndex((item) => item._id === product._id)

            if (existingProductIndex !== -1 ) {
                setCartProducts((prev) =>
                    prev.map((item, index) => index === existingProductIndex ? { ...item, quantity: item.quantity + 1 } : item )
                );
            } else {
                setCartProducts ( (prev) => [...prev, {...product, quantity : 1}])
            }
        }
    }

    useEffect(() => {
        async function fetchProduct() {
            setVisible(false);
            try {
                const response = await fetch('/api/getFeaturedProduct');
                const data = await response.json()
                setProduct(data)
            }
            catch (error) {
                console.log('Error fetching featured product', error)
            } finally {
                setLoading(false);
                setTimeout(() => {
                    setVisible(true);
                }, 50);
            }
        }
        fetchProduct();
    }, [])



    return (
        <div className="bg-gray-800 text-white flex flex-col md:flex-row">
            <div className=" h-[700px] p-8 md:w-1/2 px-32">
                {loading ? (<div className="animate-pulse">
                    <div className="bg-gray-800 w-1/4 mb-4 rounded-md"></div>
                </div>) :
                    <div className={`transition-opacity duration-500 ${ visible ? 'opacity-100' : 'opacity-0'}`}>
                        <h1 className="font-semibold text-[80px]">{product?.title}</h1>
                        <p className="py-4 text-[25px]">{product?.description}</p>
                        <button className="bg-black ring-1 ring-gray-600 p-2 px-4 mr-4 rounded-md hover:ring-gray-200 text-lg">Read more</button>
                        <button className="bg-purple-700 ring-1 ring-purple-700 p-2 px-4 rounded-md hover:ring-gray-200 text-lg" onClick={addFeaturedToCart}>
                            <IconCart className="h-5 w-5 inline-flex m-1"></IconCart>Add to cart</button>
                    </div>
                }

            </div>
            <div className="relative flex items-start justify-center w-1/2">
                {loading ? (
                    <div className="bg-gray-800 w-full h-80 rounded-md animate-pulse"></div>
                ) : (
                    <div className={`transition-opacity duration-500 ${ visible ? 'opacity-100 absolute -top-12' : 'opacity-0 absolute -top-12'}`}>
                        <img src={product?.images ? product.images[3] : ''} className=""></img>
                    </div>
                )}
            </div>
        </div>
    )
}