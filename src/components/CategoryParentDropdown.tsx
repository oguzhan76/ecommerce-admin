import React, { useState } from 'react';
import Select from 'react-select';

type Props = {
    categories: Category[],
    setParent: (c: string | null) => void,
    defaultParentName?: string
}

function CategoryParentDropdown({ categories, setParent, defaultParentName = 'No Parent' }: Props) {
    const [option, setOption] = useState<OptionType | null>();

    const Options: OptionType[] = categories.map(item => ({ value: item._id || '', label: item.name }));
    Options.unshift({ value: 'no parent', label: 'No Parent'});

    const handleOnChange = (selected: OptionType | null) => {
        setOption(selected);
        setParent(selected?.value || null);
    }

    return (
        <Select
            className='w-44'
            options={Options}
            value={option}
            placeholder='Parent'
            onChange={handleOnChange}
            defaultValue={Options.find(op => op.label === defaultParentName)}
            isClearable={true}
            isSearchable={true}
        />
    )
}

export default React.memo(CategoryParentDropdown);