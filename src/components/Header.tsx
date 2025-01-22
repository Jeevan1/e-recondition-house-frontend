"use client";

import React, { useEffect } from "react";
import Topbar from "./Topbar";
import data from "@/data.json";
import Link from "next/link";
import FormInput from "./InputField/FormInput";
import { MdClose, MdMenu } from "react-icons/md";
import useDebounce from "@/hooks/useDebounce";
import { useAuth } from "@/context/AuthContext";
import { fetchData } from "@/utils/api-sercice";
import { Product } from "@/model/type";

const Header = () => {
  const [searchedItems, setSearchedItems] = React.useState<Product[]>([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const [searchOpen, setSearchOpen] = React.useState<boolean>(false);

  const [search, setSearch] = React.useState<string>("");

  const [headerFixed, setHeaderFixed] = React.useState<boolean>(false);

  const modalRef = React.useRef<HTMLDivElement>(null);

  const { logout, isAuthenticated } = useAuth();

  const [debouncedSearch, loading] = useDebounce((value: string) => {
    const fetchVehicles = async (value: string) => {
      const { data } = await fetchData(`/vehicles/?search=${value}`, {});
      if (!data) setSearchedItems([]);
      setSearchedItems(data);
    };
    if (value.length > 0) {
      setSearchOpen(true);
      fetchVehicles(value);
    } else {
      setSearchOpen(false);
      setSearchedItems([]);
    }
  }, 300);

  const onChangeHandler = (value: string) => {
    setSearch(value);
    debouncedSearch(value);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setHeaderFixed(true);
      } else {
        setHeaderFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={`min-h-24 border-b-2 border-dashed border-secondary`}>
      <Topbar />
      <div
        className={`container ${headerFixed ? "fixed top-0 z-[100] w-full bg-white shadow-md transition-all duration-200" : ""}`}
      >
        <div className="flex items-center gap-20 py-3">
          <Link href="/" className="py-2 text-3xl font-extrabold">
            LOGO
          </Link>
          <div className="flex w-full items-center gap-5">
            <div className="relative w-full md:w-[250px]" ref={modalRef}>
              <FormInput
                placeholder="Search Vehicles..."
                type="text"
                name=""
                onChange={(e) => onChangeHandler(e as string)}
              />
              {loading && (
                <p className="absolute left-0 top-10 z-10 flex h-[100px] w-full items-center justify-center rounded-md border bg-white p-2 pe-1 shadow-lg">
                  Loading...
                </p>
              )}
              {searchOpen && searchedItems?.length > 0 ? (
                <ul className="scrollbar absolute left-0 top-11 z-10 max-h-[300px] w-full overflow-y-scroll rounded-md border bg-white p-2 pe-1 shadow-lg">
                  {searchedItems?.map((item) => (
                    <li key={item.idx} className="border-b py-1 last:border-0">
                      <Link
                        href={`/vehicle/${item.idx}`}
                        className="block text-sm font-semibold hover:text-primary"
                        onClick={() => setSearchOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                searchedItems?.length === 0 &&
                search.length > 0 &&
                !loading && (
                  <p className="absolute left-0 top-11 z-10 flex h-[50px] w-full items-center justify-center rounded-md border bg-white p-2 text-sm font-semibold shadow-md">
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
              {isAuthenticated ? (
                <li className="font-semibold first:font-bold first:text-primary">
                  <span
                    className="cursor-pointer text-sm uppercase text-inherit hover:text-primary"
                    onClick={logout}
                  >
                    Log out
                  </span>
                </li>
              ) : (
                <li className="font-semibold first:font-bold first:text-primary">
                  <Link
                    href={"/login"}
                    className="text-sm uppercase text-inherit hover:text-primary"
                  >
                    Log in
                  </Link>
                </li>
              )}
            </ul>
            <MdMenu
              className="cursor-pointer text-3xl md:hidden"
              onClick={() => setOpen(!open)}
            />
          </div>
        </div>
        <div
          className={`fixed bottom-0 left-0 right-0 top-0 z-50 bg-primary px-4 py-10 md:hidden ${open ? "translate-x-0" : " translate-x-full"} duration-300 ease-in-out`}
        >
          <div className="flex h-full flex-col justify-center px-3">
            <Link href="/" className="py-2 text-3xl font-extrabold text-white">
              LOGO
            </Link>
            <p className="mt-2 text-sm font-semibold text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
              aliquam praesentium eos, optio vero corporis voluptate aut quis
              nisi magni?
            </p>
            <ul className="mt-8 flex flex-col justify-center gap-5">
              {data.navbar.map((item) => (
                <li
                  key={item.label}
                  className="font-semibold text-white first:font-bold first:text-gray-800"
                >
                  <Link
                    href={item.url}
                    className="text-md capitalize text-inherit hover:text-gray-800"
                    onClick={() => setOpen(!open)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {isAuthenticated ? (
                <li
                  className="font-semibold text-white first:font-bold"
                  onClick={() => setOpen(!open)}
                >
                  <span
                    className="cursor-pointer text-sm uppercase text-inherit hover:text-primary"
                    onClick={logout}
                  >
                    Log out
                  </span>
                </li>
              ) : (
                <li className="font-semibold text-white first:font-bold">
                  <Link
                    href={"/login"}
                    className="text-sm uppercase text-inherit hover:text-primary"
                    onClick={() => setOpen(!open)}
                  >
                    Log in
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <MdClose
            className="absolute right-4 top-12 cursor-pointer text-3xl text-white md:hidden"
            onClick={() => setOpen(!open)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
