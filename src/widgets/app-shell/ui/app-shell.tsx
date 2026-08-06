"use client";

import Link from "next/link";
import type { PropsWithChildren } from "react";

import {
  getTranslations,
  readSettings,
  useSettings,
  writeSettings,
} from "@/features/manage-settings";
import { ThemeToggle } from "@/features/theme-toggle";
import { mainNavigation, utilityNavigation } from "@/shared/config/navigation";
import { projectAuthor } from "@/shared/config/project-author";

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

function LanguageSwitcher({ language }: { language: "ru" | "en" }) {
  const copy = getTranslations(language).shell;

  const selectLanguage = (nextLanguage: "ru" | "en") => {
    const current = readSettings();
    writeSettings({ ...current, language: nextLanguage });
  };

  return (
    <div className="languageSwitcher" role="group" aria-label={copy.languageSwitcher}>
      <button
        aria-label={copy.switchToRussian}
        aria-pressed={language === "ru"}
        className="languageOption"
        onClick={() => selectLanguage("ru")}
        type="button"
      >
        RU
      </button>
      <span aria-hidden="true">/</span>
      <button
        aria-label={copy.switchToEnglish}
        aria-pressed={language === "en"}
        className="languageOption"
        onClick={() => selectLanguage("en")}
        type="button"
      >
        EN
      </button>
    </div>
  );
}

export function AppShell({ children }: PropsWithChildren) {
  const { language } = useSettings();
  const copy = getTranslations(language).shell;

  return (
    <div className="appFrame">
      <a className="skipLink" href="#main-content">
        {copy.skipToContent}
      </a>

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
            ariaLabel={copy.utilityNavigation}
            items={utilityNavigation}
            language={language}
          />
          <a
            aria-label={copy.authorLink}
            className="authorLink"
            href={projectAuthor.githubUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            {copy.createdBy}
          </a>
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
            <LanguageSwitcher language={language} />
            <button className="commandButton" type="button" aria-label={copy.openSearch}>
              <span>{copy.search}</span>
              <kbd>⌘ K</kbd>
            </button>
            <ThemeToggle />
          </div>
        </header>
        <main className="appContent" id="main-content" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}
