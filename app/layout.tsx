import "./reset.css";
import "./global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <header>레이아웃 테스트요</header>
        {children}
      </body>
    </html>
  );
}
