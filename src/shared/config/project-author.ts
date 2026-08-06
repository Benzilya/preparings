export type ContactKind = "email" | "phone" | "telegram" | "github" | "portfolio";

export interface ProjectContact {
  readonly kind: ContactKind;
  readonly value: string;
  readonly href: string;
  readonly external: boolean;
}

export const projectAuthor = {
  displayName: "@benzilya",
  githubUrl: "https://github.com/Benzilya",
} as const;

export const projectContacts: readonly ProjectContact[] = [
  {
    kind: "email",
    value: "hushrodak@yandex.ru",
    href: "mailto:hushrodak@yandex.ru",
    external: false,
  },
  {
    kind: "phone",
    value: "+7 (928) 776-62-97",
    href: "tel:+79287766297",
    external: false,
  },
  {
    kind: "telegram",
    value: "@benzilya",
    href: "https://t.me/benzilya",
    external: true,
  },
  {
    kind: "github",
    value: "github.com/Benzilya",
    href: "https://github.com/Benzilya",
    external: true,
  },
  {
    kind: "portfolio",
    value: "benzilya.github.io",
    href: "https://benzilya.github.io/",
    external: true,
  },
] as const;
