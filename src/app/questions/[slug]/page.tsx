import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";

import { seedQuestions } from "@/../content/questions/seed";

export function generateStaticParams() {
  return seedQuestions.map((question) => ({ slug: question.slug }));
}

export default async function QuestionDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const question = seedQuestions.find((item) => item.slug === slug);

  if (!question) notFound();

  return (
    <article className="questionDetails">
      <Link className="backLink" href="/questions">
        ← Question Library / База вопросов
      </Link>

      <header className="questionDetailsHeader">
        <div className="questionMeta">
          <span>{question.category}</span>
          <span>{question.difficulty}</span>
        </div>
        <h1>{question.title}</h1>
        <p className="lead">{question.explanation}</p>
      </header>

      <section className="detailSection">
        <h2>What the interviewer evaluates / Что оценивает интервьюер</h2>
        <p>{question.interviewerGoal}</p>
      </section>

      <section className="detailSection">
        <h2>Expected answer / Ожидаемый ответ</h2>
        <p>{question.expectedAnswer}</p>
      </section>

      <section className="detailSection">
        <h2>Answer examples by level / Примеры по уровням</h2>
        <div className="answerExampleGrid">
          {question.answerExamples.map((example) => (
            <div className="answerExample" key={example.level}>
              <strong>{example.level}</strong>
              <p>{example.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="detailColumns">
        <section className="detailSection">
          <h2>Common mistakes / Частые ошибки</h2>
          <ul>
            {question.mistakes.map((mistake) => (
              <li key={mistake}>{mistake}</li>
            ))}
          </ul>
        </section>

        <section className="detailSection">
          <h2>Follow-up questions / Уточняющие вопросы</h2>
          <ul>
            {question.followUpQuestions.map((followUp) => (
              <li key={followUp}>{followUp}</li>
            ))}
          </ul>
        </section>
      </div>

      {question.practicalExample ? (
        <section className="detailSection detailHighlight">
          <h2>Practical example / Практический пример</h2>
          <p>{question.practicalExample}</p>
        </section>
      ) : null}

      <section className="detailSection">
        <h2>Sources / Источники</h2>
        <ul className="sourceList">
          {question.sources.map((source) => (
            <li key={source.url}>
              <a href={source.url} rel="noreferrer" target="_blank">
                {source.title}
                <ExternalLink aria-hidden="true" size={14} />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
