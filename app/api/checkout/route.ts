import { mongooseConnect } from "@/lib/mongoose";
import { NextResponse, NextRequest } from "next/server";
//import { Order } from "@/models/order";
import paypal from '@paypal/checkout-server-sdk'
import { ProductCart } from "@/types/product";

const clientId = process.env.PAYPAL_ID as string;
const clientSecret = process.env.PAYPAL_SECRET as string;

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment)

export async function POST(req: NextRequest) {

    await mongooseConnect();

    try {
        const { cartProducts } = await req.json();
        console.log(cartProducts)

        if (!cartProducts || cartProducts.length === 0) {
            return NextResponse.json({ error: "No items in cart" }, { status: 400 })
        }
        const items = cartProducts.map((product: ProductCart) => ({
            name: product.title,
            unit_amount: {
                currency_code: "USD",
                value: product.price.toFixed(2),
            },
            quantity: product.quantity.toString(),
        }));

        console.log('items:', items)

        const totalAmount = cartProducts.reduce((total:number, product:ProductCart) => total + product.price * product.quantity, 0).toFixed(2);

        const request = new paypal.orders.OrdersCreateRequest();
        request.requestBody({
            intent: "CAPTURE",
            purchase_units: [{
                amount: {
                    currency_code: "USD",
                    value: cartProducts.reduce((total: number, product: ProductCart) => total + product.price * product.quantity, 0).toFixed(2),
                    breakdown: {
                        item_total:{
                            currency_code: "USD",
                            value: totalAmount,
                        },
                        discount: {
                            currency_code: "USD",
                            value: "0.00",
                          },
                          handling: {
                            currency_code: "USD",
                            value: "0.00",
                          },
                          insurance: {
                            currency_code: "USD",
                            value: "0.00",
                          },
                          shipping_discount: {
                            currency_code: "USD",
                            value: "0.00",
                          },
                          shipping: {
                            currency_code: "USD",
                            value: "0.00", 
                          },
                          tax_total: {
                            currency_code: "USD",
                            value: "0.00",
                          },
                    }
                },
                items: items,
            },]
        })

        console.log('request:', request)


        const order = await client.execute(request);

        return NextResponse.json({ orderID: order.result.id });
    } catch (error) {
        console.error("Error creating PayPal order:", error);
        return NextResponse.json({ error: "Order creation failed" }, { status: 500 });
    }

    // try {
    //     await mongooseConnect();
    //     const body = await req.json();

    //     const { name, email, city, postalCode, street, cartProducts } = body;

    //     const orderDoc = await Order.create({
    //         name, email, city, postalCode, street, cartProducts, paid:false
    //     })

    //     // Realiza las operaciones que necesites con los datos recibidos.
    //     console.log('Formulario:', { name, email, city, postalCode, street });
    //     console.log('Productos del carrito:', cartProducts);

    //     // Aquí podrías guardar los datos en una base de datos, procesar un pago, etc.

    //     return NextResponse.json({ success: true, message: 'Datos recibidos correctamente.' });
    // } catch (error) {
    //     console.error('Error procesando el checkout:', error);
    //     return NextResponse.json({ success: false, message: 'Error en el procesamiento del checkout.' }, { status: 500 });
    // }
}
