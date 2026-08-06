import { seedQuestions } from "@/../content/questions/seed";
import { QuestionLibrary } from "@/features/filter-questions";

export default function QuestionsPage() {
  return (
    <section className="routePage" aria-labelledby="questions-title">
      <div className="routeHero">
        <p className="eyebrow">Question Library / База вопросов</p>
        <h1 id="questions-title">Explore validated QA knowledge.</h1>
        <p className="lead">
          Search by topic or tag, filter by interview level, and open a complete sourced answer.
        </p>
      </div>

      <QuestionLibrary questions={seedQuestions} />
    </section>
  );
}
