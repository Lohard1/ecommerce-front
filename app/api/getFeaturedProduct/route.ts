import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/products";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    try {
        await mongooseConnect();
        const product = await Product.findById('672659de6f370fe5ffd49064');
        console.log(product)
        return NextResponse.json(product, {status:200});
    }
    catch (error) {
        return NextResponse.json({ message: 'Error al obtener los productos', error }, { status: 500 });
    }

}


