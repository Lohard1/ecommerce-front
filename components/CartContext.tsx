'use client'

import { createContext, ReactNode, useState, Dispatch, SetStateAction, useEffect } from "react";
import { ProductCart } from "@/types/product";

interface CartContextType {
    cartProducts: ProductCart[];
    setCartProducts: Dispatch<SetStateAction<ProductCart[]>>;
    isLoading: boolean;
}

interface CartContextProviderProps{
    children: ReactNode;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartContextProvider({children}: CartContextProviderProps) {

    const [cartProducts, setCartProducts] = useState<ProductCart[]>([]) ;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartProducts(JSON.parse(storedCart));
        }
        setIsLoading(false)
    }, []);

    useEffect(()=>{
        localStorage.setItem('cart', JSON.stringify(cartProducts))
        console.log('cartProducts: ', cartProducts);
    },[cartProducts])

    return (
        <CartContext.Provider value = {{cartProducts, setCartProducts, isLoading}}>
            {children}
        </CartContext.Provider>
    )
}