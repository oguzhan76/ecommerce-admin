import { useState, FormEvent } from 'react'
import { UploadButton } from '@/lib/uploadthing';

type Props = {
    onSubmit: (p: IProduct) => void,
    productInfo?: IProduct
}

// delete uploaded images if user exits page without saving the product

export default function ProductForm({ onSubmit, productInfo }: Props) {
    const [title, setTitle] = useState<string>(productInfo?.title || '');
    const [description, setDescription] = useState<string>(productInfo?.description || '');
    const [price, setPrice] = useState<string>(productInfo?.price.toString() || '');
    const [images, setImages] = useState<string[]>(productInfo?.images || []);
    const [stagedImages, setStagedImages] = useState<{ fileUrl: string, fileKey: string }[]>([]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const imgs = images.concat(stagedImages.map(img => img.fileUrl));

        onSubmit({
            title,
            description,
            price: parseInt(price),
            images: imgs
        });
    }

    return (
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
                ? <ImageList images={images} />
                : <div className='text-sm text-red-500 italic'>No photos in this product</div>
            }
            <UploadButton
                endpoint='imageUploader'
                onClientUploadComplete={(res) => {
                    if (res) setStagedImages(res)
                }}
                onUploadError={(err: Error) => alert(`ERROR! ${err.message}`)}
            />
            {!!stagedImages.length &&
                <section>
                    <div>
                        <p>UploadComplete!</p>
                        <p className='mt-2' >{stagedImages.length} staged files</p>
                    </div>
                    <ImageList images={stagedImages.map(img => img.fileUrl)} />
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
            <button type='submit' className='btn-primary mt-2'>Save</button>
        </form>
    )
}

function ImageList({ images }: { images: string[] }) {
    return (
        <ul className='flex gap-2 flex-wrap'>
            {images.map(img =>
                <li key={img}>
                    <div className='w-24 h-24 rounded-lg overflow-hidden'>
                        <img alt='product image' src={img} className='rounded-lg' />
                    </div>
                </li>
            )}
        </ul>
    )
}