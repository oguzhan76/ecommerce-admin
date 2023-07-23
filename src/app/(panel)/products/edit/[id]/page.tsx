import { GetAllProducts, GetProductById } from '@/app/api/lib';
import EditProduct from './_components/EditProduct';


async function staticParams() {
    const products: ProductDoc[] = await GetAllProducts();
    return products.map(item => ({ id: item._id.toString() }));
}

// fix "dynamic server usage" errors in dev mode by turning off static generation and forcing dynamic rendering
export const generateStaticParams =  process.env.NODE_ENV === "production" ? staticParams :  undefined;
export const dynamic = 'force-dynamic';

type Params = {
    params: { id: string }
}

export default async function EditProductPage({ params: { id } }: Params) {

    const productInfo: ProductDoc | null = await GetProductById(id);
    if(!productInfo) return <div>Couldnt get any data</div>

    return (
        <EditProduct productInfo={productInfo}/>
    )
}