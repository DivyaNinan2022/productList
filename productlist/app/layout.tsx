import type { Metadata } from "next";
import "./globals.css";
import Providers from "../redux/Providers";


export const metadata: Metadata = {
  title: "Task Management App",
  description: "using nextks, create the task managemnt app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <Providers>
          <div style={{ display: "flex", minHeight: "100vh" }}>
            <main style={{ flexGrow: 1, padding: "20px" }}>
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
