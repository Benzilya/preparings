"use client";

import { useCallback, useEffect, useState } from "react";

import type { QuestionProgressRecord } from "@/entities/progress";

import {
  clearQuestionProgress,
  exportQuestionProgress,
  readQuestionProgress,
} from "./storage";

export function useQuestionProgress() {
  const [records, setRecords] = useState<readonly QuestionProgressRecord[]>([]);

  const refresh = useCallback(() => setRecords(readQuestionProgress()), []);

  useEffect(() => {
    refresh();
    window.addEventListener("question-progress:changed", refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener("question-progress:changed", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [refresh]);

  return {
    records,
    refresh,
    reset: () => {
      clearQuestionProgress();
      refresh();
    },
    exportJson: () => exportQuestionProgress(),
  };
}
