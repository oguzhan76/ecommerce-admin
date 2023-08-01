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

interface Category {
    _id?: string,
    name: string,
    parent?: ObjectId
}

interface PopdCategoryDoc {
    _id: string
    name: string,
    parent: Category
}

// ----------------

type OptionType = {
    value: string,
    label: string
}