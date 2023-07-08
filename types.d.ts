interface Product {
    title: string;
    description?: string;
    price: string;
    images?: ImageType[]
}

interface ProductDoc extends Product {
    _id: string
}

interface ImageType {
    fileKey: string,
    fileUrl: string
}

interface SelectableImage extends ImageType {
    selected?: boolean
}