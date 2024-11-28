import { formatMoney, relativeDate } from "@/lib/utils";
import { Job } from "@prisma/client";
import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Badge } from "./ui/badge";

const COMPANY_LOGO_PLACEHOLDER = "/company-logo-placeholder.png";

interface JobListItemProps {
  job: Job;
}

const JobListItem = ({ job }: JobListItemProps) => {
  return (
    <article className="flex gap-3 rounded-lg border p-5 hover:bg-muted/70">
      <Image
        src={job.companyLogoUrl || COMPANY_LOGO_PLACEHOLDER}
        alt={`${job.companyName} logo`}
        width={100}
        height={100}
        className="self-center rounded-lg"
      />
      <div className="flex-grow space-y-3">
        <div>
          <h2 className="text-xl font-medium">{job.title}</h2>
          <p className="text-muted-foreground">{job.companyName}</p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5 sm:hidden">
            <Briefcase size={16} className="shrink-0" />
            {job.type}
          </p>
          <p className="flex items-center gap-1.5">
            <MapPin size={16} className="shrink-0" />
            {job.locationType}
          </p>
          <p className="flex items-center gap-1.5">
            <Globe2 size={16} className="shrink-0" />
            {job.location || "Worldwide"}
          </p>
          <p className="flex items-center gap-1.5">
            <Banknote size={16} className="shrink-0" />
            {formatMoney(job.salary)}
          </p>
          <p className="flex items-center gap-1.5 sm:hidden">
            <Clock size={16} className="shrink-0" />
            {relativeDate(job.createdAt)}
          </p>
        </div>
      </div>
      <div className="hidden shrink-0 flex-col items-end justify-between sm:flex">
        <Badge variant="outline">{job.type}</Badge>
        <Badge variant="outline" className="flex items-center gap-1.5">
          <Clock size={16} className="shrink-0" />
          {relativeDate(job.createdAt)}
        </Badge>
      </div>
    </article>
  );
};

export default JobListItem;
