'use client'

import useMappedCategories from "@/hooks/useMappedCategories";
import { createContext, useState, useContext } from "react";

type CategoriesContext = {
    categories: Category[],
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>,
    listExpanded: boolean,
    setListExpanded: React.Dispatch<React.SetStateAction<boolean>>,
    categoriesMap: CategoriesMap,
    isDescendant: (itemId: string, descendantId: string) => boolean,
    getAllDescendantsOf: (id: string) => string[];
}

export const CategoriesContext = createContext<CategoriesContext | null>(null);

export default function CategoriesContextProvider({children}: { children: React.ReactNode }) {
    const [categories, setCategories] = useState<Category[]>([]);
    const [listExpanded, setListExpanded] = useState<boolean>(false);
    const { categoriesMap, isDescendant, getAllDescendantsOf } = useMappedCategories(categories);

    return (
        <CategoriesContext.Provider
            value={ { 
                categories, 
                setCategories, 
                listExpanded, 
                setListExpanded,
                categoriesMap,
                isDescendant,
                getAllDescendantsOf 
            }}
        >
            {children}
        </CategoriesContext.Provider>
    )
}

export function useCategoriesContext() {
    const context = useContext(CategoriesContext);

    if(!context) 
        throw new Error('CategoriesContext must be used inside CategoriesContextProvider');

    return context;
}