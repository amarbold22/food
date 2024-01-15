import React, { PropsWithChildren } from 'react'
import { theme } from './theme'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material"

const ThemeProvider = ({ children } : PropsWithChildren) => {
  return (
    <AppRouterCacheProvider>
        <MuiThemeProvider theme={theme}>
            <CssBaseline>{children}</CssBaseline>
        </MuiThemeProvider>
    </AppRouterCacheProvider>
  )
}

export default ThemeProvider;