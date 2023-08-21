"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [location, setLocation] = useState("");


  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )


  return (
    <div className="text-left text-lg py-3 m-auto flex md:flex-row flex-col justify-center">
      <input
        className="rounded mb-3 md:mb-0 md:mr-3 p-2 md:w-[450px]"
        type="text"
        placeholder="State, city or town"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button
        className="rounded bg-red-600 px-9 py-2 text-white"
        onClick={() => {
          if (location === "") return;
          // router.push(`/search?city=${location}`);
          router.push("/search" + "?" + createQueryString("city", location));
          setLocation("");
        }}
      >
        Let's go
      </button>
    </div>
  );
}
