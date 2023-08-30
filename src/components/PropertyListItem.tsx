import React, { useEffect, useState } from 'react'
import PropertyForm from './PropertyForm';

type Props = {
    property: Property,
    allowEditing?: boolean,
    onEdit: (editedProperty: Property) => boolean
}

export default function PropertyListItem({ property, allowEditing = false, onEdit }: Props) {
    const [editingProperty, setEditingProperty] = useState<boolean>(false);

    // When editmode is closed in the parent, close it here too.
    useEffect(() => {
        if (!allowEditing)
            setEditingProperty(false);
    }, [allowEditing])

    function onEditProperty(editedProperty: Property): boolean {
        const result = onEdit(editedProperty);
        if (result)
            setEditingProperty(false);
        return result;
    }

    return (
        <div className='flex items-center gap-5 my-1 h-fit'>
            {allowEditing &&
                <>
                    <button className="btn border-none hover:shadow-none">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                    {!editingProperty &&
                        <button className="btn border-none hover:shadow-none" onClick={() => setEditingProperty(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                            </svg>
                        </button>
                    }
                </>
            }
            {allowEditing && editingProperty ?
                <div className=''>
                    <PropertyForm onSave={onEditProperty} onCancel={() => setEditingProperty(false)} defaults={property} editMode />
                </div>
                :
                <>
                    <p className='w-24'>{property.name}</p>
                    <p>{property.values.map((val, i) => [
                        i > 0 && ", ",
                        <span key={i} >{val}</span>])}
                    </p>
                    {/* <PropertyForm onSave={onAddProperty}/> */}
                </>
            }

        </div>
    )
}
