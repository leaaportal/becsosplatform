import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6 py-16">
      <div className="becs-card p-8 max-w-md text-center">
        <div className="becs-section-title">BECS OS</div>
        <h1 className="mt-2 text-3xl font-semibold text-becs-navy">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          The route you requested does not exist in the BECS OS portal.
        </p>
        <Link
          to="/portal"
          className="mt-6 inline-flex items-center rounded-md bg-becs-navy text-white px-4 py-2 text-sm hover:bg-becs-purple"
        >
          Return to portal
        </Link>
      </div>
    </div>
  );
}
