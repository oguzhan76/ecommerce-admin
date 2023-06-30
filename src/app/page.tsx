import Link from 'next/link';

export default function Home() {
    return (
        <div className="bg-cyan-500 w-screen h-screen flex items-center" >
            <div className="text-center w-full">
                <Link className="underline font-bold text-xl" href='/signin'>Signin</Link>

            </div>
        </div>
    )
}
