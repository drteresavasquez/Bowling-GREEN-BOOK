import "./globals.css";
import Navigation from "@/components/Navigation";

export const metadata = {
  title: "Bowling GREEN Book",
  description: "Find your next adventure in Bowling Green!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-full">
        <Navigation />
        <main className="-mt-20">
          <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6 text-black">{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
