'use client';

import {
  CircleDashedIcon,
  HomeIcon,
  type LucideIcon,
  SproutIcon,
  TreePalmIcon,
  UtensilsCrossedIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';
import { tv } from 'tailwind-variants';
import { Link, usePathname } from '~/i18n/navigation';
import { authClient } from '../../../../lib/auth/client';
import { LogoWithText } from '../../../../lib/components/molecules/logo-with-text';
import { cn } from '../../../../lib/utils/cn';
import { getInitials } from '../../../../lib/utils/get-initials';

export function Sidebar() {
  const { data: session, isPending } = authClient.useSession();
  const t = useTranslations('Sidebar');

  return (
    <aside className="relative flex min-h-svh w-2xs flex-col items-stretch gap-y-5 border-sidebar-border border-r bg-sidebar px-4 text-sidebar-foreground">
      <header className="relative flex h-16 shrink-0 items-center">
        <LogoWithText />
      </header>
      <nav className="relative flex flex-1 flex-col space-y-4">
        <ul className="flex flex-col gap-2">
          <li>
            <SidebarLink href="/dashboard" icon={HomeIcon}>
              {t('dashboard')}
            </SidebarLink>
          </li>
          <li>
            <SidebarLink href="/" icon={CircleDashedIcon}>
              {t('tasks')}
            </SidebarLink>
          </li>
        </ul>
        <ul className="flex flex-1 flex-col gap-2">
          <h2 className="text-muted-foreground text-semibold text-xs">
            {t('buckets')}
          </h2>
          <li>
            <SidebarLink href="/essentials" icon={UtensilsCrossedIcon}>
              {t('essentials')}
            </SidebarLink>
          </li>
          <li>
            <SidebarLink href="/leisure" icon={TreePalmIcon}>
              {t('leisure')}
            </SidebarLink>
          </li>
          <li>
            <SidebarLink href="/growth" icon={SproutIcon}>
              {t('growth')}
            </SidebarLink>
          </li>
        </ul>
      </nav>
      <footer className="mt-auto flex flex-col py-2">
        <Link
          href="/settings/profile"
          className={cn(
            'flex items-center gap-4 rounded-lg px-2 py-3 font-semibold text-sm text-white transition hover:bg-sidebar-accent hover:text-sidebar-primary',
            isPending && 'opacity-0',
          )}
        >
          <div className="-outline-offset-1 flex size-8 items-center justify-center rounded-full bg-accent text-center uppercase outline outline-white/10">
            {getInitials(session?.user.name)}
          </div>
          <span className="sr-only">{t('profile')}</span>
          <span aria-hidden="true">{session?.user.name}</span>
        </Link>
      </footer>
    </aside>
  );
}

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  badgeContent?: string;
  children: ReactNode;
}

const sidebarLinkVariants = tv({
  base: 'flex items-center gap-x-3 rounded-lg p-2 py-3 text-sm font-semibold transition-colors hover:bg-sidebar-accent hover:text-sidebar-primary',
  variants: {
    isActive: {
      false: null,
      true: 'bg-sidebar-accent text-sidebar-accent-foreground',
    },
  },
});

function SidebarLink({
  href,
  children,
  badgeContent,
  icon: Icon,
}: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive = href.startsWith(pathname);

  return (
    <Link href={href} className={sidebarLinkVariants({ isActive })}>
      <Icon className="size-6 shrink-0 rounded-md" />{' '}
      <span className="h-fit text-sm">{children}</span>{' '}
      {badgeContent && (
        <span
          aria-hidden="true"
          className="-outline-offset-1 ml-auto w-5 min-w-max whitespace-nowrap bg-accent px-2.5 py-0.5 text-center font-medium text-accent-foreground text-xs outline outline-white/15"
        >
          {badgeContent}
        </span>
      )}
    </Link>
  );
}
