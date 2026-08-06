import { BookOpen, Filter, Search } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, Input } from "@/shared/ui";

export default function QuestionsPage() {
  return (
    <section className="routePage" aria-labelledby="questions-title">
      <div className="routeHero">
        <p className="eyebrow">Question Library / База вопросов</p>
        <h1 id="questions-title">Explore structured QA knowledge.</h1>
        <p className="lead">
          Questions will be loaded from validated content records rather than being embedded in UI
          components.
        </p>
      </div>

      <label className="searchField">
        <Search aria-hidden="true" size={18} />
        <span className="srOnly">Search questions / Поиск вопросов</span>
        <Input placeholder="Search topics / Искать темы" type="search" />
      </label>

      <div className="routeGrid">
        <Card>
          <CardHeader>
            <BookOpen aria-hidden="true" size={20} />
            <CardTitle>Content contract / Контракт контента</CardTitle>
          </CardHeader>
          <CardContent>Every question has a stable ID, topic, difficulty, answers, and sources.</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Filter aria-hidden="true" size={20} />
            <CardTitle>Filters / Фильтры</CardTitle>
          </CardHeader>
          <CardContent>Topic, level, tag, and completion filters are planned for the MVP.</CardContent>
        </Card>
      </div>
    </section>
  );
}
