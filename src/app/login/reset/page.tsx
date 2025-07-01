"use client";

export const dynamic = "force-dynamic";
import { Suspense } from "react";
import ResetPasswordClient from "./ResetPasswordClient";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ResetPasswordClient />
    </Suspense>
  );
} 