import Link from "next/link";
import React from "react";

const Topbar = () => {
  return (
    <div className="bg-secondary py-1">
      <div className="container">
        <ul className="space-x-6 text-end text-white">
          <li className="inline-block">
            <Link href="/" className="text-xs font-semibold uppercase">
              Become a seller
            </Link>
          </li>
          <li className="inline-block">
            <Link href="/" className="text-xs font-semibold uppercase">
              Help and support
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Topbar;
