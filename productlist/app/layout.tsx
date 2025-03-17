import type { Metadata } from "next";
import "./globals.css";
import Providers from "../redux/Providers";
import ReactQueryProvider from "../app/providers/ReactQueryProvider"

export const metadata: Metadata = {
  title: "Task Management App",
  description: "Using Next.js, create the task management app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex">
        <Providers>
          <ReactQueryProvider>
            <main className="flex-grow p-5">{children}</main>
          </ReactQueryProvider>
        </Providers>
      </body>
    </html>
  );
}
