import { useState, useRef } from 'react'

type Props = {
    onSave: (property: Property) => boolean,
    defaults?: Property,
    editMode?: boolean
}

export default function PropertyForm({ onSave, defaults = { name: '', values: [] }, editMode = false }: Props) {
    const propertyNameRef = useRef<HTMLInputElement>(null);
    const propertyValuesRef = useRef<HTMLInputElement>(null);
    const [propertyError, setPropertyError] = useState<string>('');


    function addNewProperty() {
        if(!propertyNameRef.current?.value) 
            return setPropertyError('A name should be provided for a new property');
        if(!propertyValuesRef.current?.value)
            return setPropertyError('Values should be provided for a new property');

        const result = onSave({
            ...defaults,
            name: propertyNameRef.current?.value, 
            values: propertyValuesRef.current?.value.split(',')
        });

        if(!result)
            return setPropertyError('A property with the same name already exists.');

        propertyNameRef.current.value = '';
        propertyValuesRef.current.value = '';
        setPropertyError('');
    }

    function handleEnterKey(e: React.KeyboardEvent<HTMLInputElement>) {
        if(e.key === 'Enter') addNewProperty();
    }

    return (
        <>
            {propertyError && <p className='text-error'>* {propertyError}</p>}
            <div className='flex flex-wrap gap-2'>
                <input 
                    onKeyDown={handleEnterKey} 
                    ref={propertyNameRef} 
                    className='w-44' 
                    placeholder='Name' 
                    defaultValue={defaults.name}
                />
                <input 
                    onKeyDown={handleEnterKey} 
                    ref={propertyValuesRef} 
                    className='w-96' 
                    placeholder='Values (Separate with comma, no space)'
                    defaultValue={defaults.values.join(',')}
                />
                <button
                    className='btn btn-small rounded text-sm leading-3 p-1 mx-2 h-7'
                    onClick={addNewProperty}
                >
                    {editMode ? 'Save' : 'Add'}
                </button>
            </div>
        </>
    )
}