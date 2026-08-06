import Link from "next/link";
import type { PropsWithChildren } from "react";

import { mainNavigation, utilityNavigation } from "@/shared/config/navigation";

function NavigationGroup({ items }: { items: typeof mainNavigation }) {
  return (
    <nav aria-label="Primary navigation / Основная навигация">
      <ul className="appNavList">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <li key={item.href}>
              <Link className="appNavLink" href={item.href}>
                <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
                <span>{item.labelRu}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function AppShell({ children }: PropsWithChildren) {
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

        <NavigationGroup items={mainNavigation} />

        <div className="appSidebarFooter">
          <NavigationGroup items={utilityNavigation} />
          <p>Foundation · v0.1</p>
        </div>
      </aside>

      <div className="appWorkspace">
        <header className="appTopbar">
          <div>
            <p className="appTopbarEyebrow">Workspace / Рабочее пространство</p>
            <strong>Interview preparation</strong>
          </div>
          <button className="commandButton" type="button" aria-label="Open command palette">
            <span>Search / Поиск</span>
            <kbd>⌘ K</kbd>
          </button>
        </header>
        <main className="appContent">{children}</main>
      </div>
    </div>
  );
}
