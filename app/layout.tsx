import AuthContext from "@/context/AuthContext";
import ReviewContext from "@/context/ReviewContext";
import BookedContext from "@/context/BookedContext";
import NavBar from "./components/NavBar";
import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";

export const metadata = {
  title: "tablenow",
  description:
    "Make online reservations and read restaurant reviews from diners. Tablenow is a real-time online reservation network for fine restaurants.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    other: [
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        url: "/apple-touch-icon.png",
      },
    ],
  },
  // themeColor: "#FFFFFF",
  manifest: "site.webmanifest",
};

export const viewport = {
  width: 1,
  themeColor: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="text-black">
        <main className="bg-gray-100 min-h-screen w-screen">
          <AuthContext>
            <ReviewContext>
              <BookedContext>
                <main className="max-w-screen-2xl m-auto bg-white">
                  <NavBar />
                  {children}
                </main>
              </BookedContext>
            </ReviewContext>
          </AuthContext>
        </main>
      </body>
    </html>
  );
}
