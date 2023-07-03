import SessionLayout from '@/app/components/SessionLayout'
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionLayout>
        {children}
    </SessionLayout>
  )
}