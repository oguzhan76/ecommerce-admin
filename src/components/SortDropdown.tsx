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
    const productsCopy: ProductDoc[] = products.map(item => ({ ...item, price: item.price.replace(/\D\./g, "")}));
    console.log(productsCopy.forEach(item => console.log(parseInt(item.price))));


    const handleOnChange = (selected: OptionType | null) => {
        setSort(selected);
        switch (selected?.value) {
            case 'alphabetical':
                returnSorted(productsCopy.sort((a, b) => a.title.localeCompare(b.title)))
                break;
            case 'priceInc':
                returnSorted(productsCopy.sort((a, b) => {
                    return parseInt(a.price) - parseInt(b.price);
                }));
                break;
            case 'priceDec':
                returnSorted(productsCopy.sort((a, b) => {
                    return parseInt(b.price) - parseInt(a.price);
                }));
                break;
            default:
                break;
        }
    }

    return (
        <Select
            className='w-44'
            options={sortOptions}
            value={sort}
            placeholder='Sort'
            onChange={handleOnChange}
        />
    )
}

export default React.memo(SortDropdown);