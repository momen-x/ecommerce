"use client";
import Image from "next/image";
import logo from "@/public/assets/logo.png";
import loadingImage from "@/public/assets/loadingImage.png";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

const steps = [
  { value: 13, duration: 400 },
  { value: 66, duration: 700 },
  { value: 100, duration: 900 },
  { value: 0, duration: 300 },
] as const;

export default function LoadingPage() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const currentDuration = steps[stepIndex].duration;

    const timer = setTimeout(() => {
      setStepIndex((prev) => (prev + 1) % steps.length);
    }, currentDuration);

    return () => clearTimeout(timer);
  }, [stepIndex]);

  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex min-h-screen items-center justify-center bg-background p-4 sm:p-6"
    >
      <div className="grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-3xl border border-border bg-card text-card-foreground shadow-xl md:grid-cols-2">
        <div className="flex flex-col justify-between p-8 sm:p-12 md:p-10 lg:p-12">
          <div className="flex items-center">
            <Image
              src={logo}
              alt="NovaCart logo"
              width={150}
              height={50}
              priority
              className="h-auto w-35 object-contain sm:w-38.75   "
            />
          </div>

          <div className="my-auto py-8 text-center md:text-left">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              NovaCart <br /> Discover the world of e-commerce
            </h1>
          </div>

          <div>
            <Progress
              value={steps[stepIndex].value}
              className="w-[60%] mb-5 bg-gray-200 dark:bg-gray-700 **:data-[slot=progress-indicator]:bg-teal-600"
            />
            <p>Loading your shopping journey ...</p>
          </div>
        </div>

        {/* Right Side: Split View Focused Image */}
        <div className="relative hidden min-h-125 bg-muted md:block">
          <Image
            src={loadingImage}
            alt="Student studying with warm ambient lighting"
            width={1280}
            height={720}
            priority
            className="object-cover object-center grayscale-15 brightness-90 dark:brightness-75"
            sizes="(max-width: 768px) 0vw, 50vw"
          />
          {/* Subtle warm overlay to mimic the exact photo ambiance */}
          <div className="absolute inset-0 bg-linear-to-tr from-amber-500/5 via-transparent to-transparent mix-blend-soft-light pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
