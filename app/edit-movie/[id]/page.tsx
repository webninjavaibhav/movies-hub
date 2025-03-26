"use client"
import React from 'react'
import CreateMoviePage from '@/app/components/page/movies/createMovie/CreateMoviePage'

export default function EditMovie({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = React.use(params);
    return (
        <CreateMoviePage movieId={resolvedParams.id} />
    )
} 