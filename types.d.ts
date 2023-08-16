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
    parent?: ObjectId,
    children: ObjectId[]
}

interface Cat extends Category {
    _id: string,
    parent: Cat,
}

interface PopdCategoryDoc {
    _id: string,
    name: string,
    parent: PopdCategoryDoc
}

interface CategoryWithChildren extends PopdCategoryDoc {
    children: string[] | undefined;
  }
// ----------------

type OptionType = {
    value: string,
    label: string
}