'use client';

import { selectReset } from "@/lib/features/controlsSlice";
import { useAppSelector } from "@/lib/hooks";
import Timer from "./Timer";

function TimerResetter() {

  const reset = useAppSelector(selectReset);

  return <Timer key={reset} />;

}

export default TimerResetter;
