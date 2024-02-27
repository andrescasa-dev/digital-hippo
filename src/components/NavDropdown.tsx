'use client'

import { User } from "@/payload-types"
import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import Link from "next/link"
import SignOutButton from "./SignOutButton"
import { Button } from "./ui/button"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "./ui/dropdown-menu"

const NavDropdown = ({ user }: {user: User}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className='overflow-visible'>
        <Button
          variant='ghost'
          size='sm'
          className='relative'>
          My account
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='bg-white w-60 [&>*]:cursor-pointer [&>:first-child]:cursor-default'
        align='end'>
        <div className='flex items-center justify-start gap-2 p-2 cursor-none'>
          <div className='flex flex-col space-y-0.5 leading-none'>
            <p className='font-medium text-sm text-black'>
              {user.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href='/sell'>Seller Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NavDropdown