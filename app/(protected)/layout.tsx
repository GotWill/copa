import { Toaster } from "@/app/_components/ui/sonner"
import Header from "../_components/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-full flex flex-col bg-neutral text-white">
        <Header />
        {children}
        <Toaster richColors position="top-right"/>
      </body>
    </html>
  );
}
