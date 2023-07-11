import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { ReactSortable } from 'react-sortablejs'; //causes multiple renders onclick!

const SELECT_MARGIN = 7;


interface ItemType extends SelectableImage {
    id: number // Required by ReactSortable
}

type Props = {
    images: SelectableImage[],
    setImages?: (imgs: SelectableImage[]) => void
}

export default function ImagesList({ images, setImages }: Props) {
    const [list, setList] = useState<ItemType[]>([...images.map((v, i) => ({ id: i, selected: v.selected || false, ...v }))]);
    const mousePos = useRef<{ x: number, y: number}>({x:0, y:0});

    function updateList(newState: ItemType[]) {
        setList(newState);
        if (!setImages) return;
        setImages(newState);
    }

    function updateClickPos(e: React.MouseEvent<HTMLDivElement>) {
        if (e.button !== 0) return;
        mousePos.current = { x: e.screenX, y: e.screenY };
    }

    function isSelectClick(e: React.MouseEvent<HTMLDivElement>): boolean {
        if (e.button !== 0) return false;
        if(Math.abs(e.screenX - mousePos.current.x ) < SELECT_MARGIN 
        && Math.abs(e.screenY - mousePos.current.y) < SELECT_MARGIN){
            return true;
        }
        return false;
    }

    function onSelectItem(updatedItem: ItemType) {
        const newList: ItemType[] = list.map(item => {
            if(item.id === updatedItem.id){
                return { ...item, selected: !item.selected }
            }
            return item;
        })
        updateList(newList);
    }

    return (
        <ReactSortable list={list} setList={updateList} className='flex gap-2 flex-wrap' >
            {list.map(item => (
                <div
                    key={item.id}
                    className='relative w-20 h-20 rounded-lg'
                    onMouseDown={updateClickPos}
                    onMouseUp={(e)=> {if(isSelectClick(e))  onSelectItem(item) }}
                >
                    <Image 
                        fill={true} 
                        sizes='10vw'
                        alt='product image' 
                        src={item.fileUrl} 
                        className='rounded-lg z-0 h-full object-cover' 
                    />
                    {item.selected && <>
                        <div className='w-20 h-20 left-0 top-0 rounded-lg absolute bg-black bg-opacity-30 z-10'>
                        </div>
                        <div className='absolute left-0 top-0 w-full h-full text-slate-200 z-20 bg-none flex justify-center items-center'> 
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </>}
                    <div className='absolute left-0 top-0 w-full h-full flex justify-end items-start'>
                    <button className="text-gray-200 hover:scale-125">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    </div>
                </div>
            ))}
        </ReactSortable>
    )
}