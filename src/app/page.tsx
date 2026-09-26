"use client";

import React from "react";
import { BentoPortfolio } from "@/components/bento/BentoPortfolio";
import { ContactModal } from "@/components/contact/ContactModal";

export default function Home() {
  return (
    <main>
      <BentoPortfolio />
      <ContactModal />
    </main>
  );
}
