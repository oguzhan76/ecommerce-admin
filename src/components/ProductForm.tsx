'use client'

import { useState, FormEvent } from 'react'
import { UploadDropzone } from '@/lib/uploadthing';
import ImagesList from './ImagesList';
import Link from 'next/link';
import axios, { AxiosResponse } from 'axios';
import useOnComponentUnmounts from '../hooks/useOnComponentUnmounts';

type Props = {
    onSubmit: (p: ProductDoc | Product) => void,
    productInfo?: ProductDoc | Product
}

export default function ProductForm({ onSubmit, productInfo }: Props) {
    const [title, setTitle] = useState<string>(productInfo?.title || '');
    const [description, setDescription] = useState<string>(productInfo?.description || '');
    const [price, setPrice] = useState<string>(productInfo?.price || '');
    const [images, setImages] = useState<SelectableImage[]>(productInfo?.images || []);
    const [stagedImages, setStagedImages] = useState<SelectableImage[]>([]);
    const [saving, setSaving] = useState<boolean>(false);
    useOnComponentUnmounts<ImageType[]>(deleteStagedFiles, stagedImages);

    // Callback function to be used in useOnComponentUnmounts hook.
    async function deleteStagedFiles(data: ImageType[]) {
        if (!data.length || saving) return;
        const fileKeys = data.map(img => img.fileKey);
        try {
            await axios.put('/api/products', fileKeys);
        } catch (error) {
            console.error(error.response.data.message);
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // to prevent deleteStagedImages to delete images when saving
        setSaving(true);
        const imgs: ImageType[] = images.concat(stagedImages)
        const productData = {
            ...productInfo,
            title,
            description,
            price,
            images: imgs
        }
        onSubmit(productData);
    }

    async function deleteSelectedImages() {
        // Delete from uploadthing
        const imagesToDelete: SelectableImage[] = images.filter(item => item.selected);
        const fileKeys: string[] = imagesToDelete.map(img => img.fileKey);
        const db: Promise<AxiosResponse> = axios.put('/api/products', fileKeys);

        // Update the product in the database
        const temp = images.filter(item => !item.selected);
        setImages([...temp]);
        const productData = {
            ...productInfo,
            title,
            description,
            price,
            images: temp
        };
        const ut: Promise<AxiosResponse> = axios.patch('/api/products/', productData);

        try {
            await Promise.all([db, ut])
        } catch (error) {
            console.error(error);
        }
    }

    function deleteSelectedStagedImages() {

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
                    ? <ImagesList images={images} setImages={setImages} deleteSelectedImages={deleteSelectedImages} />
                    : <div className='text-sm text-red-500 italic'>No photos in this product</div>
                }
                <UploadDropzone
                    endpoint='imageUploader'
                    onClientUploadComplete={(res) => {
                        if (res) {
                            console.log('upload complete')
                            setStagedImages(prev => prev.concat(res))
                        };
                    }}
                    onUploadError={(err: Error) => console.log(err)}
                />
                {!!stagedImages.length &&
                    <section>
                        <div>
                            <p className='mt-2' >{stagedImages.length} staged files</p>
                        </div>
                        <ImagesList images={stagedImages} setImages={setStagedImages} />
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
                    <Link href={"/products"} className='btn-primary mt-2'>{'<Back'}</Link>
                    <button type='submit' className='btn-primary mt-2'>Save</button>
                </div>
            </form>
        </>
    )
}