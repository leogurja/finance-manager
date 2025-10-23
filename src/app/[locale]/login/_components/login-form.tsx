'use client';

import { useTranslations } from 'next-intl';
import { Link } from '~/i18n/navigation';
import { authClient } from '~/lib/auth/client';
import { Button } from '~/lib/components/atoms/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/lib/components/atoms/card';
import { GoogleIcon } from '~/lib/components/icons/google.svg';
import {
  Field,
  FieldDescription,
  FieldGroup,
} from '~/lib/components/molecules/field';
import { cn } from '~/lib/utils/cn';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const t = useTranslations('LoginForm');

  const loginWithGoogle = async () => {
    await authClient.signIn.social({
      callbackURL: '/dashboard',
      errorCallbackURL: '/error',
      newUserCallbackURL: '/dashboard',
      provider: 'google',
    });
  };
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t('welcomeBack')}</CardTitle>
          <CardDescription>{t('loginWithProvider')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Field>
                <Button
                  variant="outline"
                  type="button"
                  onClick={loginWithGoogle}
                >
                  <GoogleIcon />
                  {t('continueWith', { provider: 'Google' })}
                </Button>
              </Field>
              {/* <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                {t("or")}
              </FieldSeparator>
              <Field>
                <FieldLabel htmlFor="email">{t("email")}</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">{t("password")}</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    {t("forgotPassword")}
                  </a>
                </div>
                <Input id="password" type="password" required />
              </Field>
              <Field>
                <Button type="submit">{t("login")}</Button>
                <FieldDescription className="text-center">
                  {t("dontHaveAnAccount")} <a href="#">{t("signUp")}</a>
                </FieldDescription>
              </Field> */}
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        {t.rich('agreement', {
          policy: (chunks) => <Link href="policy">{chunks}</Link>,
          terms: (chunks) => <Link href="terms">{chunks}</Link>,
        })}
      </FieldDescription>
    </div>
  );
}
