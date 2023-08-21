export function Title({ title }: { title: string }) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-primary-800">{title}</h1>
    </div>
  );
}
