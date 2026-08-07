"use client";

import { getTranslations, useSettings } from "@/features/manage-settings";
import { projectAuthor, projectContacts, type ContactKind } from "@/shared/config/project-author";

const contactLabelKeys: Record<
  ContactKind,
  "email" | "phone" | "telegram" | "github" | "portfolio"
> = {
  email: "email",
  phone: "phone",
  telegram: "telegram",
  github: "github",
  portfolio: "portfolio",
};

export default function ContactsPage() {
  const { language } = useSettings();
  const copy = getTranslations(language).contacts;

  return (
    <div className="contactsPage routePage">
      <header className="routeHero">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p className="lead">{copy.lead}</p>
      </header>

      <section aria-labelledby="contacts-list-title">
        <h2 className="srOnly" id="contacts-list-title">
          {copy.title}
        </h2>
        <ul className="contactGrid">
          {projectContacts.map((contact) => {
            const label = copy[contactLabelKeys[contact.kind]];
            const externalHint = contact.external ? ` (${copy.openExternal})` : "";

            return (
              <li className="contactCard" key={contact.kind}>
                <p className="cardLabel">{label}</p>
                <a
                  aria-label={`${label}: ${contact.value}${externalHint}`}
                  className="contactLink"
                  href={contact.href}
                  {...(contact.external ? { rel: "noopener noreferrer", target: "_blank" } : {})}
                >
                  {contact.value}
                </a>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="aboutProject" aria-labelledby="about-project-title">
        <p className="cardLabel">{copy.aboutTitle}</p>
        <h2 id="about-project-title">{copy.aboutTitle}</h2>
        <p>{copy.aboutBody}</p>
        <a
          aria-label={`${copy.author} (${copy.openExternal})`}
          className="contactLink"
          href={projectAuthor.githubUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          {copy.author}
        </a>
      </section>
    </div>
  );
}
