import { GetAllProducts, GetProductById } from '@/lib/api';
import EditProduct from '@/components/EditProduct';


async function staticParams() {
    const res = await GetAllProducts();
    const products: ProductDoc[] = await res.json();
    return products.map(item => ({ id: item._id }));
}

// fix "dynamic server usage" errors in dev mode by turning off static generation and forcing dynamic rendering
export const generateStaticParams =  process.env.NODE_ENV === "production" ? staticParams :  undefined;
export const dynamic = 'force-dynamic';

type Params = {
    params: { id: string }
}

export default async function EditProductPage({ params: { id } }: Params) {
    const res = await GetProductById(id);
    const productInfo: ProductDoc = await res.json();

    if(!productInfo) return <div>Couldnt get any data</div>

    return (
        <>
        <h1 className='pl-4'>Edit Product</h1>
        <div className='page-container'>
            <EditProduct productInfo={productInfo}/>
        </div>
        </>
    )
}