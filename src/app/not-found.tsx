import H1 from "@/components/ui/h1";

export default function NotFound() {
  return (
    <main className="m-auto my-48 max-w-5xl space-y-5 px-3 text-center">
      <H1 className="text-red-500">404 Not Found!</H1>
      <p>Sorry, The Page You Are Looking For Does Not Exist.</p>
    </main>
  );
}
