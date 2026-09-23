import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Novacart",
  description:
    "Learn how Novacart collects, uses, protects, and manages customer information when using our e-commerce platform.",
  keywords: [
    "Novacart privacy",
    "privacy policy",
    "customer data",
    "data protection",
    "e-commerce privacy",
    "online shopping privacy",
  ],
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm sm:p-12">
          <h1 className="text-3xl font-bold text-zinc-900">Privacy Policy</h1>

          <p className="mt-3 text-sm text-zinc-500">
            Last updated: September 2026
          </p>

          <p className="mt-7 text-sm leading-7 text-zinc-600">
            At Novacart, we respect your privacy and are committed to protecting
            the personal information you provide while using our platform.
          </p>

          <div className="mt-10 space-y-8 text-sm leading-7 text-zinc-600">
            <section>
              <h2 className="text-lg font-semibold text-zinc-900">
                Information We Collect
              </h2>

              <p className="mt-2">
                We may collect information such as your name, email address,
                phone number, shipping address, account information, and order
                details.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-zinc-900">
                How We Use Your Information
              </h2>

              <p className="mt-2">
                Your information may be used to manage your account, process
                orders, provide customer support, improve our services, and
                communicate important information related to your purchases.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-zinc-900">
                Payment Information
              </h2>

              <p className="mt-2">
                Payments may be processed through third-party payment providers.
                Novacart does not store complete payment card details directly
                on the platform.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-zinc-900">
                Data Security
              </h2>

              <p className="mt-2">
                We take reasonable technical and organizational measures to
                protect personal information from unauthorized access, misuse,
                or disclosure.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-zinc-900">Cookies</h2>

              <p className="mt-2">
                Novacart may use cookies and similar technologies to improve the
                user experience, maintain sessions, and understand how the
                platform is used.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-zinc-900">
                Your Rights
              </h2>

              <p className="mt-2">
                Depending on applicable law, you may have the right to request
                access to, correction of, or deletion of certain personal
                information.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-zinc-900">
                Changes to This Policy
              </h2>

              <p className="mt-2">
                We may update this Privacy Policy periodically. Any changes will
                be reflected on this page.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
