interface IProduct {
    title: string;
    description?: string;
    price: number;
    images?: IImageType[]
}

interface IProductDoc extends IProduct {
    _id: string
}

interface IImageType {
    fileKey: string,
    fileUrl: string
}

interface ISelectableImage extends IImageType {
    selected?: boolean
}