'use client'

import { useState, useRef, FormEvent, useMemo, useEffect } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import CategoryParentDropdown from './CategoryParentDropdown';
import Dialog from './Dialog';
import { useCategoriesContext } from '@/contexts/CategoriesContext';

const ARROW_DIM = 'w-4 h-4'
const arrow = {
    down: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={ARROW_DIM}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    ),
    right: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={ARROW_DIM}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
    )
}

type Props = {
    item: Category,
    onEdit: (cat: Category) => void,
    onDelete: () => void
};

export default function CategoriesListItem({ item, onEdit, onDelete }: Props) {
    const { categories, listExpanded, categoriesMap, isDescendant, getAllDescendantsOf } = useCategoriesContext();
    const [showSubs, setShowSubs] = useState<boolean>(listExpanded);
    const inputRef = useRef<HTMLInputElement>(null);
    const deleteDialogRef = useRef<HTMLDialogElement | null>(null);
    const [editing, setEditing] = useState<boolean>(false);
    const [newParentId, setNewParentId] = useState<string | undefined>(undefined);
    const [deleteSubs, setDeleteSubs] = useState<boolean>(false);

    useEffect(() => {
        setShowSubs(listExpanded);
    }, [listExpanded]);

    const subs: Category[] = useMemo<Category[]>(() => {
        const childIds = categoriesMap.get(item._id)?.subs;
        if (!childIds) return [];
        return childIds.map(childId => categoriesMap.get(childId)!.self);
    }, [categoriesMap, item]);

    async function saveEdit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!newParentId) {
            if (item.name === inputRef.current?.value)
                return setEditing(false);
        }

        const editedCategory: Category = {
            _id: item._id,
            name: inputRef.current?.value || '',
            parent: newParentId || item.parent,
        }

        try {
            const res = await axios.patch('/api/categories', editedCategory);
            setEditing(false);
            onEdit(res.data);
            setNewParentId(undefined);
        } catch (error) {
            alert(`Error when editing. Try again!`);
        }
    }

    async function deleteItem() {
        try {
            if(deleteSubs) {
                const itemsToRemove = getAllDescendantsOf(item._id);
                itemsToRemove.push(item._id);
                await axios.put('/api/categories', { ids: itemsToRemove});
            }
            else {
                const res1 = axios.put(`/api/categories/${item._id}`);
                // Shift all the subs parent to this item's parent
                const res2 = axios.patch('/api/categories/shiftsubs', { id: item._id, newParent: item.parent });
                await Promise.all([res1, res2]);
            }
            onDelete();
        } catch (error) {
            if(error instanceof AxiosError)
                alert(`Error! ${error.response?.data.message}`);
            else 
                alert('Error when deleting this category!');
        }
    }

    function showDialog() {
        deleteDialogRef.current?.showModal();
    }

    const editForm = (
        <div key={item._id} className='list-item h-16'>
            <form onSubmit={saveEdit} className='flex gap-3'>
                <input ref={inputRef} type='text' className='pl-1 w-72 input-border' defaultValue={item.name} autoFocus />
                <CategoryParentDropdown
                    categoriesToShow={categories.filter(i => item._id !== i._id && !isDescendant(item._id, i._id))}
                    setParent={setNewParentId}
                    defaultId={item.parent}
                />
                <button type='submit' className='btn-primary'>Save</button>
                <button type='button' onClick={() => setEditing(false)} className='btn-primary'>Cancel</button>
            </form>
        </div>
    )

    const listIndent = !!subs.length ? '' : 'pl-8'
    
    const listItem = (
        <>
            <div key={item._id} className={`list-item h-10 ${listIndent}`}>
                <div className='flex'>
                    {!!subs.length && (
                        <button
                            className='bg-none pr-4 text-sky-600'
                            onClick={() => setShowSubs(prev => !prev)}
                        >
                            {showSubs ? arrow.right : arrow.down}
                        </button>)
                    }
                    <p className='w-96'>{item.name}</p>
                </div>
                <div className='flex flex-row gap-2'>
                    <button className='flex btn-primary' onClick={() => setEditing(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                    </button>
                    <button className='flex btn-primary w-fit' onClick={showDialog}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )

    const subsList = (
        <div className='pl-6 flex flex-col gap-1 border-l-2 border-dotted border-cyan-100'>
            {subs.map(item =>
                <CategoriesListItem
                    key={item._id}
                    item={item}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />)}
        </div>
    )

    return (
        <>
            <Dialog
                dialogRef={deleteDialogRef}
                title='Are you sure?'
                onAccept={deleteItem}
            >
                <p>Deleting category &apos;<span className='italic'>{`${item.name}`}</span>&apos; !</p>
                <div className='my-4 flex'>
                    <input type='checkbox' id='checkboxId' className='w-4 mx-2 align-middle' onChange={(c) => setDeleteSubs(c.target.checked)}/>
                    <label htmlFor='checkboxId' className='m-0'>Delete subcategories</label>
                </div>
            </Dialog>
            {editing ? editForm : listItem}
            {(showSubs && !!subs.length) && subsList}

        </>
    )
}