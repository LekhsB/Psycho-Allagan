"use client";

import { ReactNode } from "react";
import NextAuthProvider from "./NextAuthProvider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <NextAuthProvider>
      <Navbar />
      <main className="pt-16 flex-grow">
        {children}
      </main>
      <Footer />
    </NextAuthProvider>
  );
} 