import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Providers } from './provider';

import "./globals.css"
export default function RootLayout(props: any) {
  return (
    <html lang="en">
      <body>
        <Providers >
          <AppRouterCacheProvider>
            {props.children}
          </AppRouterCacheProvider>
        </Providers>
      </body>
    </html>
  );
}
