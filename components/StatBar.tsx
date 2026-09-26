export default function StatBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          {label.replace("-", " ")}
        </span>
        <span className="text-sm font-bold text-gray-900">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-red-500 transition-all duration-500"
          style={{ width: `${Math.min(value / 2.55, 100)}%` }}
        />
      </div>
    </div>
  );
}
