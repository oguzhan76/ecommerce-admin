import "@uploadthing/react/styles.css";
import SessionLayout from '@/components/SessionLayout'
import React, { Suspense } from 'react'
import Loading from "./loading";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <SessionLayout>
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
    </SessionLayout>
  )
}