"use client";

import { ArrowLeftIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function BackButton({
  hasText = false,
  size = "default",
}: {
  hasText?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
}) {
  const router = useRouter();
  return (
    <Button
      size={size}
      onClick={() => router.back()}
      className="flex grow gap-2"
    >
      {hasText && <span>Back</span>}
      <ArrowLeftIcon />
    </Button>
  );
}
