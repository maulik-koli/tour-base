import React from 'react'
import ReduxProvider from './redux'
import QueryProvider from './react-query'

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ReduxProvider>
            <QueryProvider>
                {children}
            </QueryProvider>
        </ReduxProvider>
    )
}

export default AppProvider
