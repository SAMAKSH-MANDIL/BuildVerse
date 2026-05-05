"use client";

import React from "react";
import BuildverseBootLoader from "./BuildverseBootLoader";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BuildverseBootLoader />
      {children}
    </>
  );
}
