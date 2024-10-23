"use client"

import React, { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { useRouter, useSearchParams } from "next/navigation"
import EventForm from "./EventForm" 


const CreateEventDrawer = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router=useRouter();
  const searchParams=useSearchParams();

  useEffect(()=>{
    const create=searchParams.get("create");
    if(create==='true'){
      setIsOpen(true)
    }
  },[searchParams])

  const handleClose = () => {
    setIsOpen(false);
    if(searchParams.get('create')==='true'){
       router.replace(window?.location?.pathname);
    }
  }

  return (
    <Drawer open={isOpen}>
      <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Create New Event</DrawerTitle>
          </DrawerHeader>
          <EventForm onSubmitForm={()=>{
            handleClose();
          }}/>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" onClick={handleClose}>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default CreateEventDrawer
