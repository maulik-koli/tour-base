'use client'
import AppProvider from '@/provider'
import React from 'react'
import Header from '../header'
import Footer from '../footer'
import { Toaster } from '@ui/sonner'


const AppMain: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <AppProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <Toaster position="top-right" />
        </AppProvider>
    )
}

export default AppMain
