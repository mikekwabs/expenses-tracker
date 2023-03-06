import '@/styles/globals.scss'
import { AuthUserProvider } from '@/firebase/auth'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '@/styles/theme'

export default function App({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthUserProvider>
      
  )
  
}
