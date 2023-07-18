import Nav from './Nav';

export default function NavigationLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className='bg-cyan-900 min-h-screen flex'>
                <Nav></Nav>
                <div className='bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4'>
                    {children}
                </div>
            </div>
        </>
    )
}