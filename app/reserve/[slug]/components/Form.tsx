"use client";

import useReservation from "@/hooks/useReservation";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

export default function Form({
  slug,
  date,
  partySize,
}: {
  slug: string;
  date: string;
  partySize: string;
}) {
  const [inputs, setInputs] = useState({
    bookerFirstName: "",
    bookerLastName: "",
    bookerPhone: "",
    bookerEmail: "",
    bookerOccasion: "",
    bookerRequest: "",
  });

  const [day, time] = date.split("T");

  const [disabled, setDisabled] = useState(true);
  const [didBook, setDidBook] = useState(false);
  const { loading, error, createReservation } = useReservation();

  useEffect(() => {
    if (
      inputs.bookerFirstName &&
      inputs.bookerLastName &&
      inputs.bookerPhone &&
      inputs.bookerEmail
    ) {
      return setDisabled(false);
    }
    return setDisabled(true);
  }, [inputs]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = async () => {
    const booking = await createReservation({
      slug,
      partySize,
      time,
      day,
      bookerFirstName: inputs.bookerFirstName,
      bookerLastName: inputs.bookerLastName,
      bookerPhone: inputs.bookerPhone,
      bookerEmail: inputs.bookerEmail,
      bookerOccasion: inputs.bookerOccasion,
      bookerRequest: inputs.bookerRequest,
      setDidBook,
    });
  };

  return (
    <div className="mt-10 flex flex-col w-full lg:flex-row lg:flex-wrap lg:justify-between lg:w-[660px]">
      {didBook ? (
        <div className="text-lg font-bold hover:italic">
          <h1>You are all booked up</h1>
          <p className="text-red-600">Enjoy your reservation</p>
        </div>
      ) : (
        <>
          <input
            type="text"
            className="border rounded p-3 w-100 lg:w-80 mb-4"
            placeholder="First name"
            value={inputs.bookerFirstName}
            name="bookerFirstName"
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-3 w-100 lg:w-80 mb-4"
            placeholder="Last name"
            value={inputs.bookerLastName}
            name="bookerLastName"
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-3 w-100 lg:w-80 mb-4"
            placeholder="Phone number"
            value={inputs.bookerPhone}
            name="bookerPhone"
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-3 w-100 lg:w-80 mb-4"
            placeholder="Email"
            value={inputs.bookerEmail}
            name="bookerEmail"
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-3 w-100 lg:w-80 mb-4"
            placeholder="Occasion (optional)"
            value={inputs.bookerOccasion}
            name="bookerOccasion"
            onChange={handleChangeInput}
          />
          <input
            type="text"
            className="border rounded p-3 w-100 lg:w-80 mb-4"
            placeholder="Requests (optional)"
            value={inputs.bookerRequest}
            name="bookerRequest"
            onChange={handleChangeInput}
          />
          <button
            disabled={disabled || loading}
            className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
            onClick={handleClick}
          >
            {loading ? (
              <CircularProgress color="inherit" />
            ) : (
              "Complete reservation"
            )}
          </button>
          <p className="mt-4 text-sm">
            By clicking “Complete reservation” you agree to the Tablenow Terms
            of Use and Privacy Policy. Standard text message rates may apply.
            You may opt out of receiving text messages at any time.
          </p>
        </>
      )}
    </div>
  );
}
