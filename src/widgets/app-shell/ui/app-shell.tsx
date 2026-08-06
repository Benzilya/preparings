"use client";

import Link from "next/link";
import type { PropsWithChildren } from "react";

import { getTranslations, useSettings } from "@/features/manage-settings";
import { ThemeToggle } from "@/features/theme-toggle";
import { mainNavigation, utilityNavigation } from "@/shared/config/navigation";

function NavigationGroup({
  items,
  language,
  ariaLabel,
}: {
  items: typeof mainNavigation;
  language: "ru" | "en";
  ariaLabel: string;
}) {
  return (
    <nav aria-label={ariaLabel}>
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
  const copy = getTranslations(language).shell;

  return (
    <div className="appFrame">
      <aside className="appSidebar">
        <Link className="appBrand" href="/" aria-label={copy.home}>
          <span className="appBrandMark">Q</span>
          <span>
            <strong>QA Interview</strong>
            <small>Trainer Platform</small>
          </span>
        </Link>

        <NavigationGroup
          ariaLabel={copy.primaryNavigation}
          items={mainNavigation}
          language={language}
        />

        <div className="appSidebarFooter">
          <NavigationGroup
            ariaLabel={copy.primaryNavigation}
            items={utilityNavigation}
            language={language}
          />
          <p>Foundation · v0.1</p>
        </div>
      </aside>

      <div className="appWorkspace">
        <header className="appTopbar">
          <div>
            <p className="appTopbarEyebrow">{copy.workspace}</p>
            <strong>{copy.preparation}</strong>
          </div>
          <div className="appTopbarActions">
            <button className="commandButton" type="button" aria-label={copy.openSearch}>
              <span>{copy.search}</span>
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
