import type { Metadata } from "next";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";

import {
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  GitHubIcon,
  LinkedInIcon,
  WhatsAppIcon,
} from "@/components/icons/social-icons";

export const metadata: Metadata = {
  title: "Contact | LMS Platform",
  description:
    "Contact the LMS platform developer for questions, technical feedback, or collaboration.",
};

interface ContactMethod {
  title: string;
  value: string;
  description: string;
  href: string;
  external?: boolean;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

const contactMethods: ContactMethod[] = [
  {
    title: "Email",
    value: "moamenalswafiri@gmail.com",
    description: "Questions, feedback, support, or project discussions.",
    href: "mailto:moamenalswafiri@gmail.com",
    icon: Mail,
  },
  {
    title: "WhatsApp",
    value: "Chat on WhatsApp",
    description: "Quick questions, direct messages, or voice notes.",
    href: "https://wa.me/970598817322",
    external: true,
    icon: WhatsAppIcon,
  },
  {
    title: "GitHub",
    value: "View development work",
    description: "Explore source code, projects, and technical experiments.",
    href: "https://github.com/momen-x",
    external: true,
    icon: GitHubIcon,
  },
  {
    title: "LinkedIn",
    value: "Connect professionally",
    description: "Professional networking, opportunities, and collaboration.",
    href: "https://www.linkedin.com/in/mo%E2%80%99men-alswafiri-8b6491346",
    external: true,
    icon: LinkedInIcon,
  },
];

export default function ContactPage() {
  return (
    <main className="bg-background text-foreground">
      {/* Hero */}
      <section className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-20">
          <div className="max-w-2xl">
            <Badge variant="outline" className="gap-2">
              <MessageCircle className="size-3.5" />
              Contact
            </Badge>

            <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
              Let&apos;s start a conversation.
            </h1>

            <p className="mt-5 max-w-xl leading-7 text-muted-foreground">
              Have a question about the application, found a technical issue, or
              want to discuss a project? Reach out using any of the options
              below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact content */}
      <section className="mx-auto max-w-6xl px-4 py-14 md:px-8 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          {/* Main methods */}
          <div>
            <div>
              <p className="text-sm font-medium text-primary">
                Contact information
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight">
                Choose the best way to reach me.
              </h2>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {contactMethods.map((method) => {
                const Icon = method.icon;

                return (
                  <Link
                    key={method.title}
                    href={method.href}
                    target={method.external ? "_blank" : undefined}
                    rel={method.external ? "noopener noreferrer" : undefined}
                    className={cn(
                      "group rounded-2xl border bg-card p-5 transition-all",
                      "hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md",
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-muted-foreground">
                          {method.title}
                        </p>

                        <h3 className="mt-1 truncate font-semibold">
                          {method.value}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {method.description}
                        </p>
                      </div>

                      <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Side panel */}
          <aside className="space-y-4">
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Mail className="size-5" />
              </div>

              <h2 className="mt-5 text-xl font-semibold">
                Send a direct email
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Email is the best option for detailed questions, technical
                feedback, or professional opportunities.
              </p>

              <Link
                href="mailto:moamenalswafiri@gmail.com"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "mt-5 w-full gap-2",
                )}
              >
                <Mail className="size-4" />
                Send email
              </Link>
            </div>

            <div className="rounded-2xl border bg-card p-5">
              <ContactDetail
                icon={Clock3}
                title="Response time"
                value="Usually within 1–3 business days"
              />

              <div className="my-4 border-t" />

              <ContactDetail icon={MapPin} title="Location" value="Palestine" />
            </div>
          </aside>
        </div>
      </section>

      {/* Safety notice */}
      <section className="border-y bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
          <div className="flex flex-col gap-4 rounded-2xl border bg-background p-5 sm:flex-row sm:items-start">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck className="size-5" />
            </div>

            <div>
              <h2 className="font-semibold">Before contacting support</h2>

              <p className="mt-1 max-w-3xl text-sm leading-6 text-muted-foreground">
                Include a clear description of the page or feature involved.
                Never send passwords, payment card details, authentication
                tokens, or other sensitive credentials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-12 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <h2 className="text-xl font-semibold">
              Want to know more about the platform?
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Explore the mission, features, architecture, and development
              approach.
            </p>
          </div>

          <Link
            href="/about"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "shrink-0 gap-2",
            )}
          >
            About the platform
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}

interface ContactDetailProps {
  icon: typeof Clock3;
  title: string;
  value: string;
}

function ContactDetail({ icon: Icon, title, value }: ContactDetailProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Icon className="size-4" />
      </div>

      <div>
        <p className="text-xs font-medium text-muted-foreground">{title}</p>
        <p className="mt-1 text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
