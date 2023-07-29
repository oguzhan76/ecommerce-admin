interface Product {
    title: string;
    description?: string;
    price: number;
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

// ----------------

interface Category {
    name: string,
    parent?: object
}

interface CategoryDoc extends Category{
    _id: string
}

type OptionType = {
    value: string,
    label: string
}