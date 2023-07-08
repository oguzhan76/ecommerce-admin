import { useRef, useEffect } from 'react';

type Callback = <T>(data: T) => void;
// (data: any[]) => void
const useOnComponentUnmounts = <T>(callback: (data: T) => void, data: T) => {
    const mounted = useRef<boolean>(false);

    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);

    useEffect(() => {
        return () => {
            if(!mounted.current) 
                callback(data);
        }
    }, [callback, data])
}

export default useOnComponentUnmounts;