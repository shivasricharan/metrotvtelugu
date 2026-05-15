import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Metro TV Telugu | News, Videos, Shows & Digital Media",
  description:
    "Metro TV Telugu brings regional news, public-interest stories, shows, videos and advertiser opportunities together in a modern digital experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}