import React from 'react'
import ReduxProvider from './redux'

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ReduxProvider>
            {children}
        </ReduxProvider>
    )
}

export default AppProvider
