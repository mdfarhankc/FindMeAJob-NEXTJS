import React from "react";
import JobListItem from "./joblist-item";
import prisma from "@/lib/prisma";
import { JobFilterValues } from "@/lib/validation";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import Pagination from "./pagination";

interface JobResultsProps {
  filterValues: JobFilterValues;
  page?: number;
}

const JobResults = async ({ filterValues, page = 1 }: JobResultsProps) => {
  const { q, type, location, remote } = filterValues;
  const jobsPerPage = 5;
  const skip = (page - 1) * jobsPerPage;
  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const searchFilter: Prisma.JobWhereInput = searchString
    ? {
        OR: [
          {
            title: { search: searchString },
          },
          {
            companyName: { search: searchString },
          },
          {
            type: { search: searchString },
          },
          {
            locationType: { search: searchString },
          },
          {
            location: { search: searchString },
          },
        ],
      }
    : {};

  const where: Prisma.JobWhereInput = {
    AND: [
      searchFilter,
      type ? { type } : {},
      location ? { location } : {},
      remote ? { locationType: "Remote" } : {},
      { approved: true },
    ],
  };

  const jobsPromise = prisma.job.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: jobsPerPage,
    skip,
  });

  const jobsCountPromise = prisma.job.count({ where });

  const [jobs, jobsCount] = await Promise.all([jobsPromise, jobsCountPromise]);

  return (
    <div className="flex-grow space-y-4">
      {jobs.map((job) => (
        <Link href={`/jobs/${job.slug}`} key={job.id} className="block">
          <JobListItem job={job} />
        </Link>
      ))}
      {jobs.length === 0 && (
        <p className="m-auto text-center">No Jobs Found.</p>
      )}
      {jobs.length > 0 && (
        <Pagination
          currentPage={page}
          filterValues={filterValues}
          totalPages={Math.ceil(jobsCount / jobsPerPage)}
        />
      )}
    </div>
  );
};

export default JobResults;
