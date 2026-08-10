"use client";

import React, { useEffect, useState } from "react";

import type { InterviewSession } from "@/entities/interview-session";

import { interviewSessionChangedEvent, interviewSessionStorage } from "../model/session-storage";
import { InterviewRunner } from "./interview-runner";
import { InterviewSetup } from "./interview-setup";

export function InterviewExperience() {
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const restore = () => setSession(interviewSessionStorage.read());
    restore();
    setHydrated(true);
    window.addEventListener(interviewSessionChangedEvent, restore);
    return () => window.removeEventListener(interviewSessionChangedEvent, restore);
  }, []);

  const reset = () => {
    interviewSessionStorage.clear();
    setSession(null);
  };

  if (!hydrated) return null;
  if (!session) return <InterviewSetup />;

  return <InterviewRunner session={session} onSessionChange={setSession} onReset={reset} />;
}
