import { useState, useRef } from 'react'

type Props = {
    onSave: (property: Property) => boolean,
    onCancel?: () => void,
    defaults?: Property,
    editMode?: boolean
}

export default function PropertyForm({ onSave, onCancel, defaults = { name: '', values: [] }, editMode = false }: Props) {
    const propertyNameRef = useRef<HTMLInputElement>(null);
    const propertyValuesRef = useRef<HTMLInputElement>(null);
    const [propertyError, setPropertyError] = useState<string>('');


    function saveProperty() {
        if (!propertyNameRef.current?.value)
            return setPropertyError('A name should be provided for a new property');
        if (!propertyValuesRef.current?.value)
            return setPropertyError('Values should be provided for a new property');

        const result = onSave({
            ...defaults,
            name: propertyNameRef.current?.value,
            values: getTrimmedValues()
        });

        if (!result)
            return setPropertyError('A property with the same name already exists.');

        propertyNameRef.current.value = '';
        propertyValuesRef.current.value = '';
        setPropertyError('');
    }

    function getTrimmedValues() {
        const values: string[] | undefined = propertyValuesRef.current?.value.split(',');
        if(values === undefined)
            return [];
        
        return values.map(item => item.trim()).filter(item => item !== "");
    }

    function handleEnterKey(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') saveProperty();
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
                    placeholder='Values (Separate with comma)'
                    defaultValue={defaults.values.join(',')}
                />
                <button
                    className='btn btn-small rounded text-sm leading-3 p-1 mx-2 h-7'
                    onClick={saveProperty}
                >
                    {editMode ? 'Save' : 'Add'}
                </button>
                {editMode &&
                    <button onClick={onCancel} className='btn border-none text-red-600 hover:shadow-none'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                }
            </div>
        </>
    )
}