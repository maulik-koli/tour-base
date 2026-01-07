import React from 'react'
import { SpinnerOverlay } from '@ui/spinner'

const PageLoader: React.FC = () => {
    return (
        <div className='h-screen w-full flex items-center justify-center bg-background'>
            <SpinnerOverlay />
        </div>
    )
}

export default PageLoader
