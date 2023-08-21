import CategoriesContextProvider from "@/contexts/CategoriesContext"

export const metadata = {
  title: 'Categories',
  description: 'Admin panel for Categories',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <CategoriesContextProvider>
        {children}
    </CategoriesContextProvider>
  )
}
