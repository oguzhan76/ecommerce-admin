'use client'

import { createContext, useState, useContext } from "react";

type PropertiesContext = {
    properties: Property[],
    setProperties: React.Dispatch<React.SetStateAction<Property[]>>,
    deneme: boolean,
    setDeneme: React.Dispatch<React.SetStateAction<boolean>>,
}

export const PropertiesContext = createContext<PropertiesContext | null>(null);

export default function PropertiesContextProvider({ children }: { children: React.ReactNode }) {
    const [properties, setProperties] = useState<Property[]>([]);
    const [deneme, setDeneme] = useState<boolean>(false);

    console.log('context', properties);
    return (
        <PropertiesContext.Provider
            value={{properties, setProperties, deneme, setDeneme }}
        >
            {children}
        </PropertiesContext.Provider>
    )
}

export function usePropertiesContext() {
    const context = useContext(PropertiesContext);

    if(!context)
        throw new Error('PropertiesContext must be used inside PropertiesContextProvider');

    return context;
}