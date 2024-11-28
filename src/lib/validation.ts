import { z } from "zod";
import { jobTypes, locationTypes } from "./job-types";

const applicationSchema = z
  .object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl: z.string().max(100).url().optional().or(z.literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "Email or URL is required.",
    path: ["applicationEmail"],
  });

const locationSchema = z
  .object({
    locationType: z
      .string()
      .min(1, "Location Type is Required")
      .refine(
        (value) => locationTypes.includes(value),
        "Invalid Location type."
      ),
    location: z.string().max(100).optional(),
  })
  .refine(
    (data) =>
      data.locationType === "Remote" ||
      (data.locationType !== "Remote" && data.location),
    {
      message: "Location is required for on-site jobs",
      path: ["location"],
    }
  );

export const createJobSchema = z
  .object({
    title: z.string().min(1, "Title is Required").max(100),
    type: z
      .string()
      .min(1, "Type is Required")
      .refine((value) => jobTypes.includes(value), "Invalid job type"),
    companyName: z.string().min(1, "Company name is Required"),
    companylogo: z
      .custom<File | undefined>()
      .refine((file) => {
        return (
          !file || (file instanceof File && file.type.startsWith("image/"))
        );
      }, "Must be an Image file.")
      .refine((file) => {
        return !file || file.size < 1024 * 1024 * 2;
      }, "File must be less than 2MB."),
    description: z.string().max(5000).optional(),
    salary: z
      .string()
      .min(1, "Salary is Required")
      .regex(/^\d+$/, "Must be a number")
      .max(9, "Number can't be longer than 9 digits."),
  })
  .and(applicationSchema)
  .and(locationSchema);

export type CreateJobValues = z.infer<typeof createJobSchema>;

export const jobFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

export type JobFilterValues = z.infer<typeof jobFilterSchema>;
