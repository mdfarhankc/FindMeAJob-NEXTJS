import JobDetails from "@/components/job-details";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import AdminSideBar from "../../_components/admin-sidebar";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params: { slug } }: PostPageProps) {
  const job = await prisma.job.findUnique({
    where: { slug },
  });

  if (!job) notFound();

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobDetails job={job} />
      <AdminSideBar job={job} />
    </main>
  );
}
