"use client";

import React, { useEffect, useMemo } from "react";
import Topbar from "./Topbar";
import data from "../data.json";
import Link from "next/link";
import FormInput from "./InputField/FormInput";
import { MdClose, MdMenu } from "react-icons/md";
import useDebounce from "@/hooks/useDebounce";

const Header = () => {
  const [searchedItems, setSearchedItems] = React.useState<
    (typeof data)["vehicles"]
  >([]);

  const [open, setOpen] = React.useState<boolean>(false);

  const [search, setSearch] = React.useState<string>("");

  const [debouncedSearch, loading] = useDebounce((value: string) => {
    if (value.length > 0) {
      const filteredItems = data.vehicles.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase()),
      );
      setSearchedItems(filteredItems);
    } else {
      setSearchedItems([]);
    }
  }, 300);

  const onChangeHandler = (value: string) => {
    setSearch(value);
    debouncedSearch(value);
  };

  return (
    <header className="border-b-2 border-dashed border-secondary">
      <Topbar />
      <div className="container">
        <div className="flex items-center gap-20 py-3">
          <Link href="/" className="py-2 text-3xl font-extrabold">
            LOGO
          </Link>
          <div className="flex w-full items-center gap-5">
            <div className="relative w-full md:w-[250px]">
              <FormInput
                placeholder="Search Vehicles..."
                type="text"
                name=""
                onChange={onChangeHandler} // Adjusted to handle event properly
              />
              {loading && (
                <p className="absolute left-0 top-10 w-full border bg-white p-2 pe-1 shadow-lg">
                  Loading...
                </p>
              )}
              {searchedItems.length > 0 ? (
                <ul className="scrollbar absolute left-0 top-10 max-h-[300px] w-full overflow-y-scroll border bg-white p-2 pe-1 shadow-lg">
                  {searchedItems.map((item) => (
                    <li key={item.id} className="border-b py-1 last:border-0">
                      <Link
                        href={`/vehicles/${item.id}`}
                        className="block text-sm font-semibold hover:text-primary"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                searchedItems.length === 0 &&
                search.length > 0 &&
                !loading && (
                  <p className="absolute left-0 top-10 w-full border bg-white p-2 text-sm font-semibold">
                    No vehicle found.
                  </p>
                )
              )}
            </div>
            <ul className="hidden gap-5 md:flex ">
              {data.navbar.map((item) => (
                <li
                  key={item.label}
                  className="font-semibold first:font-bold first:text-primary"
                >
                  <Link
                    href={item.url}
                    className="text-sm uppercase text-inherit hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <MdMenu
              className="cursor-pointer text-3xl md:hidden"
              onClick={() => setOpen(!open)}
            />
          </div>
        </div>
        {open && (
          <div className="fixed bottom-0 left-0 right-0 top-0 z-50 bg-primary px-4 py-10 md:hidden">
            <Link href="/" className="py-2 text-5xl font-extrabold text-white">
              LOGO
            </Link>
            <ul className="mt-5 flex h-full flex-col justify-center gap-5">
              {data.navbar.map((item) => (
                <li
                  key={item.label}
                  className="font-semibold text-white first:font-bold first:text-gray-800"
                >
                  <Link
                    href={item.url}
                    className="text-lg uppercase text-inherit hover:text-gray-800"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <MdClose
              className="absolute right-4 top-4 cursor-pointer text-3xl text-white md:hidden"
              onClick={() => setOpen(!open)}
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
