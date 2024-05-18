import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query.ts'

const colors = {
  brand: {
    blue: '#388ccc',
    navyBlue: '#1a2933',
  },
}

const theme = extendTheme({ colors })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
