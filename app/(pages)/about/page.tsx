import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Novacart",
  description:
    "Learn more about Novacart, our mission, values, and commitment to providing a smooth and reliable online shopping experience.",
  keywords: [
    "Novacart",
    "about us",
    "e-commerce",
    "online shopping",
    "shopping platform",
    "online store",
  ],
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm sm:p-12">
          <span className="text-sm font-semibold uppercase tracking-wider text-[#3d593f]">
            About Novacart
          </span>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Shopping made simple, reliable, and convenient.
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-600">
            Novacart is an e-commerce platform designed to make online shopping
            simple and convenient. Our goal is to provide customers with an easy
            way to explore products, manage their cart, and complete their
            purchases through a smooth and secure checkout experience.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-zinc-50 p-6">
              <h2 className="font-semibold text-zinc-900">Our Mission</h2>

              <p className="mt-2 text-sm leading-6 text-zinc-600">
                To create a simple, secure, and user-friendly shopping
                experience for every customer.
              </p>
            </div>

            <div className="rounded-2xl bg-zinc-50 p-6">
              <h2 className="font-semibold text-zinc-900">Our Vision</h2>

              <p className="mt-2 text-sm leading-6 text-zinc-600">
                To build a trusted digital marketplace where customers can shop
                with confidence and convenience.
              </p>
            </div>

            <div className="rounded-2xl bg-zinc-50 p-6">
              <h2 className="font-semibold text-zinc-900">Our Values</h2>

              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Simplicity, reliability, transparency, and a strong focus on
                customer experience.
              </p>
            </div>
          </div>

          <div className="mt-10 border-t border-zinc-100 pt-8">
            <h2 className="text-xl font-semibold text-zinc-900">
              Why Novacart?
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-600">
              From product discovery to secure checkout, Novacart focuses on
              providing a clean and efficient shopping journey. We continuously
              work to improve the platform and deliver a better experience for
              our customers.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
