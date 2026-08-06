import {
  BarChart3,
  Bookmark,
  BookOpen,
  Bot,
  FlaskConical,
  LayoutDashboard,
  Map,
  Settings,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavigationItem {
  readonly label: string;
  readonly labelRu: string;
  readonly href: string;
  readonly icon: LucideIcon;
}

export const mainNavigation: readonly NavigationItem[] = [
  { label: "Dashboard", labelRu: "Дашборд", href: "/", icon: LayoutDashboard },
  { label: "AI Interview", labelRu: "AI-интервью", href: "/interview", icon: Bot },
  { label: "Question Library", labelRu: "База вопросов", href: "/questions", icon: BookOpen },
  { label: "Practice Labs", labelRu: "Практика", href: "/labs", icon: FlaskConical },
  { label: "Analytics", labelRu: "Аналитика", href: "/analytics", icon: BarChart3 },
  { label: "Roadmap", labelRu: "План развития", href: "/roadmap", icon: Map },
  { label: "Bookmarks", labelRu: "Закладки", href: "/bookmarks", icon: Bookmark },
];

export const utilityNavigation: readonly NavigationItem[] = [
  { label: "Settings", labelRu: "Настройки", href: "/settings", icon: Settings },
];
