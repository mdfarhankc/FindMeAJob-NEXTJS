import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | FindMeAJob",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
