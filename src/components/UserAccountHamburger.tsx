import { getServerSideUser } from '@/lib/payload-utils'
import { cookies } from 'next/headers'
import Link from 'next/link'
import SignOutButton from './SignOutButton'
import { buttonVariants } from './ui/button'
import { SheetClose } from './ui/sheet'

export async function UserAccountHamburger() {
  const nextCookies = cookies()
  const {user} = await getServerSideUser(nextCookies)
  return (      
        user
        ? (
          <SheetClose asChild>
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
  )
}