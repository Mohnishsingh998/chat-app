import React from 'react'
import {MessageSquare} from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className='w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50'>
      <div className=' max-w-md text-center space-y-6'>
        {/* Icon Display */}
        <div className=' flex justify-center gap mb-4'>
          <div className='relative'>
            <div className='size-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce'>
            <MessageSquare className='size-8 text-primary'/>
            </div>
          </div>
        </div>
        {/* welcome text */}
        <h2 className='text-2xl font-bold'>ChatSphere</h2>
        <p className='text-base-content/60'>
        Select a Conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  )
}

export default NoChatSelected
