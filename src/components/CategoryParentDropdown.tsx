import React, { useState } from 'react';
import Select from 'react-select';

type OptionType = {
    value: string,
    label: string
}

type Props = {
    categoriesToShow: Category[],
    setParent: (c: string | undefined) => void,
    defaultId?: string
}

function CategoryParentDropdown({ categoriesToShow, setParent, defaultId = '' }: Props) {
    const [option, setOption] = useState<OptionType | null>();

    const Options: OptionType[] = categoriesToShow.map(item => ({ value: item._id || '', label: item.name }));
    Options.unshift({ value: '', label: 'No Parent'});

    const handleOnChange = (selected: OptionType | null) => {
        setOption(selected);
        setParent(selected?.value);
    }

    return (
        <Select
            className='w-44'
            styles={{
                control: (baseStyles, state) => ({
                ...baseStyles,
                border: 'solid #ababab94 2px',
                borderRadius: '6px',
                boxShadow: 'none',
                '&:hover': {
                    border: 'solid #8b8b8b94 2px',
                    boxShadow: 'none',
                    outline: 'none',
                },
                '&:focus-within': {
                    border: 'solid rgb(14 116 144) 2px',
                    boxShadow: 'none',
                    outline: 'none',
                }
                }),
            }}
            theme={(theme) => ({...theme})}
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