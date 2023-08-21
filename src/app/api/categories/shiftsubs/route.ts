import { mongooseConnect } from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { AuthOptions } from "../../auth/[...nextauth]/route";
import { NextResponse, NextRequest } from "next/server";
import { Category } from "@/models/category";

// Assign new parent to an items subcategories. Eventually allowing it to be deleted.
export async function PATCH(req: NextRequest) {
    const session = await getServerSession(AuthOptions);
    if (!session)
        return NextResponse.json({ message: 'Not Authorized' }, { status: 401 });

    try {
        await mongooseConnect();
        const { id, newParent } = await req.json();
        let update;
        if(!newParent)
            update = { $unset: { parent: true }};
        else   
            update = { parent: newParent }
        const res = await Category.updateMany({ parent: id}, update);
        return NextResponse.json(`Updated ${res.modifiedCount} subcategories successfully`);
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}