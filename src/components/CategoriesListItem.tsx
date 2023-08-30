'use client'

import { useState, useRef, FormEvent, useMemo, useEffect } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import CategoryParentDropdown from './CategoryParentDropdown';
import Dialog from './Dialog';
import { useCategoriesContext } from '@/contexts/CategoriesContext';
import ExpandArrow from './ExpandArrow';
import PropertyListItem from './PropertyListItem';

type Props = {
    item: Category,
    onEdit: (cat: Category) => void,
    onDelete: () => void
};

export default function CategoriesListItem({ item, onEdit, onDelete }: Props) {
    const {
        categories,
        listExpanded,
        categoriesMap,
        isDescendant,
        getAllDescendantsOf
    } = useCategoriesContext();
    const [showSubs, setShowSubs] = useState<boolean>(listExpanded);
    const [showProperties, setShowProperties] = useState<boolean>(false);
    const categoryNameRef = useRef<HTMLInputElement>(null);
    const deleteDialogRef = useRef<HTMLDialogElement | null>(null);
    const [editing, setEditing] = useState<boolean>(false);
    const [newParentId, setNewParentId] = useState<string | undefined>(undefined);
    const [deleteSubs, setDeleteSubs] = useState<boolean>(false);

    const [editedProperties, setEditedProperties] = useState<Property[]>(item.properties);


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

        const editedCategory: Category = {
            _id: item._id,
            name: categoryNameRef.current?.value || '',
            parent: newParentId || item.parent,
            properties: editedProperties
        }

        try {
            const res = await axios.patch(`/api/categories/${item._id}`, editedCategory);
            setEditing(false);
            onEdit(res.data);
            setNewParentId(undefined);
        } catch (error) {
            alert(`Error when editing. Try again!`);
        }
    }

    function onEditProperties(editedProperty: Property): boolean {
        console.log('edited', editedProperty);
        console.log('props', editedProperties);
        if(editedProperties.some(i => i.name === editedProperty.name))
            return false;
        setEditedProperties(editedProperties.map(prop => prop._id === editedProperty._id ? editedProperty : prop ));
        return true;
    }

    async function deleteItem() {
        try {
            if (deleteSubs) {
                const itemsToRemove = getAllDescendantsOf(item._id);
                itemsToRemove.push(item._id);
                await axios.put('/api/categories', { ids: itemsToRemove });
            }
            else {
                const res1 = axios.put(`/api/categories/${item._id}`);
                // Shift all the subs' parent to this item's parent
                const res2 = axios.patch('/api/categories/shiftsubs', { id: item._id, newParent: item.parent });
                await Promise.all([res1, res2]);
            }
            onDelete();
        } catch (error) {
            if (error instanceof AxiosError)
                alert(`Error! ${error.response?.data.message}`);
            else
                alert('Error when deleting this category!');
        }
    }

    function handleClickOnItem(e: React.MouseEvent<HTMLDivElement>) {
        if ((e.target as HTMLElement).tagName === 'DIV')
            setShowProperties(prev => !prev);
    }

    function showDialog() {
        deleteDialogRef.current?.showModal();
    }

    function cancelEdit() {
        setEditing(false);
        setEditedProperties(item.properties);
    }

    const editForm = (
        <div key={item._id} className='list-item h-16'>
            <form onSubmit={saveEdit} className='flex gap-3'>
                <input ref={categoryNameRef} type='text' className='pl-1 w-72 input-border' defaultValue={item.name} autoFocus />
                <CategoryParentDropdown
                    categoriesToShow={categories.filter(i => item._id !== i._id && !isDescendant(item._id, i._id))}
                    setParent={setNewParentId}
                    defaultId={item.parent}
                />
                <button type='submit' className='btn btn-primary'>Save</button>
                <button type='button' onClick={cancelEdit} className='btn btn-primary'>Cancel</button>
            </form>
        </div>
    )

    const listIndent = !!subs.length ? '' : 'pl-2'

    const listItem = (
        <>
            <div key={item._id} className={`list-item h-10 ${listIndent} hover:bg-gradient-to-r from-cyan-100 hover:cursor-pointer`} onClick={handleClickOnItem}>
                <div className='flex w-10/12 h-full items-center ' >
                    {!!subs.length && (
                        <button
                            className='bg-none pr-2 text-sky-600'
                            onClick={() => setShowSubs(prev => !prev)}
                        >
                            {showSubs ? <ExpandArrow direction='right' /> : <ExpandArrow direction='down' />}
                        </button>)
                    }
                    <p className=''>{item.name}</p>
                </div>
                <div className='flex flex-row gap-2'>
                    <button className='btn btn-primary' onClick={() => { setEditing(true); setShowProperties(true) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                    </button>
                    <button className='btn btn-primary w-fit' onClick={showDialog}>
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
                    <input type='checkbox' id='checkboxId' className='w-4 mx-2 align-middle' onChange={(c) => setDeleteSubs(c.target.checked)} />
                    <label htmlFor='checkboxId' className='m-0'>Delete subcategories</label>
                </div>
            </Dialog>
            {editing ? editForm : listItem}
            {showProperties &&
                <section className='pl-4 mb-2 bg-cyan-100/50 rounded-b-lg'>
                    {!!editedProperties.length && editedProperties.map(item => (
                        <div key={item.name} className='flex items-center gap-5 h-fit min-h-8 '>
                            <PropertyListItem property={item} allowEditing={editing} onEdit={onEditProperties} />
                        </div>
                    ))}
                </section>
            }
            {(showSubs && !!subs.length) && subsList}
        </>
    )
}