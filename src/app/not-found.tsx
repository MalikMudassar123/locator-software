import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="text-center">
        <h1 className="mb-4 text-9xl font-bold text-slate-900 dark:text-slate-100">
          404
        </h1>
        <h2 className="mb-4 text-3xl font-semibold text-slate-700 dark:text-slate-300">
          Page Not Found
        </h2>
        <p className="mb-8 text-lg text-slate-600 dark:text-slate-400">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
