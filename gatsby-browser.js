import React from 'react'
import { GlobalProvider } from './src/context/globalContext'

// be careful with spelling
export const wrapRootElement = ({ element }) => {
    return <GlobalProvider>{element}</GlobalProvider>
}