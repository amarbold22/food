'use client'
import React, { PropsWithChildren } from 'react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material"

import { theme } from './theme'

export const ThemeProvider = ({ children } : PropsWithChildren) => {
  return (
    <AppRouterCacheProvider>
        <MuiThemeProvider theme={theme}>
            <CssBaseline>{children}</CssBaseline>
        </MuiThemeProvider>
    </AppRouterCacheProvider>
  )
}

