import React, { useState } from 'react';
import Select from 'react-select';

type Props = {
    categories: CategoryDoc[],
    setParent: (c: string | null) => void
}

function CategoryParentDropdown({ categories, setParent }: Props) {
    const [option, setOption] = useState<OptionType | null>();

    const Options: OptionType[] = categories.map(item => ({ value: item._id, label: item.name }));
    Options.unshift({ value: '', label: 'No parent'});

    const handleOnChange = (selected: OptionType | null) => {
        setOption(selected);
        setParent(selected?.value || null);
    }

    return (
        <Select
            className='w-44'
            options={Options}
            value={option}
            placeholder='Sort'
            onChange={handleOnChange}
        />
    )
}

export default React.memo(CategoryParentDropdown);