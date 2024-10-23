"use client"

import React, { useState } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from './ui/button'
import { Link, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import useFetch from '@/hooks/use-fetch'
import { deleteEvent } from '@/actions/events'

const EventCard = ({ event, username, isPublic = false }) => {
    const [isCopied, setIsCopied] = useState(false);
    const router = useRouter();

    const { loading, fetchData: fndeleteEvent } = useFetch(deleteEvent);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(`${window.location.origin}/${username}/${event.id}`)
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 2000)
        } catch (error) {
            console.log("Failed to copy:", error);

        }
    }

    const handleDeleteEvent = async () => {
        if (window?.confirm("Are you sure you want to delete this event?")) {
            await fndeleteEvent(event.id);
            router.refresh();
        }
    }

    const handleCardClick = (e) => {
        if(e.target.tagName !== 'BUTTON' && e.target.tagName !== 'SVG') {
            window?.open(
                `${window?.location.origin}/${username}/${event.id}`,
                "_blank"
            )
        }
    }
    return (
        <div>
            <Card className="flex flex-col justify-between cursor-pointer" onClick={handleCardClick}>
                <CardHeader>
                    <CardTitle className="text-2xl">{event.title}</CardTitle>
                    <CardDescription className="flex justify-between">
                        <span>
                            {event.duration} mins | {event.isPrivate ? "Private" : "Public"}
                        </span>
                        <span>
                            {event._count.bookings} Bookings
                        </span>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{event.description}</p>
                </CardContent>
                {!isPublic && <CardFooter className="flex gap-3">
                    <Button variant="outline" onClick={handleCopy}>
                        <Link className="mr-2 h-4 w-4" />
                        {isCopied ? "Copied!" : "Copy Link"}
                    </Button>
                    <Button variant="destructive" onClick={handleDeleteEvent} disabled={loading}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        {loading ? "Deleting..." : "Delete"}
                    </Button>
                </CardFooter>}
            </Card>
        </div>
    )
}

export default EventCard
