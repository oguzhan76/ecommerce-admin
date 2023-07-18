import "@uploadthing/react/styles.css";
import React, { Suspense } from 'react'
import Loading from "./loading";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Products',
  description: 'List of products in database'
}

export default function layout({ children }: { children: React.ReactNode }) {
  return (
      <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
  )
}