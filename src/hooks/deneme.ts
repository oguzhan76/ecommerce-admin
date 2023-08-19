import React, { useMemo} from 'react'

export default function useAnan(exp: Boolean) {
    const anan = useMemo(() => exp ? 'anan is used' : 'or not', [exp]);
    console.log('use ANAN')
    return anan;
}
