import { Sidebar } from "@/components/common/sidebar";

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
        <div className="flex flex-col items-center min-h-screen h-full py-10 ">
          {children}
        </div>
      </body>
    </html>
  );
}
