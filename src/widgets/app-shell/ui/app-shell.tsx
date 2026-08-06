"use client";

import Link from "next/link";
import type { PropsWithChildren } from "react";

import { useSettings } from "@/features/manage-settings";
import { ThemeToggle } from "@/features/theme-toggle";
import { mainNavigation, utilityNavigation } from "@/shared/config/navigation";

function NavigationGroup({
  items,
  language,
}: {
  items: typeof mainNavigation;
  language: "ru" | "en";
}) {
  return (
    <nav aria-label={language === "ru" ? "Основная навигация" : "Primary navigation"}>
      <ul className="appNavList">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <li key={item.href}>
              <Link className="appNavLink" href={item.href}>
                <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
                <span>{language === "ru" ? item.labelRu : item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function AppShell({ children }: PropsWithChildren) {
  const { language } = useSettings();
  const isRussian = language === "ru";

  return (
    <div className="appFrame">
      <aside className="appSidebar">
        <Link className="appBrand" href="/" aria-label="QA Interview Trainer — home">
          <span className="appBrandMark">Q</span>
          <span>
            <strong>QA Interview</strong>
            <small>Trainer Platform</small>
          </span>
        </Link>

        <NavigationGroup items={mainNavigation} language={language} />

        <div className="appSidebarFooter">
          <NavigationGroup items={utilityNavigation} language={language} />
          <p>Foundation · v0.1</p>
        </div>
      </aside>

      <div className="appWorkspace">
        <header className="appTopbar">
          <div>
            <p className="appTopbarEyebrow">{isRussian ? "Рабочее пространство" : "Workspace"}</p>
            <strong>{isRussian ? "Подготовка к интервью" : "Interview preparation"}</strong>
          </div>
          <div className="appTopbarActions">
            <button
              className="commandButton"
              type="button"
              aria-label={isRussian ? "Открыть поиск" : "Open search"}
            >
              <span>{isRussian ? "Поиск" : "Search"}</span>
              <kbd>⌘ K</kbd>
            </button>
            <ThemeToggle />
          </div>
        </header>
        <main className="appContent">{children}</main>
      </div>
    </div>
  );
}
