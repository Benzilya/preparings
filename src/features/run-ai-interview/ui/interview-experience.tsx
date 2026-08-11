"use client";

import React, { useEffect, useState } from "react";

import type { InterviewSession } from "@/entities/interview-session";
import { useSettings } from "@/features/manage-settings";

import { interviewHistoryStorage } from "../model/history-storage";
import { interviewSessionChangedEvent, interviewSessionStorage } from "../model/session-storage";
import { InterviewHistory } from "./interview-history";
import { InterviewRunner } from "./interview-runner";
import { InterviewSetup } from "./interview-setup";

export function InterviewExperience() {
  const { language } = useSettings();
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const restore = () => setSession(interviewSessionStorage.read());
    restore();
    setHydrated(true);
    window.addEventListener(interviewSessionChangedEvent, restore);
    return () => window.removeEventListener(interviewSessionChangedEvent, restore);
  }, []);

  useEffect(() => {
    if (session?.status === "completed") interviewHistoryStorage.save(session);
  }, [session]);

  const reset = () => {
    interviewSessionStorage.clear();
    setSession(null);
  };

  if (!hydrated) return null;

  return (
    <>
      {session ? (
        <InterviewRunner session={session} onSessionChange={setSession} onReset={reset} />
      ) : (
        <InterviewSetup />
      )}
      <InterviewHistory language={session?.config.language ?? language} />
    </>
  );
}
