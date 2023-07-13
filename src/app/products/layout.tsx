import "@uploadthing/react/styles.css";
import SessionLayout from '@/components/SessionLayout'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionLayout>
        {children}
    </SessionLayout>
  )
}