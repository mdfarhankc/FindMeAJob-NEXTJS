import NewJobForm from "@/components/new-job-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post a new job",
};

export default function NewJobPage() {
  return <NewJobForm />;
}
