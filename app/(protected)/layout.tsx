import { Toaster } from "@/app/_components/ui/sonner"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-full bg-neutral text-white">
        {children}
        <Toaster richColors position="top-right"/>
      </body>
    </html>
  );
}
