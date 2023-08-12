'use client'

import React, { useRef } from 'react';
import Dialog from './_components/Dialog';

export default function DialogPage() {
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    function openDialog() {
        dialogRef.current?.showModal();
    }

    function onCancel() {
        console.log('canceled')
    }

    function onAccept() {
        console.log('accepted')
    }
    return (

        <div>
            <Dialog dialogRef={dialogRef} title='Deleting Category' onCancel={onCancel} onAccept={onAccept} >
                <p>Are you sure?</p>
            </Dialog>
            <button className='btn-primary mr-2' onClick={openDialog}>Open</button>
        </div>
    )
}