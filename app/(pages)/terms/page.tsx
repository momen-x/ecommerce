import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Novacart",
  description:
    "Read the terms and conditions governing the use of Novacart, including orders, payments, accounts, and platform usage.",
  keywords: [
    "Novacart terms",
    "terms and conditions",
    "e-commerce terms",
    "online shopping terms",
    "store policy",
  ],
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm sm:p-12">
          <h1 className="text-3xl font-bold text-zinc-900">
            Terms & Conditions
          </h1>

          <p className="mt-3 text-sm text-zinc-500">
            Last updated: September 2026
          </p>

          <div className="mt-10 space-y-8 text-sm leading-7 text-zinc-600">
            <section>
              <h2 className="text-lg font-semibold text-zinc-900">
                1. Acceptance of Terms
              </h2>

              <p className="mt-2">
                By accessing or using Novacart, you agree to comply with these
                Terms and Conditions. If you do not agree with these terms,
                please do not use the platform.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-zinc-900">
                2. User Accounts
              </h2>

              <p className="mt-2">
                Users are responsible for maintaining the confidentiality of
                their account information and for all activities performed
                through their account.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-zinc-900">3. Orders</h2>

              <p className="mt-2">
                Orders are subject to product availability and confirmation.
                Novacart reserves the right to cancel or reject an order when
                necessary.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-zinc-900">
                4. Payments
              </h2>

              <p className="mt-2">
                Payments must be completed using the available payment methods.
                Users are responsible for providing accurate billing and payment
                information.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-zinc-900">
                5. Product Information
              </h2>

              <p className="mt-2">
                We aim to provide accurate product descriptions, images, and
                pricing. However, minor errors or variations may occasionally
                occur.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-zinc-900">
                6. Prohibited Activities
              </h2>

              <p className="mt-2">
                Users may not misuse the platform, attempt unauthorized access,
                interfere with its operation, or use Novacart for unlawful
                activities.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-zinc-900">
                7. Changes to These Terms
              </h2>

              <p className="mt-2">
                These terms may be updated from time to time. Continued use of
                Novacart after changes are published means you accept the
                updated terms.
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
