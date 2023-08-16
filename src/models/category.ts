// import { ObjectId } from "mongodb";
import { Schema, model, models, Types } from "mongoose";

const CategorySchema = new Schema<Category>({
    name: {
        type: String,
        required: true
    },
    parent: {
        type: Schema.Types.ObjectId
    },
    children: [
        { type: Schema.Types.ObjectId }
    ]
});

// When a category is deleted, delete it from children's parent reference.
CategorySchema.post("findOneAndDelete", document => {
    const catId = document._id;
    Category.find({ parent: catId })
    .then(cats => cats.map(cat => {
        cat.parent = null
    }));
})

export const Category = models?.Category || model<Category>('Category', CategorySchema);

