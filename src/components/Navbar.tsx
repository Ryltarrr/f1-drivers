import Link from "next/link";
import { useRouter } from "next/router";

const links = [
  { href: "/vote", label: "Vote" },
  { href: "/results", label: "Results" },
];

export default function Navbar() {
  const router = useRouter();
  return (
    <nav className="fixed w-screen">
      <div className="flex space-x-4 justify-center">
        {links.map((link) => (
          <Link href={link.href} key={link.href}>
            <a
              className={
                router.route === link.href
                  ? "text-2xl font-bold hover:text-red-600 text-red-600"
                  : "text-2xl font-bold hover:text-red-600"
              }
            >
              {link.label}
            </a>
          </Link>
        ))}
      </div>
    </nav>
  );
}
