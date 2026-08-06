import { seedQuestions } from "@/../content/questions/seed";
import { ProgressDashboard } from "@/features/track-question-progress";

const modules = [
  {
    eyebrow: "01 · Library",
    title: "База вопросов, отделённая от UI",
    description: "Контент с источниками, сложностью и примерами Junior, Middle и Senior.",
  },
  {
    eyebrow: "02 · Progress",
    title: "Локальный прогресс без регистрации",
    description: "Статусы, избранное и экспорт хранятся только в браузере пользователя.",
  },
  {
    eyebrow: "03 · Categories",
    title: "Категории и устойчивые фильтры",
    description: "Каталог помогает быстро собирать релевантный набор тем для подготовки.",
  },
];

export default function HomePage() {
  return (
    <div className="dashboardPage">
      <section className="dashboardHero" aria-labelledby="dashboard-title">
        <div>
          <p className="eyebrow">Dashboard / Дашборд</p>
          <h1 id="dashboard-title">Подготовка к интервью как инженерная система.</h1>
          <p className="lead">
            Единое рабочее пространство для изучения вопросов, отслеживания прогресса и
            повторения слабых тем QA Fullstack Engineer.
          </p>
        </div>
        <a className="button buttonPrimary" href="/questions">
          Открыть базу вопросов
        </a>
      </section>

      <ProgressDashboard totalQuestions={seedQuestions.length} />

      <section className="moduleGrid" aria-label="Основные модули">
        {modules.map((module) => (
          <article className="card" key={module.eyebrow}>
            <p className="cardLabel">{module.eyebrow}</p>
            <h2>{module.title}</h2>
            <p>{module.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
