import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Novacart",
  description:
    "Find answers to common questions about Novacart orders, payments, accounts, shipping, products, and online shopping.",
  keywords: [
    "Novacart FAQ",
    "frequently asked questions",
    "e-commerce help",
    "shopping questions",
    "orders",
    "payments",
    "shipping",
  ],
};

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Browse the available products, add the items you want to your cart, provide your shipping information, and continue to the payment step.",
  },
  {
    question: "Can I update my shipping information?",
    answer:
      "Yes. You can review and update your shipping information before continuing to the payment step.",
  },
  {
    question: "What payment methods are available?",
    answer:
      "Available payment methods are displayed during checkout. Payments are processed securely through the supported payment provider.",
  },
  {
    question: "How can I view my orders?",
    answer:
      "After signing in to your account, you can access your order history from your profile or orders section.",
  },
  {
    question: "Can I cancel an order?",
    answer:
      "Order cancellation depends on the current status of the order. Orders that have already been processed or shipped may not be eligible for cancellation.",
  },
  {
    question: "Is my payment information secure?",
    answer:
      "Payment transactions are handled through secure payment services. Novacart does not directly store your complete card information.",
  },
  {
    question: "Do I need an account to shop?",
    answer:
      "Some features may require an account so that Novacart can securely manage your cart, orders, and customer information.",
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-[#3d593f]">
            Help Center
          </span>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Frequently Asked Questions
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-zinc-500">
            Find answers to the most common questions about shopping, payments,
            accounts, and orders on Novacart.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-2xl border border-zinc-200 bg-white px-6 py-5 shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-zinc-900">
                {faq.question}

                <span className="text-xl font-light text-[#3d593f] transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>

              <p className="mt-4 border-t border-zinc-100 pt-4 text-sm leading-7 text-zinc-600">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
