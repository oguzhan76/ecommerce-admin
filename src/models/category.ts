// import { ObjectId } from "mongodb";
import { Schema, model, models } from "mongoose";
import { ICategory, ICategoryDocument, ICategoryModel } from "@/interfaces/ICategory";

const PropertySchema: Schema<Property> = new Schema({
    name: {
        type: String,
        required: true,
    },
    values: [String]
});

const CategorySchema: Schema<ICategoryDocument> = new Schema({
    name: {
        type: String,
        required: true
    },
    parent: {
        type: Schema.Types.ObjectId
    },
    properties: [PropertySchema]
});

CategorySchema.statics.buildCategory = (args: ICategory): ICategoryDocument => {
    return new Category(args);
}

// // When a category is deleted, delete it from children's parent reference.
// CategorySchema.post("findOneAndDelete", document => {
//     const catId = document._id;
//     Category.find({ parent: catId })
//     .then(cats => cats.map(cat => {
//         cat.parent = null
//     }));
// })

export const Category = models?.Category || model<ICategoryDocument, ICategoryModel>('Category', CategorySchema);

