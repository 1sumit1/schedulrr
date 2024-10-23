import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import CreateEventDrawer from "@/components/CreateEvent";
import "./globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({children}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={inter.className}
        >
          <Header />
          <main className="min-h-screen bg-gradient-to-b from-blue-50  to-white">
            {children}
          </main>
          <footer className="bg-blue-500 py-12">
            <div className="container mx-auto text-center text-gray-600">
              <p>All rights reserved &copy;2024</p>
            </div>
          </footer>
          <CreateEventDrawer />
        </body>
      </html>
    </ClerkProvider>
  );
}
