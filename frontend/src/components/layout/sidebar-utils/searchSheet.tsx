import { useRouter } from 'next/navigation'

import { ReactNode, useState } from 'react'

import SearchUserData from '#components/feature/user/searchUserData'
import { Input } from '#components/ui/input'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '#components/ui/sheet'
import { useShrinkStore, useSidebarStore } from '#store/client/sidebar.store'
import { BasicUser } from '#types/user.type'

interface SheetProps {
  children: ReactNode
  className?: string
}

export default function SearchSheet({ children, ...props }: SheetProps) {
  const router = useRouter()

  const setIsShrink = useShrinkStore((state) => state.setIsShrink)
  const { activeItem, setActiveItem } = useSidebarStore()
  const [isOpen, setIsOpen] = useState<boolean>()
  const [prevItem, setPrevItem] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  function handleClick() {
    setPrevItem(activeItem)
    setActiveItem('검색')
  }

  function handleChange(open: boolean) {
    setIsOpen(open)
    setIsShrink(open)
    if (!open) setActiveItem(prevItem)
  }

  function handleUserClick(user: BasicUser) {
    router.push(`/${user.nickname}`)
    setIsOpen(false)
    setIsShrink(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleChange}>
      <SheetTrigger className={props.className} onClick={handleClick}>
        {children}
      </SheetTrigger>
      <SheetContent side="left_on_sidebar" className="flex flex-col p-0">
        <SheetHeader className="p-6">
          <SheetTitle className="text-2xl mb-4">검색</SheetTitle>
          <SheetDescription>
            <Input
              className="rounded-md bg-gray-light w-full text-black text-md focus-visible:ring-0"
              placeholder="검색"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SheetDescription>
        </SheetHeader>
        <section className="w-full overflow-y-auto">
          <SearchUserData
            searchQuery={searchQuery}
            onClick={handleUserClick}
            containerStyle="px-6"
          />
        </section>
      </SheetContent>
    </Sheet>
  )
}
