import { BookOpen, ExternalLink, Search } from "lucide-react";

import { seedQuestions } from "@/../content/questions/seed";
import { Card, CardContent, CardHeader, CardTitle, Input } from "@/shared/ui";

const difficultyLabels = {
  junior: "Junior",
  middle: "Middle",
  senior: "Senior",
} as const;

export default function QuestionsPage() {
  return (
    <section className="routePage" aria-labelledby="questions-title">
      <div className="routeHero">
        <p className="eyebrow">Question Library / База вопросов</p>
        <h1 id="questions-title">Explore validated QA knowledge.</h1>
        <p className="lead">
          Every record passes runtime validation before it reaches the interface. The first seed set
          demonstrates sourced, level-aware interview content.
        </p>
      </div>

      <label className="searchField">
        <Search aria-hidden="true" size={18} />
        <span className="srOnly">Search questions / Поиск вопросов</span>
        <Input placeholder="Search topics / Искать темы" type="search" disabled />
      </label>

      <div className="questionList" aria-label="Validated questions / Валидированные вопросы">
        {seedQuestions.map((question) => (
          <Card key={question.id}>
            <CardHeader>
              <div className="questionMeta">
                <span>{question.category}</span>
                <span>{difficultyLabels[question.difficulty]}</span>
              </div>
              <CardTitle>{question.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{question.interviewerGoal}</p>
              <ul className="tagList" aria-label="Tags / Теги">
                {question.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <a
                className="sourceLink"
                href={question.sources[0]?.url}
                target="_blank"
                rel="noreferrer"
              >
                <BookOpen aria-hidden="true" size={16} />
                {question.sources[0]?.title}
                <ExternalLink aria-hidden="true" size={14} />
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
