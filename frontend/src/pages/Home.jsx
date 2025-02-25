import React from 'react'
import Navbar from '../components/Navbar';
import NoteCard from '../components/NoteCard';
import { MdAdd } from 'react-icons/md';

const Home = () => {
  return (
    <>
      <Navbar/>

      <div className='container mx-auto'>

        <div className='grid grid-cols-3 gap-4 mt-8'>
        <NoteCard 
          title="Meeting on 7th March"
          date="26 Feb 2025"
          content="Meeting for Interview via Meet"
          tags="#meeting"
          isPinned={true}
          onEdit={()=>{}}
          onDelete={()=>{}}
          onPinNote={()=>{}}
        />
        </div>
      </div>

      
      <button className='w-16 h-16 flex items-center justify-center rounded-xl bg-[#2B85FF] hover:bg-blue-600 absolute right-10 bottom-10 cursor-pointer' onClick={()=> {}}>
        <MdAdd className='text-[32px] text-white'/>
      </button>
    </>
  )
}

export default Home;