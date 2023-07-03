interface IProduct {
    title: string;
    description?: string;
    price: number;
}

interface IProductDoc extends IProduct {
    _id: string
}