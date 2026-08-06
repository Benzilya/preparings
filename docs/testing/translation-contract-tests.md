# Translation contract tests / Тесты контракта переводов

## English

`tests/translations-contract.test.ts` protects the shared English and Russian interface dictionary.

The checks verify that:

- both languages expose the same nested translation surface;
- user-facing string values are not empty;
- locale metadata matches the selected language.

This prevents a localized screen from compiling with a missing key in one language or silently rendering an empty label.

## Русский

`tests/translations-contract.test.ts` защищает общий словарь английского и русского интерфейса.

Проверки подтверждают, что:

- оба языка предоставляют одинаковую вложенную структуру переводов;
- пользовательские строки не пустые;
- метаданные локали соответствуют выбранному языку.

Это предотвращает ситуацию, когда локализованный экран собирается с отсутствующим ключом одного языка или незаметно показывает пустую подпись.
