import React, { useState } from 'react'
import Navbar from '../components/Navbar.jsx';
import NoteCard from '../components/NoteCard.jsx';
import { MdAdd } from 'react-icons/md';
import AddEditNotes from './AddEditNotes.jsx';
import Modal from "react-modal"



const Home = () => {

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  })
  return (
    <>
      <Navbar/>

      <div className='container mx-auto'>

        <div className='grid grid-cols-3 gap-4 m-8'>
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

      
      <button className='w-16 h-16 flex items-center justify-center rounded-xl bg-[#2B85FF] hover:bg-blue-600 absolute right-10 bottom-10 cursor-pointer' onClick={()=> {
        setOpenAddEditModal({isShown: true, type: "add", data: null})
      }}>
        <MdAdd className='text-[32px] text-white'/>
      </button>

      <Modal 
        isOpen = {openAddEditModal.isShown}
        onRequestClose = {()=> {}}
        style={{
          overlay :{
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
          contentLabel=""
          className="w-[40%] max-h-3/4 bg-white rounded-2xl mx-auto mt-14 p-5"
      >
      <AddEditNotes
        type={openAddEditModal.type}
        noteData={openAddEditModal.data}
        onClose={() => {
          setOpenAddEditModal({isShown: false, type: "add", data: null})
        }}
      />
    </Modal>
    </>
  )
}

export default Home;