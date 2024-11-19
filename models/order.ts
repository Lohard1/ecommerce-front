//ruta models/order.ts

import { model, Schema, models } from "mongoose"
import { ProductSchema } from "./products";

const OrderSchema = new Schema({
    name: String,
    email:String,
    city: String,
    postalCode: String,
    street: String,
    paid: Boolean,
    cartProducts: [
        {
            title: {type: String, require: true},
            description: String,
            price: {type: Number, required: true},
            images: [{type: String}],
            category: String,
            properties: [{name: String, values: String}],
            quantity: { type: Number, required: true },
        },
    ]
});

export const Order = models.Order || model('Order', OrderSchema);
