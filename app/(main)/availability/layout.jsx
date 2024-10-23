import React, { Suspense } from 'react'

export default function EventPage({ children }) {
    return (
        <div className="mx-auto">
            <Suspense fallback={<div>Loading Events...</div>}>
                {children}
            </Suspense>
        </div>
    )
}