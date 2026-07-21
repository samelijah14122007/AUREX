type UploadCardProps = {
  name: string;
  status: string;
};

function UploadCard({
  name,
  status,
}: UploadCardProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div>

        <h3 className="font-semibold text-slate-900">
          {name}
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          {status}
        </p>

      </div>

      <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
        Completed
      </span>

    </div>
  );
}

export default UploadCard;