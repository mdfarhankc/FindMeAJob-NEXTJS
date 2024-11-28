"use client";

import FormSubmitButton from "@/components/form-submit-button";
import { Job } from "@prisma/client";
import { useFormState } from "react-dom";
import { approveJob, deleteJob } from "../actions";
import { Button } from "@/components/ui/button";

interface AdminSideBarProps {
  job: Job;
}

export default function AdminSideBar({ job }: AdminSideBarProps) {
  return (
    <aside className="flex w-[200px] flex-none flex-row items-center gap-2 md:flex-col md:items-stretch">
      {job.approved ? (
        <Button disabled className="w-full bg-green-500 hover:bg-green-600">
          Approved
        </Button>
      ) : (
        <ApproveJobButton jobId={job.id} />
      )}
      <DeleteJobButton jobId={job.id} />
    </aside>
  );
}

function ApproveJobButton({ jobId }: { jobId: number }) {
  const [formState, formAction] = useFormState(approveJob, {
    error: undefined,
  });

  return (
    <form action={formAction} className="space-y-1">
      <input hidden name="jobId" value={jobId} />
      <FormSubmitButton className="w-full bg-green-500 hover:bg-green-600">
        Approve
      </FormSubmitButton>
      {formState?.error && (
        <p className="text-sm text-red-500">{formState.error}</p>
      )}
    </form>
  );
}

function DeleteJobButton({ jobId }: { jobId: number }) {
  const [formState, formAction] = useFormState(deleteJob, { error: undefined });

  return (
    <form action={formAction} className="space-y-1">
      <input hidden name="jobId" value={jobId} />
      <FormSubmitButton className="w-full bg-red-500 hover:bg-red-600">
        Delete
      </FormSubmitButton>
      {formState?.error && (
        <p className="text-sm text-red-500">{formState.error}</p>
      )}
    </form>
  );
}
