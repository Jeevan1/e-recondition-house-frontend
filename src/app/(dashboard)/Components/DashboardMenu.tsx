"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import { MdAssignmentAdd, MdOutlineLogout } from "react-icons/md";
import { RiAlignItemLeftLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import Image from "next/image";
import { useData } from "@/context/DataContext";
import { useAuth } from "@/context/AuthContext";

const DashboardMenu = () => {
  const pathname = usePathname();
  const { logout } = useAuth();

  const dashboardLinks = [
    { title: "Dashboard", link: "/dashboard", icon: RxDashboard },
    {
      title: "Our Vehicles",
      link: "/dashboard/vehicles",
      icon: RiAlignItemLeftLine,
    },
    {
      title: "Add Vehicle",
      link: "/dashboard/vehicles/add",
      icon: MdAssignmentAdd,
    },
    { title: "Profile", link: "/dashboard/profile", icon: CgProfile },
  ];

  const activeLink = (link: string) => {
    return pathname === link;
  };

  const { data } = useData();

  return (
    <div>
      <div className="p-4">
        {data?.logo?.startsWith("http") || data?.logo?.startsWith("https") ? (
          <Image
            src={`${data?.logo}` || ""}
            alt={data?.name || "logo"}
            width={200}
            height={200}
            className="h-32 w-full rounded-md bg-white object-cover"
          />
        ) : (
          <Image
            src={`http://localhost:2000/${data?.logo}` || ""}
            alt={data?.name || "logo"}
            width={200}
            height={200}
            className="h-32 w-full rounded-md bg-white object-cover"
          />
        )}
        <p className="mt-2 text-xl font-bold text-white">{data?.name}</p>
      </div>
      <ul className="w-full space-y-1 p-2 pb-4">
        {dashboardLinks.map((link) => (
          <li
            key={link.link}
            className={`flex w-full cursor-pointer items-center rounded-md px-2 ${activeLink(link.link) ? "bg-white text-primary" : "text-white"} hover:bg-white hover:text-primary`}
          >
            <link.icon size={20} className="mr-2 inline-block" />
            <Link
              href={link.link}
              className="inline-block w-full py-2 text-sm font-semibold"
            >
              {link.title}
            </Link>
          </li>
        ))}
        <li className="py-1"></li>
        <li className="border-t-2 border-dashed py-1"></li>
        <li className="flex w-full items-center rounded-md px-2 text-white first:bg-white  first:text-primary hover:bg-white hover:text-primary">
          <MdOutlineLogout size={20} className="mr-2 inline-block" />
          <Link
            href="/"
            className="inline-block w-full py-2 text-sm font-semibold"
            onClick={logout}
          >
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DashboardMenu;
