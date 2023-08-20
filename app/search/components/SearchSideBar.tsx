"use client";

import { Cuisine, Location, PRICE } from "@prisma/client";
import Link from "next/link";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MenuItem, Stack, Button, Menu } from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useState } from "react";

export default function SearchSideBar({
  locations,
  cuisines,
  searchParams,
}: {
  locations: Location[];
  cuisines: Cuisine[];
  searchParams: { city?: string; cuisine?: string; price?: PRICE };
}) {
  const matches = useMediaQuery("(max-width:768px)");
  const xsmatches = useMediaQuery("(max-width:375px)");

  const [anchorElRegion, setAnchorElRegion] = useState<null | HTMLElement>(
    null
  );
  const openRegion = Boolean(anchorElRegion);
  const handleClickRegion = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElRegion(event.currentTarget);
  };
  const handleCloseRegion = () => {
    setAnchorElRegion(null);
  };

  const [anchorElCuisine, setAnchorElCuisine] = useState<null | HTMLElement>(
    null
  );
  const openCuisine = Boolean(anchorElCuisine);
  const handleClickCuisine = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElCuisine(event.currentTarget);
  };
  const handleCloseCuisine = () => {
    setAnchorElCuisine(null);
  };

  const [anchorElPrice, setAnchorElPrice] = useState<null | HTMLElement>(null);
  const openPrice = Boolean(anchorElPrice);
  const handleClickPrice = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElPrice(event.currentTarget);
  };
  const handleClosePrice = () => {
    setAnchorElPrice(null);
  };

  const prices = [
    {
      id: 1,
      price: PRICE.CHEAP,
      label: "$",
      className: "border w-full text-reg text-center font-light rounded-l p-2",
    },
    {
      id: 2,
      price: PRICE.REGULAR,
      label: "$$",
      className: "border w-full text-reg text-center font-light p-2",
    },
    {
      id: 3,
      price: PRICE.EXPENSIVE,
      label: "$$$",
      className: "border w-full text-reg text-center font-light rounded-r p-2",
    },
  ];

  return matches ? (
    <Stack
      className="m-auto justify-center mb-4"
      direction="row"
      spacing={{ xs: 1, sm: 2 }}
    >
      <Button
        size="small"
        id="basic-button-region"
        aria-controls={openRegion ? "basic-menu-region" : undefined}
        aria-haspopup="true"
        aria-expanded={openRegion ? "false" : undefined}
        onClick={handleClickRegion}
        variant="outlined"
        startIcon={xsmatches ? "" : <LocationOnIcon />}
        endIcon={openRegion ? <ExpandLess /> : <ExpandMore />}
      >
        Region
      </Button>
      <Menu
        id="basic-menu-region"
        anchorEl={anchorElRegion}
        open={openRegion}
        onClose={handleCloseRegion}
        MenuListProps={{
          "aria-labelledby": "basic-button-region",
        }}
      >
        {locations.map((location) => (
          <MenuItem
            key={location.id}
            value={location.name}
            onClick={handleCloseRegion}
          >
            <Link
              href={{
                pathname: "/search",
                query: { ...searchParams, city: location.name },
              }}
              key={location.id}
              className="font-light text-reg capitalize text-black"
            >
              {" "}
              {location.name}
            </Link>
          </MenuItem>
        ))}
      </Menu>

      <Button
        size="small"
        id="basic-button-cuisine"
        aria-controls={openCuisine ? "basic-menu-cuisine" : undefined}
        aria-haspopup="true"
        aria-expanded={openCuisine ? "false" : undefined}
        onClick={handleClickCuisine}
        variant="outlined"
        startIcon={xsmatches ? "" : <RestaurantIcon />}
        endIcon={openCuisine ? <ExpandLess /> : <ExpandMore />}
      >
        Cuisine
      </Button>
      <Menu
        id="basic-menu-cuisine"
        anchorEl={anchorElCuisine}
        open={openCuisine}
        onClose={handleCloseCuisine}
        MenuListProps={{
          "aria-labelledby": "basic-button-cuisine",
        }}
      >
        {cuisines.map((cuisine) => (
          <MenuItem
            key={cuisine.id}
            value={cuisine.name}
            onClick={handleCloseCuisine}
          >
            {" "}
            <Link
              href={{
                pathname: "/search",
                query: { ...searchParams, cuisine: cuisine.name },
              }}
              key={cuisine.id}
              className="font-light text-reg capitalize text-black"
            >
              {cuisine.name}
            </Link>
          </MenuItem>
        ))}
      </Menu>

      <Button
        size="small"
        id="basic-button-price"
        aria-controls={openPrice ? "basic-menu-price" : undefined}
        aria-haspopup="true"
        aria-expanded={openPrice ? "false" : undefined}
        onClick={handleClickPrice}
        variant="outlined"
        startIcon={xsmatches ? "" : <MonetizationOnIcon />}
        endIcon={openPrice ? <ExpandLess /> : <ExpandMore />}
      >
        Price
      </Button>
      <Menu
        id="basic-menu-price"
        anchorEl={anchorElPrice}
        open={openPrice}
        onClose={handleClosePrice}
        MenuListProps={{
          "aria-labelledby": "basic-button-price",
        }}
      >
        {prices.map(({ price, label, id }) => (
          <MenuItem key={id} value={label} onClick={handleClosePrice}>
            <Link
              key={id}
              href={{ pathname: "/search", query: { ...searchParams, price } }}
            >
              {label}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </Stack>
  ) : (
    <div className="w-1/5">
      <div className="border-b pb-4 flex flex-col">
        <h1 className="mb-2">Region</h1>
        {locations.map((location) => (
          <Link
            href={{
              pathname: "/search",
              query: { ...searchParams, city: location.name },
            }}
            key={location.id}
            className="font-light text-reg capitalize"
          >
            {location.name}
          </Link>
        ))}
      </div>
      <div className="border-b pb-4 mt-3 flex flex-col">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines.map((cuisine) => (
          <Link
            href={{
              pathname: "/search",
              query: { ...searchParams, cuisine: cuisine.name },
            }}
            key={cuisine.id}
            className="font-light text-reg capitalize"
          >
            {cuisine.name}
          </Link>
        ))}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          {prices.map(({ price, label, className, id }) => (
            <Link
              key={id}
              href={{ pathname: "/search", query: { ...searchParams, price } }}
              className={className}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
