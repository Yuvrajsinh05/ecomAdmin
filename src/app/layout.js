import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import "./globals.css";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { MiniDrawer } from "./drawer";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
        <MiniDrawer  children={children}/>
+           </ThemeProvider>
          
            {/* {children} */}

        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
