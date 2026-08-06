const metrics = [
  { label: "Тем для изучения", value: "40+" },
  { label: "Режимов практики", value: "5" },
  { label: "Уровней интервью", value: "3" },
];

export default function HomePage() {
  return (
    <main className="shell">
      <section className="hero" aria-labelledby="hero-title">
        <p className="eyebrow">QA Interview Trainer</p>
        <h1 id="hero-title">Подготовка к интервью как системная инженерная практика.</h1>
        <p className="lead">
          Адаптивные интервью, структурированная база вопросов, практические расследования и
          персональный прогресс для QA Fullstack Engineer.
        </p>
        <div className="actions">
          <a className="button buttonPrimary" href="#roadmap">
            Начать подготовку
          </a>
          <a className="button" href="#capabilities">
            Изучить возможности
          </a>
        </div>
      </section>

      <section className="metrics" aria-label="Ключевые возможности">
        {metrics.map((metric) => (
          <article className="metric" key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </article>
        ))}
      </section>

      <section className="grid" id="capabilities" aria-label="Основные разделы">
        <article className="card">
          <p className="cardLabel">01 · Interview</p>
          <h2>AI-интервью с адаптивной сложностью</h2>
          <p>Уточняющие вопросы, прозрачная оценка и персональный план развития.</p>
        </article>
        <article className="card">
          <p className="cardLabel">02 · Library</p>
          <h2>База вопросов, отделённая от UI</h2>
          <p>Контент с источниками, уровнями сложности и примерами Junior, Middle и Senior.</p>
        </article>
        <article className="card" id="roadmap">
          <p className="cardLabel">03 · Progress</p>
          <h2>Знания, слабые темы и интервальные повторения</h2>
          <p>Профиль навыков превращает результаты практики в конкретные следующие шаги.</p>
        </article>
      </section>
    </main>
  );
}
