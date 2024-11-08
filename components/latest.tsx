import { useEffect, useState } from "react";
import { ProductType } from "@/types/product";
import ProductCard from "./productCard";

export default function LatestProducts() {
    const [products, setProducts] = useState<ProductType[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await fetch('/api/products');
                const data = await response.json()
                setProducts(data)
            }
            catch (error) {
                console.log('Error fetching featured products', error)
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [])

    return (
        <div className="flex justify-center contain-content">
            {loading ? (
                <div>
                    Cargando...
                </div>) : (
                <div className="grid grid-cols-4 gap-4 py-12">
                    {products?.map((item,index) =>(
                <ProductCard {...item} key={index}></ProductCard>
                ))}
                </div>
                )}
        </div>
    )
}