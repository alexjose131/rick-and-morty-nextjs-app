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
        <div className="flex flex-col justify-center items-center min-h-screen h-full px-5 lg:pt-5 lg:px-20">
          {children}
        </div>
      </body>
    </html>
  );
}
