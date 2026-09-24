"use client";

import React from "react";
import { NauticaSapphirePortfolio } from "@/components/clean/NauticaSapphirePortfolio";
import { ContactModal } from "@/components/contact/ContactModal";
import "@/app/nautica-sapphire.css";

export default function Home() {
  return (
    <main>
      <NauticaSapphirePortfolio />
      <ContactModal />
    </main>
  );
}
