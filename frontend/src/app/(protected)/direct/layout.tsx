import { ReactNode } from 'react'

import ChatLists from './chatLists'
import SocketClient from './socketClient'

export default function DirectLayout(props: { children: ReactNode }) {
  return (
    <div className="flex items-center">
      <ChatLists />
      <SocketClient />
      <div className="flex w-full h-full justify-center items-center">
        {props.children}
      </div>
    </div>
  )
}