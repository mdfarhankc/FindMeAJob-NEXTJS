"use client";

import Logo from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const { user } = useUser();
  const router = useRouter();
  const isAdmin = user?.publicMetadata?.role === "admin";

  return (
    <header className="sticky top-0 z-50 border-b backdrop-blur-3xl">
      <nav className="m-auto flex max-w-5xl items-center justify-between px-3 py-5">
        <Logo />
        <div className="flex items-center justify-between gap-2">
          <Button asChild size={"sm"} className="font-bold">
            <Link href={"/jobs/new"}>Post a Job</Link>
          </Button>
          <ThemeToggle />
          <SignedIn>
            <UserButton>
              {isAdmin && (
                <UserButton.MenuItems>
                  <UserButton.Action
                    label="Admin"
                    labelIcon={<User size={20} />}
                    onClick={() => router.push("/admin")}
                  />
                </UserButton.MenuItems>
              )}
            </UserButton>
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
