import { ObjectId } from "mongodb";
import { Schema, model, models } from "mongoose";

const CategorySchema = new Schema<Category>({
    name: {
        type: String,
        required: true
    },
    parent: {
        type: ObjectId
    }
});

CategorySchema.post("findOneAndDelete", document => {
    const catId = document._id;
    Category.find({ parent: catId })
    .then(cats => cats.map(cat => {
        cat.parent = null
    }));
})

export const Category = models?.Category || model<Category>('Category', CategorySchema);

