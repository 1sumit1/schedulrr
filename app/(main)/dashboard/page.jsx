"use client"

import { updateUsername } from '@/actions/users';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import useFetch from '@/hooks/use-fetch';
import { useUser } from '@clerk/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { usernameSchema } from '@/app/lib/validators';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { BarLoader } from 'react-spinners';
import { getLatestUpdates } from '@/actions/dashboard';
import { format } from 'date-fns';


const DashboardPage = () => {
    const { isLoaded, user } = useUser();
    const { register, handleSubmit, setValue, formState: { errors }, } = useForm({
        resolver: zodResolver(usernameSchema),
    });

    const { loading, error, fetchData } = useFetch(updateUsername);

    useEffect(() => {
        setValue("username", user?.username)
    }, [isLoaded])

    const onSubmit = (data) => {
        fetchData(data.username);
    }

    const {
        loading: loadingUpdates,
        data: upcomingMeetings,
        fetchData: fnUpdates } = useFetch(getLatestUpdates);

    useEffect(() => {
        (async () => await fnUpdates())();
    }, [])

    return (
        <div className='space-y-8'>
            <Card>
                <CardHeader>
                    <CardTitle>Welcome, {user?.firstName}</CardTitle>
                </CardHeader>
                <CardContent>
                    {
                        !loadingUpdates ? (
                            <div>
                                {
                                    upcomingMeetings && upcomingMeetings.length > 0 ? (
                                        <ul>
                                            {
                                                upcomingMeetings.map((meeting) => {
                                                    return (
                                                        <li key={meeting}>
                                                           - {meeting.event.title} on {" "}
                                                            {
                                                                format(new Date(meeting.startTime), "MMM d, yyyy h:mm a")
                                                            } {" "}
                                                            with {meeting.name}
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    ) : (
                                        <p>No upcoming meetings</p>
                                    )
                                }
                            </div>

                        ) : (
                            <p>Loading updates...</p>
                        )
                    }
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Your Unique Link</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                        <div>
                            <div className='flex items-center gap-2'>
                                <span>{window?.location?.origin}</span>
                                <Input {...register("username")} placeholder='username' />
                            </div>
                            {
                                errors.username &&
                                <p className='text-red-500 text-sm mt-1'>{errors.username.message}</p>
                            }
                            {
                                error && <p className='text-red-500 text-sm mt-1'>{errors?.message}</p>
                            }
                        </div>
                        {
                            loading && <BarLoader className='mb-4' width={"100%"} color='#36d7b7' />
                        }
                        <Button type='submit'>Update Username</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default DashboardPage
