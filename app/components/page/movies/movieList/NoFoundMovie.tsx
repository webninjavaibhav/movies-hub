import Button from '../../../common/Button'
import Typography from '../../../common/Typography'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function NoFoundMovie() {
    const router = useRouter();
    return (
        <div className="h-screen px-6 flex items-center text-center justify-center flex-col gap-10">
            <Typography variant="h2" className="leading-[56px]">Your movie list is empty</Typography>
            <Button variant='filled' className='px-4 py-7 max-md:w-full' onClick={() => router.push("/create-movie")} >Add a new movie</Button>
        </div>
    )
}
