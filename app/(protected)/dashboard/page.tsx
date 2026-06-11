import { CardPool } from "@/app/components/card-pool";
import Link from "next/link";
import PoolHandler from "./components/pool-handler";

const Home = () => {  return (
    <div className="max-w-[1144px] w-full mx-auto pt-6">
      <PoolHandler />
      <div className="flex flex-col gap-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <Link key={index} href="/bolao/1">
            <CardPool
              title="Bolão do Rodrigão"
              createdBy="Rodrigo G."
              participants={[
                { name: "Ana", avatarUrl: "https://..." },
                { name: "João", avatarUrl: "https://..." },
                { name: "Pedro", avatarUrl: "https://..." },
                { name: "Maria", avatarUrl: "https://..." },
              ]}
              extraCount={38}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
