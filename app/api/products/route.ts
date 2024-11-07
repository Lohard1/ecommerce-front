import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/products";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    try {
        await mongooseConnect();
        const products = await Product.find({}, null,{sort: {'_id':-1}, limit: 8});
        console.log(products)
        return NextResponse.json(products, {status:200});
    }
    catch (error) {
        return NextResponse.json({ message: 'Error al obtener los productos', error }, { status: 500 });
    }

}

