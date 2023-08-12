import React from 'react'

type Props = {
    dialogRef: React.MutableRefObject<HTMLDialogElement | null>,
    title?: string,
    acceptButtonText?: string,
    cancelButtonText?: string,
    noCancelButton?: boolean,
    onClose?: () => void,
    onCancel: () => void,
    onAccept: () => void,
    children: React.ReactNode
}

export default function Dialog({ 
    dialogRef, 
    title, 
    acceptButtonText = 'Yes', 
    cancelButtonText = 'Cancel',
    noCancelButton,
    onClose,
    onCancel, 
    onAccept, 
    children 
}: Props) {

    function cancel() {
        dialogRef.current?.close();
        onCancel();
        if (onClose) onClose();
    }

    function accept() {
        dialogRef.current?.close();
        onAccept();
        if (onClose) onClose();
    }
    return (
        <>
            <dialog ref={dialogRef} onCancel={cancel} className='rounded-lg backdrop:bg-cyan-900/30 p-0'>
                <div>
                    {title && <div className='text-center bg-red-700/70 p-1'>
                        {title}
                    </div>}
                    <div className='text-center p-2 pb-0'>
                        {children}
                    </div>
                    <div className='flex gap-2 justify-center p-2'>
                        <button className='btn-primary' onClick={accept}>{acceptButtonText}</button>
                        {!noCancelButton && <button className='btn-primary' onClick={cancel}>{cancelButtonText || 'Cancel'}</button>}
                    </div>
                </div>
            </dialog>
        </>
    )
}
// bg-cyan-600/50