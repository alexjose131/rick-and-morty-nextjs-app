import { Sidebar } from "@/components/common/sidebar";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div>
          <Sidebar />
        </div>
        <div className="py-10 px-5  md:px-20 h-svh">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
