"use server";

import { createSlug } from "@/lib/utils";
import { createJobSchema } from "@/lib/validation";
import { nanoid } from "nanoid";
import { put } from "@vercel/blob";
import path from "path";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createJobPosting(formData: FormData) {
  const values = Object.fromEntries(formData.entries());

  const {
    companyName,
    title,
    locationType,
    salary,
    type,
    applicationEmail,
    applicationUrl,
    companylogo,
    description,
    location,
  } = createJobSchema.parse(values);
  const slug = `${createSlug(title)}-${nanoid(10)}`;

  let companyLogoUrl: string | undefined = undefined;
  if (companylogo) {
    const blob = await put(
      `company_logos/${slug}${path.extname(companylogo.name)}`,
      companylogo,
      {
        access: "public",
        addRandomSuffix: false,
      }
    );
    companyLogoUrl = blob.url;
  }

  await prisma.job.create({
    data: {
      slug,
      companyName: companyName.trim(),
      locationType,
      salary: parseInt(salary),
      title: title.trim(),
      companyLogoUrl,
      type,
      location,
      applicationEmail: applicationEmail?.trim(),
      applicationUrl: applicationUrl?.trim(),
      description: description?.trim(),
    },
  });

  revalidatePath("/admin");
  redirect("/job-submitted");
}
