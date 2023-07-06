import { useState, FormEvent, useEffect } from 'react'
import { UploadButton } from '@/lib/uploadthing';
import ImagesList from './ImagesList';
import Link from 'next/link';

type Props = {
    onSubmit: (p: IProduct) => void,
    productInfo?: IProduct
}

// TODO: delete uploaded images if user exits page without saving the product
// TODO: upload progress bar maybe


export default function ProductForm({ onSubmit, productInfo }: Props) {
    const [title, setTitle] = useState<string>(productInfo?.title || '');
    const [description, setDescription] = useState<string>(productInfo?.description || '');
    const [price, setPrice] = useState<string>(productInfo?.price.toString() || '');
    const [images, setImages] = useState<ISelectableImage[]>(productInfo?.images || []);
    const [stagedImages, setStagedImages] = useState<ISelectableImage[]>([]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const imgs : IImageType[] = images.concat(stagedImages)

        const productData = {
            title,
            description,
            price: parseInt(price),
            images: imgs
        }
        onSubmit(productData);
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <label>Product Name</label>
                <input
                    type='text'
                    placeholder='product name'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />

                <label>Photos</label>
                {images.length
                    ? <ImagesList images={images} setImages={setImages}/>
                    : <div className='text-sm text-red-500 italic'>No photos in this product</div>
                }
                <UploadButton
                    endpoint='imageUploader'
                    onClientUploadComplete={(res) => {
                        if (res) setStagedImages(prev => prev.concat(res));
                    }}
                    onUploadError={(err: Error) => alert(`ERROR! ${err.message}`)}
                />
                {!!stagedImages.length &&
                    <section>
                        <div>
                            <p>Upload Complete!</p>
                            <p className='mt-2' >{stagedImages.length} staged files</p>
                        </div>
                        <ImagesList images={stagedImages} setImages={setStagedImages}/>
                    </section>
                }

                <label>Description</label>
                <textarea
                    placeholder='description'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <label>Price (in USD)</label>
                <input
                    type='text'
                    placeholder='price'
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
                <div className='flex justify-between'>
                    <Link href={"/products"} className='btn-primary mt-2'>Cancel</Link>
                    <button type='submit' className='btn-primary mt-2'>Save</button>
                </div>
            </form>
        </>
    )
}