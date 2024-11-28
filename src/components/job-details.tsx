import { Job } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react";
import { formatMoney, relativeDate } from "@/lib/utils";
import MarkDown from "./markdown";
import BackButton from "./back-button";

const COMPANY_LOGO_PLACEHOLDER = "/company-logo-placeholder.png";

interface JobDetailsprops {
  job: Job;
}

export default function JobDetails({
  job: {
    title,
    description,
    companyName,
    applicationUrl,
    type,
    locationType,
    location,
    salary,
    companyLogoUrl,
    createdAt,
  },
}: JobDetailsprops) {
  return (
    <section className="w-full grow space-y-5">
      <div className="flex items-center gap-3">
        <Image
          src={companyLogoUrl || COMPANY_LOGO_PLACEHOLDER}
          alt={`${companyName} logo`}
          width={100}
          height={100}
          className="rounded-xl"
        />

        <div>
          <div>
            <h1 className="text-xl font-bold">{title}</h1>
            <p>
              {applicationUrl ? (
                <Link
                  href={new URL(applicationUrl).origin}
                  className="hover:underline"
                >
                  {companyName}
                </Link>
              ) : (
                <span>{companyName}</span>
              )}
            </p>
          </div>
          <div className="text-muted-foreground">
            <p className="flex items-center gap-1.5">
              <Briefcase size={16} className="shrink-0" />
              {type}
            </p>
            <p className="flex items-center gap-1.5">
              <MapPin size={16} className="shrink-0" />
              {locationType}
            </p>
            <p className="flex items-center gap-1.5">
              <Globe2 size={16} className="shrink-0" />
              {location || "Worldwide"}
            </p>
            <p className="flex items-center gap-1.5">
              <Banknote size={16} className="shrink-0" />
              {formatMoney(salary)}
            </p>
            <p className="flex items-center gap-1.5">
              <Clock size={16} className="shrink-0" />
              {relativeDate(createdAt)}
            </p>
          </div>
        </div>
        <div className="mb-auto flex md:hidden">
          <BackButton size="sm" />
        </div>
      </div>
      <div>{description && <MarkDown>{description}</MarkDown>}</div>
    </section>
  );
}
