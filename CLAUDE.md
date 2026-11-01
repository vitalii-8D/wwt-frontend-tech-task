# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

WinWinTravel frontend test task (React 19 + Vite + TypeScript, pnpm). The task (see `README.md`): build a filter modal from `src/shared/temp/filterData.json` (Figma design linked in README), opened by a button on the homepage. Requirements:

- The modal is pre-filled with previously saved selections.
- `Apply` opens a confirmation dialog. Confirm saves to the global zustand store; cancel keeps the previous state.
- The homepage shows the current saved filter as JSON (debug view).
- Required stack: react-query, tailwindcss, i18n (react-i18next), zustand, semantic HTML, Conventional Commits.
- If a new dependency is added, document why and what it is used for in some file.

Types: `FilterItem` (API input, `src/shared/api/types/Filter`) and `SearchRequestFilter` (output, `src/shared/api/types/SearchRequest`). `FilterItem` is currently only `FilterChoose` (`type: FilterType.OPTION`, with `options[]` and optional `allowAll`). `SearchRequestFilter` is an array of `{ id, type, optionsIds }`. `FilterType` is a `const enum`.

## Commands

- `pnpm dev`: Vite dev server on port 3000 (`strictPort`, HMR port 3010)
- `pnpm build`: `tsc && vite build`
- `pnpm lint:all` / `pnpm lint:file <path>`: ESLint, `--max-warnings 0`
- `pnpm format:all` / `pnpm format:check:all` / `pnpm format:file <path>`: Prettier
- `pnpm test`: Vitest (jsdom, globals, `setupTest.ts`). Single test: `pnpm test <file-or-pattern>` or `pnpm test -t "<name>"`. `pnpm coverage` runs with istanbul.

CI (`.github/workflows`) runs build, `format:check:all` and `lint:all` on Node 18 and 20 for every push and PR. The husky pre-commit hook runs lint-staged (prettier + eslint on staged `ts`/`tsx`).

## Architecture

Layers depend downward only: `pages` → `features` → `shared` (never the reverse).

- `src/main.tsx` mounts `App` (`src/pages/Home`) inside `QueryClientProvider` (`src/query.ts` exports the shared `queryClient`) and imports `./shared/i18n` for its side-effect init.
- `src/pages/Home`: page composition only (`App`, `FiltersStatus` for loading/error/retry, `SavedFilterDebug` for the JSON view).
- `src/features/filter`: the filter feature slice. `index.ts` exports only `FilterModal`. `ui/` holds `FilterModal`, `FilterGroup`, `FilterOption`, `ConfirmDialog`; `model/` holds the pure draft logic (`filterDraft.ts`) and the `useFilterDraft` hook (draft state + saving to the store).
- `src/shared/`: `api` (`filters` react-query hook and mock fetch, `types`), `assets` (SVGs), `components` (`Button`, `Dialog`, `ModalHeader`, `Checkbox`, `InfoTooltip`, each with an `index.ts` barrel), `i18n`, `lib` (`cn()`), `store` (zustand `useFilterStore`), `temp` (mock API data, typed in `filterData.ts`).
- i18n: resources are in `src/shared/i18n/locales/en/*.json` (currently `filter.json`), aggregated via `locales/index.ts`; `src/shared/i18n/i18n.d.ts` types them and `defaultNS` is `filter`, so `useTranslation()` needs no namespace argument.
- Path aliases (tsconfig + `vite-tsconfig-paths`): `@/*` → `src/*`, `@api`, `@assets`, `@components`, `@store`, `@temp`, `@lib` → `src/shared/*`, `@features/*` → `src/features/*`, `@pages/*` → `src/pages/*`.

## Conventions enforced by lint/format

- Tabs, single quotes, no semicolons, no trailing commas. Imports are auto-sorted by the Prettier plugin (react first, then third-party, then `@api`/`@components`/etc., then relative).
- Arrow functions only (`prefer-arrow`, `func-style: expression`).
- `i18next/no-literal-string` is an error: user-facing strings must go through i18n. Otherwise use `// eslint-disable-next-line i18next/no-literal-string`, as `App.tsx` does.
- `id-length` rule: identifiers must be 2+ characters, except `_ w h e i j k p m t`. `camelcase`, `curly`, `eqeqeq`, `no-use-before-define` and `no-implicit-coercion` are errors.
- Import SVGs as components with an `Icon` suffix (svgr). Imports must use the `@folder/` aliases, not `@/folder/` or relative paths to assets; add a matching tsconfig `paths` entry for any new alias.
- Compose class names with `cn()` from `@lib/cn` (clsx + tailwind-merge) so a caller's `className` overrides component defaults. Note that tailwind-merge does not know custom theme utilities such as `rounded-card`.
- Tailwind v4 via `@tailwindcss/vite` (styles in `src/main.css`).
