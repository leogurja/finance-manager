'use client';

import { motion } from 'framer-motion';
import { useId } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Button } from '~/lib/components/atoms/button';
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/lib/components/atoms/card';
import { Input } from '~/lib/components/atoms/input';
import { Label } from '~/lib/components/atoms/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/lib/components/atoms/select';
import { Separator } from '~/lib/components/atoms/separator';
import { Slider } from '~/lib/components/atoms/slider';

type FormValues = {
  currency: string;
  income: number;
  essentials: number;
  fun: number;
  growth: number;
};

interface FormStepProps {
  goBack: () => void;
}

export default function FormStep({ goBack }: FormStepProps) {
  const { control, register, handleSubmit, setValue } = useForm<FormValues>({
    defaultValues: {
      currency: 'BRL',
      essentials: 50,
      fun: 30,
      growth: 20,
      income: 5000,
    },
  });

  const [_income, essentials, fun] = useWatch({
    control,
    name: ['income', 'essentials', 'fun'],
  });
  const growth = 100 - essentials - fun;

  const onSubmit = (data: FormValues) => {
    const payload = { ...data, growth };
    console.log('Onboarding completed:', payload);
    // redirecionar pra dashboard depois
  };

  const handleSliderChange = (values: [number, number]) => {
    const newEssentials = values[0];
    const newFun = values[1] - newEssentials;
    setValue('essentials', newEssentials);
    setValue('fun', newFun);
  };

  const currencyId = useId();
  const incomeId = useId();

  return (
    <motion.form
      key="form"
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="space-y-6 p-6"
    >
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Set up your buckets
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Currency */}
        <div className="space-y-2">
          <Label htmlFor={currencyId}>Currency</Label>
          <Controller
            name="currency"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id={currencyId}>
                  <SelectValue placeholder="Select a currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BRL">🇧🇷 BRL - Brazilian Real</SelectItem>
                  <SelectItem value="USD">🇺🇸 USD - US Dollar</SelectItem>
                  <SelectItem value="EUR">🇪🇺 EUR - Euro</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Income */}
        <div className="space-y-2">
          <Label htmlFor={incomeId}>Monthly Income</Label>
          <Input
            id={incomeId}
            type="number"
            min={0}
            step={100}
            {...register('income', { valueAsNumber: true })}
          />
        </div>

        <Separator />

        {/* Bucket division */}
        <div className="space-y-4">
          <Label>Divide your buckets</Label>
          <Controller
            name="essentials"
            control={control}
            render={() => (
              <Slider
                defaultValue={[50, 80]}
                min={0}
                max={100}
                step={1}
                onValueChange={handleSliderChange}
              />
            )}
          />

          <div className="grid grid-cols-3 gap-2 text-center font-medium text-sm">
            <div>
              <p>Essentials</p>
              <p className="text-muted-foreground">{essentials}%</p>
            </div>
            <div>
              <p>Fun</p>
              <p className="text-muted-foreground">{fun}%</p>
            </div>
            <div>
              <p>Growth</p>
              <p className="text-muted-foreground">{growth}%</p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="ghost" onClick={goBack} type="button">
          Back
        </Button>
        <Button type="submit">Finish</Button>
      </CardFooter>
    </motion.form>
  );
}
