import '@/styles/globals.scss'
import { AuthUserProvider } from '@/firebase/auth'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '@/styles/theme'
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import { CssBaseline } from '@mui/material';

export default function App({ Component, pageProps }) {
  return (
    <AuthUserProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Component {...pageProps} />
      </ThemeProvider>
      </LocalizationProvider>
    </AuthUserProvider>
      
  )
  
}
