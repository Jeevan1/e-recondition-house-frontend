import Link from "next/link";
import { MdArrowForward } from "react-icons/md";
import { PrimaryButton } from "./Button";
import Image from "next/image";

export default function PageNotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white text-gray-800">
      <div className="text-6xl font-bold text-gray-300 md:text-9xl">404</div>
      <div className="mt-4 text-xl font-bold md:text-3xl">
        Oops! Page not found
      </div>
      <div className="mt-2 text-sm  text-gray-600 sm:text-lg">
        The page you are looking for does not exist.
      </div>
      <div className="mt-8">
        <Link href="/">
          <PrimaryButton className="flex items-center">
            Go to Home
            <MdArrowForward className="ml-1" />
          </PrimaryButton>
        </Link>
      </div>
      <div className="mt-5">
        <Image
          src="/assets/not-found.png"
          alt="404 Illustration"
          width={200}
          height={200}
          className="h-[200px] w-full max-w-3xl"
        />
      </div>
    </div>
  );
}
