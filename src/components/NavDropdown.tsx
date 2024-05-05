'use client'

import { User } from "@/payload-types"
import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import Link from "next/link"
import SignOutButton from "./SignOutButton"
import { Button } from "./ui/button"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "./ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { ChevronDown, User as UserIcon } from "lucide-react"

const NavDropdown = ({ user, className }: {user: User, className: string}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className={cn('overflow-visible', className)}>
        <Button
          variant='ghost'
          size='sm'
          className='relative flex gap-1'>
          <UserIcon fill="#F9FAFB" className="h-4 w-4 text-gray-400" />
          My account
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
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
          <Link className="w-full" href='/sell'>Seller Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SignOutButton className="w-full flex" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NavDropdown