// Dashboard

import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { AuthOptions } from '../api/auth/[...nextauth]/route';

export default async function Home() {
  const session = await getServerSession(AuthOptions);
  return (
    <>
      {session &&
        <>
          <div className='flex justify-between'>
            <h2>
              Hello, {session?.user?.name}
            </h2>
            <div className='flex bg-gray-300 gap-1 text-black rounded-2xl'>
              {session?.user?.image &&
                <Image
                  width={32}
                  height={32}
                  src={session?.user?.image}
                  alt=''
                  className='w-8 h-8 rounded-2xl'
                />
              }
              <span className='py-1 pl-2 pr-4'>{session?.user?.name}</span>
            </div>
          </div>
        </>
      }
    </>
  )
}