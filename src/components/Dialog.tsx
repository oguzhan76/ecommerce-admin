import React from 'react'

type Props = {
    dialogRef: React.MutableRefObject<HTMLDialogElement | null>,
    title?: string,
    acceptButtonText?: string,
    cancelButtonText?: string,
    noCancelButton?: boolean,
    onClose?: () => void,
    onCancel?: () => void,
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
        if(onCancel) onCancel();
        if (onClose) onClose();
    }

    function accept() {
        dialogRef.current?.close();
        onAccept();
        if (onClose) onClose();
    }
    return (
        <>
            <dialog ref={dialogRef} onCancel={cancel} className='rounded-lg shadow-2xl backdrop:bg-cyan-900/30 p-0 min-w-fit'>
                <div>
                    {title && <div className='text-center text-white bg-red-600 p-1'>
                        {title}
                    </div>}
                    <div className='text-center pt-4 px-8 min-w-fit'>
                        {children}
                    </div>
                    <div className='flex gap-2 justify-center p-2 mb-4'>
                        <button className='btn btn-red' onClick={accept}>{acceptButtonText}</button>
                        {!noCancelButton && <button className='btn btn-primary' onClick={cancel}>{cancelButtonText || 'Cancel'}</button>}
                    </div>
                </div>
            </dialog>
        </>
    )
}
// bg-cyan-600/50