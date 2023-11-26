import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Nav from '@/components/Nav';
import AuthProvider from '@/components/AuthProvider';
import { getServerSession } from 'next-auth/next';
import authOptions from './api/auth/[...nextauth]/options';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Get Snippets',
  description: 'Get snippets of your needs',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {' '}
            <main className="flex flex-col items-center">
              <Nav />
              {children}
            </main>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
