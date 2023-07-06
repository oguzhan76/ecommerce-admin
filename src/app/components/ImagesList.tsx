import { useState, useEffect } from 'react';
import { ReactSortable } from 'react-sortablejs';


interface ItemType extends ISelectableImage {
    id: number // Required by ReactSortable
}

type Props = {
    images: IImageType[], 
    setImages?: (imgs: IImageType[]) => void
}

export default function ImagesList({ images, setImages }: Props) {
    const [list, setList] = useState<ItemType[]>(images.map((v, i) => ({ id: i, ...v })));
    const [dragging, setDragging] = useState<Boolean>(false);

    useEffect(() => {
        setList(images.map((v, i) => ({ id: i, ...v })))
    },[images]);

    function updateList(newState: ItemType[]) {
        setList(newState);
        if(!setImages) return;
        setImages(newState);
    }

    return (
        <ReactSortable list={list} setList={updateList} className='flex gap-2 flex-wrap'>
            {list.map(item => (
                <div key={item.id} className='relative w-24 h-24 rounded-lg overflow-hidden'>
                    <img alt='product image' src={item.fileUrl} className='rounded-lg' />
                    <button className="absolute top-1 left-16 text-gray-200 hover:scale-125">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            ))}
        </ReactSortable>
    )
}