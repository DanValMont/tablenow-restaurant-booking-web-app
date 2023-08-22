import Header from "./components/Header";

export default function Loading() {
  return (
    <main>
      <Header />
      <div className="flex py-4 m-auto md:w-2/3 w-full justify-between flex-col md:flex-row items-start">
        <div className="md:w-5/6 w-full">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num, id) => (
          <div
            key={id}
            className="animate-pulse bg-slate-200 border-b flex flex-col md:flex-row pb-5 ml-4 mr-4 md:mr-0 mt-4 md:mt-0 mb-4"
          >
            <div className="pl-5">
            <div className="md:w-44 md:h-36 md:pr-5 w-full h-36  rounded"></div>
            <div className="mb-9 ml-4"></div>
            </div>
          </div>
          
        ))}
        </div>
      </div>
    </main>
  );
}