import React, { useState } from 'react';
import Select from 'react-select';

type OptionType = {
    value: string,
    label: string
}

const sortOptions: OptionType[] = [
    { value: 'lastAdded', label: 'Last Added' },
    { value: 'firstAdded', label: 'First Added' },
    { value: 'alphabetical', label: 'Alphabetical' },
    { value: 'priceInc', label: 'Price: Increasing' },
    { value: 'priceDec', label: 'Price: Decreasing' },
    // { value: 'noPhotos', label: 'No Photos' },
]

type Props = {
    products: ProductDoc[],
    returnSorted: (sortedProducts: ProductDoc[]) => void
}

function SortDropdown({ products, returnSorted }: Props) {
    const [sort, setSort] = useState<OptionType | null>(null);
    const productsCopy: ProductDoc[] = [...products];

    const handleOnChange = (selected: OptionType | null) => {
        setSort(selected);
        switch (selected?.value) {
            case 'alphabetical':
                returnSorted(productsCopy.sort((a, b) => a.title.localeCompare(b.title)))
                break;
            case 'priceInc':
                returnSorted(productsCopy.sort((a, b) => a.price - b.price ));
                break;
            case 'priceDec':
                returnSorted(productsCopy.sort((a, b) => b.price - a.price ));
                break;
            default:
                break;
        }
    }

    return (
        <Select
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
            className='w-44'
            options={sortOptions}
            value={sort}
            placeholder='Sort'
            onChange={handleOnChange}
        />
    )
}

export default React.memo(SortDropdown);