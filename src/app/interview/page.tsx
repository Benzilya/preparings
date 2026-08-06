import { Bot, Clock3, Gauge } from "lucide-react";

import { Button, Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";

export default function InterviewPage() {
  return (
    <section className="routePage" aria-labelledby="interview-title">
      <div className="routeHero">
        <p className="eyebrow">AI Interview / AI-интервью</p>
        <h1 id="interview-title">Practice an adaptive QA interview.</h1>
        <p className="lead">
          Configure the level and focus areas. The interview engine will be connected in the next
          product increment.
        </p>
      </div>

      <div className="routeGrid">
        <Card>
          <CardHeader>
            <Bot aria-hidden="true" size={20} />
            <CardTitle>Interview mode / Режим интервью</CardTitle>
          </CardHeader>
          <CardContent>Mixed fullstack QA session with transparent scoring.</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Gauge aria-hidden="true" size={20} />
            <CardTitle>Difficulty / Сложность</CardTitle>
          </CardHeader>
          <CardContent>Junior, Middle, and Senior tracks will share one domain contract.</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Clock3 aria-hidden="true" size={20} />
            <CardTitle>Duration / Длительность</CardTitle>
          </CardHeader>
          <CardContent>Short, standard, and deep-dive sessions are planned.</CardContent>
        </Card>
      </div>

      <Button disabled variant="primary">
        Start interview / Начать интервью
      </Button>
    </section>
  );
}
