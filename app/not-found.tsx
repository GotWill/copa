import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-b from-green-700 to-green-900 px-4 text-center text-white">
      <div className="text-7xl">⚽</div>

      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Cartão Vermelho!</h1>
        <h2 className="text-xl font-semibold text-green-200">
          Essa página foi expulsa de campo
        </h2>
        <p className="max-w-md text-green-100">
          A página que você está procurando não existe ou já saiu da competição.
          Que tal voltar pro seu bolão?
        </p>
      </div>

      <Link
        href="/dashboard"
        className="rounded-full bg-yellow-400 px-6 py-3 font-semibold text-green-900 transition hover:bg-yellow-300"
        prefetch
      >
        Voltar para o Dashboard
      </Link>
    </div>
  );
}
