import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center gap-8 row-start-2 text-center">
        <h1 className="text-2xl font-bold">Product List</h1>
        <Link
          href="/productList"
          className="flex items-center justify-center px-6 py-3 text-xl font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-all"
        >
          Please click here to view products(Using Redux)
        </Link>
        <Link
          href="/productListWithQuery"
          className="flex items-center justify-center px-6 py-3 text-xl font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition-all"
        >
          Please click here to view products(Using transtack-query)
        </Link>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        By Divya Ninan
      </footer>
    </div>
  );
}
