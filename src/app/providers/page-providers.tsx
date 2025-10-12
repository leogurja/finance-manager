import { IntlayerServerProvider } from "next-intlayer/server";
import type { ReactNode } from "react";

interface PageProvidersProps {
  children: ReactNode;
  locale: string;
}

export default function PageProviders({
  children,
  locale,
}: PageProvidersProps) {
  return (
    <IntlayerServerProvider locale={locale}>{children}</IntlayerServerProvider>
  );
}
