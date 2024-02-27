import { getServerSideUser } from '@/lib/payload-utils'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { SheetClose, SheetFooter } from './ui/sheet'

export async function FooterHamburgerNav() {
  const nextCookies = cookies()
  const {user} = await getServerSideUser(nextCookies)
  return (
    <SheetFooter className='border-t border-gray-200 py-6 flex flex-col gap-4'>
      {
        user
        ? (
          <SheetClose asChild>
            <Link href={'/sign-in'}>
              log out
            </Link>
          </SheetClose>
        )
        : (
          <>
            <SheetClose asChild>
              <Link   
                href={'/sign-in'}>
                Sign in
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href={'/sign-up'}>
                Sign up
              </Link>
            </SheetClose>
          </>
        
        )
      }
    </SheetFooter>
  )
}