# Comic Series Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Добавить вторую часть комикса, объединить части в единый цикл с доступной навигацией и добавить специализацию «Анимация» в RU/EN локализации.

**Architecture:** Контент цикла хранится как типизированный массив `comics`; `ComicsSection` управляет выбранной частью и передаёт её в существующий `ProjectLightbox`. Переключатель отображает все части при небольшом количестве и сохраняет горизонтальную прокрутку на узких экранах; переходы назад/вперёд дублируют навигацию под карточкой.

**Tech Stack:** React 19, TypeScript, i18next, Tailwind CSS 4, Vitest, Testing Library.

---

### Task 1: Описать ожидаемый контент цикла

**Files:**
- Modify: `src/content/comics.test.ts`
- Modify: `src/content/comics.ts`
- Create: `public/artworks/comics/stone-of-eternity-part-2/page-01.jpg`
- Create: `public/artworks/comics/stone-of-eternity-part-2/page-02.jpg`

- [ ] Обновить тест так, чтобы он ожидал две части, корректные ссылки ArtStation и порядок изображений.
- [ ] Запустить `npm run test -- src/content/comics.test.ts` и подтвердить падение из-за отсутствия второй части.
- [ ] Добавить типизированный массив `comics` с русским TSDoc и локальные изображения второй части.
- [ ] Повторно запустить тест и подтвердить прохождение.

### Task 2: Реализовать навигацию по частям

**Files:**
- Modify: `src/components/ComicsSection.test.tsx`
- Modify: `src/components/ComicsSection.tsx`
- Modify: `src/locales/ru.json`
- Modify: `src/locales/en.json`

- [ ] Добавить тесты начального выбора первой части, переключения на вторую, ссылок, галерей и переходов назад/вперёд.
- [ ] Запустить `npm run test -- src/components/ComicsSection.test.tsx` и подтвердить ожидаемое падение.
- [ ] Реализовать переключатель частей, общий заголовок цикла, локализованные тексты и передачу активного комикса в lightbox.
- [ ] Запустить тест компонента и подтвердить прохождение.

### Task 3: Добавить специализацию

**Files:**
- Modify: `src/components/About.test.tsx`
- Modify: `src/locales/ru.json`
- Modify: `src/locales/en.json`

- [ ] Добавить тесты на «Анимация» и `Animation`.
- [ ] Запустить тест и подтвердить падение.
- [ ] Дополнить массивы специализаций в обеих локализациях.
- [ ] Запустить тест и подтвердить прохождение.

### Task 4: Проверить результат

**Files:**
- Verify: `src/components/ComicsSection.tsx`
- Verify: `src/components/About.tsx`

- [ ] Запустить `npm run check`.
- [ ] Запустить локальный сайт и проверить desktop/mobile, клавиатурную навигацию, галереи обеих частей и финальный UI-чек-лист.
- [ ] Проверить `git diff --check` и убедиться, что незапрошенные файлы не изменены.
