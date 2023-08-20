import React, { useState } from 'react';
import Select from 'react-select';

type OptionType = {
    value: string,
    label: string
}

type Props = {
    categories: Category[],
    setParent: (c: string | undefined) => void,
    defaultId?: string
}

function CategoryParentDropdown({ categories, setParent, defaultId = '' }: Props) {
    const [option, setOption] = useState<OptionType | null>();

    const Options: OptionType[] = categories.map(item => ({ value: item._id || '', label: item.name }));
    Options.unshift({ value: '', label: 'No Parent'});

    const handleOnChange = (selected: OptionType | null) => {
        setOption(selected);
        setParent(selected?.value);
    }

    return (
        <Select
            className='w-44'
            options={Options}
            value={option}
            placeholder='Parent'
            onChange={handleOnChange}
            defaultValue={Options.find(op => op.value === defaultId)}
            isClearable={true}
            isSearchable={true}
        />
    )
}

export default React.memo(CategoryParentDropdown);