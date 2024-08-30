import { NextResponse } from "next/server";
import { connectMongoDB } from "@/lib/mongodb";
import Product from "@/models/product";

export async function GET(req) {
    try {
        await connectMongoDB();
        const url = new URL(req.url);
        const id = url.searchParams.get("id");
        if (id) {
            const product = await Product.findById(id);
            return NextResponse.json({ message: "Data Provided", data: product }, { status: 200 });
        } else {
            const products = await Product.find({},'_id name price');
            return NextResponse.json({ message: "Data Provided", data: products }, { status: 200 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Unable to Reach Server" }, { status: 500 });
    }
}