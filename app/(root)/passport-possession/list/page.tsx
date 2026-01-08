import { fetchPassportPossessions } from "@/lib/api/passport-possession";
import PassportPossessionsTableClient from "./passport-possession-table-client";


interface PageProps {
  searchParams: {
    page?: string;
    limit?: string;
    from?: string;
    to?: string;
    role?: string;
    search?: string;
  };
}

export default async function PassportPossessionsPage({ searchParams }: PageProps) {
  const searchParam = await searchParams;
  const page = Number(searchParam.page ?? 1);
  const limit = Number(searchParam.limit ?? 10);

  const passportPossessions = await fetchPassportPossessions({
    page,
    limit,
    search: searchParam.search,
    from: searchParam.from,
    to: searchParam.to,
  });

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Passport Possitions</h1>

      <PassportPossessionsTableClient passportPossessionsResponse={passportPossessions} />
    </div>
  );
}
