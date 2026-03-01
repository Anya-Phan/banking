'use client'
import CountUp from "react-countup";

export default function AnimatedCounter({amount}: {amount: number}) {
  return (
    <CountUp
      start={0}
      end={amount}
      duration={1}
      useEasing={true}
      prefix="$"
      decimals={2}
    />
  );
}