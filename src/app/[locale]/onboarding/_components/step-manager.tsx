"use client";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Card } from "~/lib/components/atoms/card";
import ExplanationStep from "./explanation-step";
import FormStep from "./form-step";

export function StepManager() {
  const [index, setIndex] = useState<number>(0);

  return (
    <Card className="relative w-full max-w-lg overflow-hidden">
      <AnimatePresence mode="wait">
        {index === 0 && <ExplanationStep goForward={() => setIndex(1)} />}
        {index === 1 && <FormStep goBack={() => setIndex(0)} />}
      </AnimatePresence>
    </Card>
  );
}
