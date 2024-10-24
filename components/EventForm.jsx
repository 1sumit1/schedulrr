"use client"

import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { eventFormSchema } from '@/app/lib/validators';
import { Button } from './ui/button';
import useFetch from '@/hooks/use-fetch';
import { CreateEvent } from '@/actions/events';
import { useRouter } from 'next/navigation';

const EventForm = ({ onSubmitForm }) => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, control } = useForm({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      duration: 30,
      isPrivate: true
    }
  })

  const { loading, error, fetchData: createEvent } = useFetch(CreateEvent);

  const onSubmit = async (data) => {
    await createEvent(data);
    if (!loading && !error) onSubmitForm();
    router.refresh();
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="px-5 flex flex-col gap-4">
      <div>
        <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
          Event Title
        </label>
        <Input title="title" {...register("title")} className='mt-1' />
        {
          errors.title &&
          <p className='text-red-500 text-sm mt-1'>{errors.title.message}</p>
        }
      </div>
      <div>
        <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
          Description
        </label>
        <Input title="description" {...register("description")} className='mt-1' />
        {
          errors.description &&
          <p className='text-red-500 text-sm mt-1'>{errors.description.message}</p>
        }
      </div>
      <div>
        <label htmlFor='duration' className='block text-sm font-medium text-gray-700'>
          Duration (minutes)
        </label>
        <Input title="duration" {...register("duration", { valueAsNumber: true })} type="number" className='mt-1' />
        {
          errors.duration &&
          <p className='text-red-500 text-sm mt-1'>{errors.duration.message}</p>
        }
      </div>
      <div>
        <label htmlFor='isPrivate' className='block text-sm font-medium text-gray-700'>
          Event Privacy
        </label>
        <Controller
          name="isPrivate"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value ? "true" : "false"}
              onValueChange={(value) => field.onChange(value === 'true')}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select Privacy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Private</SelectItem>
                <SelectItem value="false">Public</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {
          errors.isPrivate &&
          <p className='text-red-500 text-sm mt-1'>{errors.isPrivate.message}</p>
        }
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
      <Button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Create Event"}
      </Button>
    </form>
  )
}

export default EventForm
