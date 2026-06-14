import { Toaster } from "@/app/_components/ui/sonner";
import Header from "../_components/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <div className="mt-46 md:mt-40">{children}</div>
      <Toaster richColors position="top-right" />
    </>
  );
}
