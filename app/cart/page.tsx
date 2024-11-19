'use client'
//ruta: app/cart/page.tsx

import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import { ProductCart } from "@/types/product";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PAYPAL_ID = process.env.NEXT_PUBLIC_PAYPAL_ID as string;

const CartPage = () => {
    const { cartProducts, setCartProducts, isLoading } = useContext(CartContext) || {};
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [street, setStreet] = useState('');

    useEffect(() => {
        console.log(cartProducts)
        console.log(isLoading)
    }, [cartProducts, isLoading])

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    function handleIncrement(product: ProductCart) {
        if (setCartProducts) {
            const existingProductIndex = cartProducts?.findIndex((item) => item._id === product._id)
            if (existingProductIndex !== -1) {
                setCartProducts((prev) =>
                    prev.map((item, index) =>
                        index === existingProductIndex
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                );
            };
        };
    };

    function handleDecrement(product: ProductCart) {
        if (setCartProducts) {
            const existingProductIndex = cartProducts?.findIndex((item) => item._id === product._id)
            if (existingProductIndex !== -1) {
                setCartProducts((prev) =>
                    prev.map((item, index) =>
                        index === existingProductIndex
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    )
                );
                if (product.quantity === 1) {
                    setCartProducts((prev) => prev.filter((_, index) => index !== existingProductIndex))
                }
            }
        }
    }

    const handleCheckout = async (event: React.FormEvent) => {
        event.preventDefault();
        const formData = {
            name,
            email,
            city,
            postalCode,
            street,
            cartProducts
        };
    
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            const result = await response.json();
            
            if (result.success) {
                console.log('Checkout exitoso');
            } else {
                console.log('Hubo un problema con el checkout.');
            }
        } catch (error) {
            console.error('Error en el checkout:', error);
        }
    };

    function handleOrder(){
        return fetch("/api/checkout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
            cartProducts
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.orderID) {
                console.log(data);
                return data.orderID;
              } else {
                throw new Error("Order creation failed");
              }
            });

    }

    // function handleApprove(data:any,action:any):Promise<void>{
    //     return new Promise((resolve,reject)=>{
    //         console.log(data,action);
    //         if (setCartProducts){
    //             //setCartProducts([])
    //         }
    //         resolve()
    //     })
    // }

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
                        <div className="text-xl text-left font-semibold sm:text-3xl p-4 text-black">
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
                                            <td>${item.price}.00</td>
                                            <td>${item.price * item.quantity}.00</td>

                                        </tr>
                                    ))}

                                </tbody>
                            </table>

                        </div>
                    </div>
                    <div className="flex flex-col w-full mobile:w-1/3 h-fit bg-white rounded-3xl p-4 place-items-start">
                        <div className="text-xl text-center font-semibold sm:text-3xl text-black">
                            Order Information
                        </div>
                        <form onSubmit={handleCheckout}>
                            <div className="w-full">
                                <input className="pl-2 py-1 border-2 mt-2 rounded-md mb-2 w-full" placeholder="Name" value={name} name="name" onChange={ev => setName(ev.target.value)}></input>
                            </div>
                            <div className="w-full">
                                <input className="pl-2 py-1 border-2 rounded-md mb-2 w-full" placeholder="Email" value={email} name="email" onChange={ev => setEmail(ev.target.value)}></input>
                            </div>
                            <div className="flex w-full">
                                <input className="w-1/2 py-1 pl-2 border-2 rounded-md mb-2 " placeholder="City" value={city} name="city" onChange={ev => setCity(ev.target.value)}></input>
                                <input className="w-1/2 py-1 pl-2 border-2 rounded-md mb-2" placeholder="ZIP Code" value={postalCode} name="zipCode" onChange={ev => setPostalCode(ev.target.value)}></input>
                            </div>
                            <div className="w-full">
                                <input className="pl-2 py-1 border-2 rounded-md mb-2 w-full" placeholder="Street Name" value={street} name="street" onChange={ev => setStreet(ev.target.value)}></input>
                            </div>
                            <input type="hidden" name="products" value={JSON.stringify(cartProducts)}></input>
                            <div className="place-self-center w-full">
                            <PayPalScriptProvider options={
                                {
                                    clientId: PAYPAL_ID,
                                }
                            }>
                                <PayPalButtons
                                 style={{
                                    color: "blue",
                                    layout: "horizontal",
                                    label: "checkout",
                                 }}
                                 createOrder={()=> handleOrder()}
                                 //onApprove = {(data,action) => handleApprove(data,action)}
                                 onApprove={(data, actions) => {
                                    return new Promise((resolve, reject) => {
                                        console.log("Order approved:", data);
                                        actions.order?.capture()
                                            .then((captureDetails) => {
                                                if (setCartProducts){
                                                    setCartProducts([])
                                                }
                                                console.log("Order captured successfully:", captureDetails);
                                                resolve();
                                            })
                                            .catch((error) => {
                                                console.error("Error capturing the order:", error);
                                                reject(error);
                                            });
                                    });
                                }}
                                 />
                            </PayPalScriptProvider>


                                <button type="submit" className="bg-black text-white px-2 py-1  rounded-md mb-2 w-full">Continue to payment</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CartPage;