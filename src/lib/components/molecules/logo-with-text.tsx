import { tv, type VariantProps } from "tailwind-variants";
import { Link } from "~/i18n/navigation";
import { LogoSvg } from "../icons/logo.svg";

const logoWithTextVariants = tv({
  base: "flex items-center-safe gap-2 self-center text-lg font-medium transition duration-1000 hover:[&_svg]:text-primary",
  variants: {
    isLink: {
      true: null,
      false: "pointer-events-none",
    },
  },
  defaultVariants: {
    isLink: true,
  },
});

interface LogoWithTextProps extends VariantProps<typeof logoWithTextVariants> {
  className?: string;
}

export function LogoWithText(props: LogoWithTextProps) {
  return (
    <Link href="/" className={logoWithTextVariants(props)}>
      <LogoSvg className="size-8 transition-colors duration-300" />
      Finance Manager
    </Link>
  );
}
