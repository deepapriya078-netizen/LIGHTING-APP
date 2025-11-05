export const metadata = {
  title: "Lighting App",
  description: "Play & Earn Gaming Rewards MVP",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
