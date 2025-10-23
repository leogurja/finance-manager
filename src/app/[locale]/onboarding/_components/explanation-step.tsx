import { Button } from '~/lib/components/atoms/button';
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/lib/components/atoms/card';
import { cn } from '~/lib/utils/cn';

interface ExplanationStepProps {
  goForward: () => void;
}

export default function ExplanationStep({ goForward }: ExplanationStepProps) {
  return (
    <div
      key="intro"
      className="fade-in animate-in space-y-6 p-8 text-center duration-400"
    >
      <CardHeader>
        <CardTitle className="font-semibold text-3xl">
          Your{' '}
          <span className="fade-in animate-in text-primary starting:opacity-0 delay-400 duration-400">
            Buckets
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="fade-in animate-in text-muted-foreground starting:opacity-0 delay-800 duration-400">
          Manage your money simply — divide it into three buckets that keep life
          balanced.
        </p>

        <div className="flex flex-col items-start gap-3">
          <Bucket
            name="Essentials"
            desc="Your needs — bills, rent, food."
            color="bg-blue-500"
            delay="delay-1200"
          />
          <Bucket
            name="Fun"
            desc="Your joy — going out, hobbies, fun stuff."
            color="bg-pink-500"
            delay="delay-1600"
          />
          <Bucket
            name="Growth"
            desc="Your future — savings, investments, goals."
            color="bg-green-500"
            delay="delay-2000"
          />
        </div>
      </CardContent>

      <CardFooter className="flex justify-center">
        <Button onClick={goForward}>Continue</Button>
      </CardFooter>
    </div>
  );
}

interface BucketProps {
  name: string;
  desc: string;
  delay: string;
  color: string;
}

function Bucket({ name, desc, color, delay }: BucketProps) {
  return (
    <div
      className={cn(
        'fade-in flex animate-in items-center justify-center gap-3 starting:opacity-0 duration-400',
        delay,
      )}
    >
      <div className={`h-3 w-3 rounded-full ${color}`} />
      <div className="text-left">
        <p className="font-medium">{name}</p>
        <p className="text-muted-foreground text-xs">{desc}</p>
      </div>
    </div>
  );
}
