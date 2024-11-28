import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link
      href={"/"}
      className="text-2xl font-extrabold tracking-tighter text-primary md:text-3xl"
    >
      <span className="text-red-400">Find</span>MeAJob
    </Link>
  );
};

export default Logo;
