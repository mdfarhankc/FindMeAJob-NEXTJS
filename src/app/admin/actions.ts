"use server";

import prisma from "@/lib/prisma";
import { isAdmin } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { del } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type FormState = {
  error?: string | undefined;
};

export async function approveJob(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const jobId = parseInt(formData.get("jobId") as string);

    const user = await currentUser();
    if (!user || !isAdmin(user)) {
      throw new Error("Not Authorised!");
    }

    await prisma.job.update({
      where: { id: jobId },
      data: {
        approved: true,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin");
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }
  redirect("/admin");
}

export async function deleteJob(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const jobId = parseInt(formData.get("jobId") as string);

    const user = await currentUser();
    if (!user || !isAdmin(user)) {
      throw new Error("Not Authorised!");
    }

    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (job?.companyLogoUrl) {
      await del(job.companyLogoUrl);
    }

    await prisma.job.delete({
      where: { id: jobId },
    });

    revalidatePath("/");
    revalidatePath("/admin");
  } catch (error) {
    let message = "Unexpected error";
    if (error instanceof Error) {
      message = error.message;
    }
    return { error: message };
  }

  redirect("/admin");
}
