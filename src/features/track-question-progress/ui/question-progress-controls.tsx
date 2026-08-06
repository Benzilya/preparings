"use client";

import React, { useEffect, useState } from "react";

import type { QuestionProgressRecord, QuestionProgressStatus } from "@/entities/progress";
import { Button } from "@/shared/ui";

import { readQuestionProgress, upsertQuestionProgress } from "../model/storage";

const statuses: readonly QuestionProgressStatus[] = ["not-started", "learning", "completed"];

export function QuestionProgressControls({ questionId }: { questionId: string }) {
  const [record, setRecord] = useState<QuestionProgressRecord | undefined>();

  useEffect(() => {
    setRecord(readQuestionProgress().find((item) => item.questionId === questionId));
  }, [questionId]);

  const update = (patch: Partial<Pick<QuestionProgressRecord, "favorite" | "status">>) => {
    const records = upsertQuestionProgress(questionId, patch);
    setRecord(records.find((item) => item.questionId === questionId));
  };

  return (
    <section className="questionProgressPanel" aria-label="Question progress / Прогресс вопроса">
      <div>
        <strong>Progress / Прогресс</strong>
        <p>Saved locally in this browser / Сохраняется локально в браузере</p>
      </div>
      <select
        aria-label="Question status / Статус вопроса"
        onChange={(event) => update({ status: event.target.value as QuestionProgressStatus })}
        value={record?.status ?? "not-started"}
      >
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      <Button
        onClick={() => update({ favorite: !(record?.favorite ?? false) })}
        variant="secondary"
      >
        {record?.favorite ? "★ Favorite / Избранное" : "☆ Add favorite / В избранное"}
      </Button>
    </section>
  );
}
