import { getUserAvailability } from '@/actions/availability'
import React from 'react'
import { defaultAvailability } from './data';
import AvailabilityForm from './_components/AvailabilityForm';

const AvailabilityPage = async () => {
  const availability=await getUserAvailability();
  console.log("availability",availability);
  
  return (
    <div>
      <AvailabilityForm initialData={availability || defaultAvailability}/>
    </div>
  )
}

export default AvailabilityPage
