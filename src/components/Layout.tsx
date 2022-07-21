import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark:bg-gray-800">
      <Navbar />
      <main className="pt-20 mx-auto max-w-5xl">{children}</main>
      <Footer />
    </div>
  );
}
