"use server";

import { eventFormSchema } from "@/app/lib/validators";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";


export async function CreateEvent(data) {
    const { userId } = auth();

    if (!userId) {
        throw new Error("Unauthorized!");
    }

    const validatedData = eventFormSchema.parse(data)

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!user) {
        throw new Error("User not found!")
    }

    const createEvent = await db.event.create({
        data: {
            ...validatedData,
            userId: user.id,
        }
    })
    return createEvent;
}

export async function getUserEvents(data) {
    const { userId } = auth();

    if (!userId) {
        throw new Error("Unauthorized!");
    }

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    })

    if (!user) {
        throw new Error("User not found!");
    }

    const events = await db.event.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        include: {
            _count: {
                select: { bookings: true }
            }
        }
    })
    return { events, username: user.username };
}

export async function deleteEvent(eventId) {
    const { userId } = auth();

    if (!userId) {
        throw new Error("Unauthorized!");
    }

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    })

    if (!user) {
        throw new Error("User not found!");
    }

    const event = await db.event.findUnique({
        where: { id: eventId }
    })
    if (!event || event.userId !== user.id) {
        throw new Error("Event not found or unauthorized!");
    }

    await db.event.delete({
        where: { id: event.id }
    })
    return { success: true }
}

export async function getEventDetails(username, eventId) {
    const event = await db.event.findFirst({
        where: {
            id: eventId,
            user: {
                username: username
            }
        },
        include: {
            user: {
                select: {
                    name: true,
                    username: true,
                    email: true,
                    imageUrl: true,
                }
            }
        }
    });
    return event;
}

