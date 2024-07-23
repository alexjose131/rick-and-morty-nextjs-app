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
        <div className="py-10  px-20 h-svh">{children}</div>
      </body>
    </html>
  );
}
