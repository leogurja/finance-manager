import { useTranslations, type Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import { StepManager } from "./_components/step-manager";

export default function OnboardingPage({
  params,
}: PageProps<"/[locale]/onboarding">) {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);

  const t = useTranslations("OnboardingPage");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <StepManager />
      </div>
    </div>
  );
}
