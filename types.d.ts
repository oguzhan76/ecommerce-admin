interface Product {
    title: string;
    description?: string;
    price: number;
    images?: ImageType[]
}

interface ProductDoc extends Product {
    _id: string
}

// ----------------

interface ImageType {
    fileKey: string,
    fileUrl: string
}

interface SelectableImage extends ImageType {
    selected?: boolean
}

// ----------------


interface Category{
    _id: string,
    name: string,
    parent?: string
}

// ----------------



type CategoriesMapValue = { self: Category, subs: string[] }
type CategoriesMap = Map<string, CategoriesMapValue>