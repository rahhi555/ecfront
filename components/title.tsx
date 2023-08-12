export function Title({ title }: { title: string }) {
  return (
    <div className="mb-8">
      <h1 className="text-xl font-bold text-primary-800">{title}</h1>
    </div>
  );
}
