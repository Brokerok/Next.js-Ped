import Link from "next/link";
import { Button } from "@heroui/react";

export default function About() {
  return (
    <main className="p-6 flex flex-col gap-6 max-w-2xl">
      <h1 className="text-3xl font-bold">About</h1>

      <p className="text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris.
      </p>

      <p className="text-gray-600">
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>

      <p className="text-gray-600">
        Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam
        varius, turpis molestie dictum semper, metus arcu viverra eros, eu
        efficitur nunc erat vel nisi.
      </p>

      <Link href="/">
        <Button variant="secondary">← Back to Home</Button>
      </Link>
    </main>
  );
}
