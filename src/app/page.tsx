import IndexPage from "./tasks/page";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div>
      <IndexPage searchParams={searchParams} />
    </div>
  );
}
