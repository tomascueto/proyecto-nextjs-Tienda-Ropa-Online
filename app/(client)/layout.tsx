import type { Metadata } from "next";
import Navbar from '@/app/ui/home/navbar'
import Footer from '@/app/ui/home/footer'
import '@/app/ui/global.css';


export const metadata: Metadata = {
  title: "TNDA. SHOP",
  description: "Project website. Luquelli - Tom",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-customCream">
        <Navbar />
          {children}  
        <Footer />  
      </body>
    </html>
  );
}
