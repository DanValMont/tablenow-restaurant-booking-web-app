import Header from "./components/Header";

export default function Loading() {
  return (
    <main>
      <Header />
      <div className="py-3 lg:px-36 mt-10 flex flex-wrap justify-evenly">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9.1, 11, 12].map((num, id) => (
          <div
            key={id}
            className="animate-pulse bg-slate-200 w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer"
          ></div>
        ))}
      </div>
    </main>
  );
}
