"use client";

import React, { createContext, useState } from "react";

interface State {
  booked: boolean;
}

interface BookedState extends State {
  setBookedState: React.Dispatch<React.SetStateAction<State>>;
}

export const IsBookedContext = createContext<BookedState>({
  booked: false,
  setBookedState: () => {},
});

export default function BookedContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bookedState, setBookedState] = useState<State>({
    booked: false,
  });

  return (
    <IsBookedContext.Provider value={{ ...bookedState, setBookedState }}>
      {children}
    </IsBookedContext.Provider>
  );
}
