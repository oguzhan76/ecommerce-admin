import { Document, HydratedDocument, Model, Schema } from "mongoose";

export interface ICategory {
    name: string,
    parent?: Schema.Types.ObjectId,
    properties?: Property
}

export interface ICategoryDocument extends ICategory, Document {}

export interface ICategoryModel extends Model<ICategoryDocument> {
    buildCategory(args: ICategory): ICategoryDocument;
}