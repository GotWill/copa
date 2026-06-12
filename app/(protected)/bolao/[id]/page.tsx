import { getPool } from "@/app/_data-access/bolao/get-pool";
import { PoolHeader } from "./components/pool-header";
import { redirect } from "next/navigation";
import { ContentPoolPage } from "./components/content-pool-page";

export default async function Page(props: PageProps<"/bolao/[id]">) {
  const { id } = await props.params;
  const pool = await getPool(id);

  if (!pool) {
    redirect("/dashboard");
  }

  return (
    <main>
      <div className="mx-auto w-full max-w-5xl px-6 py-8 lg:py-12">
        <PoolHeader pool={pool} />
        <ContentPoolPage />
      </div>
    </main>
  );
}
