import { getServerSideUser } from '@/lib/payload-utils'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { SheetClose, SheetFooter } from './ui/sheet'
import SignOutButton from './SignOutButton'
import { buttonVariants } from './ui/button'

export async function FooterHamburgerNav() {
  const nextCookies = cookies()
  const {user} = await getServerSideUser(nextCookies)
  return (
    <SheetFooter className='border-t border-gray-200 py-6 flex flex-col gap-4'>
      {
        user
        ? (
          <SheetClose>
            <SignOutButton className={buttonVariants({variant:'link'})}/>
          </SheetClose>
        )
        : (
          <div className='flex gap-4 justify-center'>
            <SheetClose asChild>
              <Link
                className={buttonVariants({variant:'link'})}
                href={'/sign-in'}>
                Sign in
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link 
                className={buttonVariants({variant:'link'})}
                href={'/sign-up'}
              >
                Sign up
              </Link>
            </SheetClose>
          </div>
        
        )
      }
    </SheetFooter>
  )
}