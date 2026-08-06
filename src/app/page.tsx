const metrics = [
  { label: "Тем для изучения", value: "40+" },
  { label: "Режимов практики", value: "5" },
  { label: "Уровней интервью", value: "3" },
];

const modules = [
  {
    eyebrow: "01 · Interview",
    title: "AI-интервью с адаптивной сложностью",
    description: "Уточняющие вопросы, прозрачная оценка и персональный план развития.",
  },
  {
    eyebrow: "02 · Library",
    title: "База вопросов, отделённая от UI",
    description: "Контент с источниками, сложностью и примерами Junior, Middle и Senior.",
  },
  {
    eyebrow: "03 · Progress",
    title: "Слабые темы и интервальные повторения",
    description: "Профиль навыков превращает результаты практики в следующие шаги.",
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
            Единое рабочее пространство для теории, практики, интервью и измеримого прогресса QA
            Fullstack Engineer.
          </p>
        </div>
        <a className="button buttonPrimary" href="/interview">
          Начать интервью
        </a>
      </section>

      <section className="metrics" aria-label="Ключевые возможности">
        {metrics.map((metric) => (
          <article className="metric" key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </article>
        ))}
      </section>

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
