import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema<Category>({
    name: {
        type: String,
        required: true
    },
});

export const Category = models?.Category || model<Category>('Category', CategorySchema)