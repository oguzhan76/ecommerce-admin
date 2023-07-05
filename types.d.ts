interface IProduct {
    title: string;
    description?: string;
    price: number;
    images?: string[]
}

interface IProductDoc extends IProduct {
    _id: string
}