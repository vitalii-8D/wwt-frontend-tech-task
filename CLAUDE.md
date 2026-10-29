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

- `src/main.tsx` mounts `App` (`src/pages/Home`) inside `QueryClientProvider` (`src/query.ts` exports the shared `queryClient`) and imports `./shared/i18n` for its side-effect init.
- `src/shared/` holds cross-cutting code: `api/types`, `i18n`, `temp` (mock API data).
- i18n: resources are in `src/shared/i18n/locales/en/*.json` (`filter.json`, `not-found.json`), aggregated via `locales/index.ts`. `src/i18next.d.ts` types the resources, but it imports from `../public/locales` and `./constants`, which don't exist (the real files are `src/shared/i18n/locales` and `i18nConstants.ts`). Fix those paths when working on typed `t()`.
- Path alias `@/*` maps to `src/*` (tsconfig + `vite-tsconfig-paths`).

## Conventions enforced by lint/format

- Tabs, single quotes, no semicolons, no trailing commas. Imports are auto-sorted by the Prettier plugin (react first, then third-party, then `@api`/`@components`/etc., then relative).
- Arrow functions only (`prefer-arrow`, `func-style: expression`).
- `i18next/no-literal-string` is an error: user-facing strings must go through i18n. Otherwise use `// eslint-disable-next-line i18next/no-literal-string`, as `App.tsx` does.
- `id-length` rule: identifiers must be 2+ characters, except `_ w h e i j k p m t`. `camelcase`, `curly`, `eqeqeq`, `no-use-before-define` and `no-implicit-coercion` are errors.
- Import SVGs as components with an `Icon` suffix (svgr). Imports must use the `@folder/` aliases, not `@/folder/` or relative paths to assets. Note that only `@/*` is actually defined in tsconfig, so add the matching paths entries before using aliases such as `@api` or `@assets`.
- Tailwind v4 via `@tailwindcss/vite` (styles in `src/main.css`).
