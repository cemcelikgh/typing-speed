import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  description: "Patika Intermediate Frontend Web Development Path Certification Task",
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      {children}
    </StoreProvider>
  );
}

export default RootLayout;
