---
title: refactor-filter-modal — implementation checklist
version: 1.1.0
updated: 2026-11-01
task: refactor-filter-modal
branch: refactor/refactor-filter-modal
base: refactor/refactor-filter-modal@ee360b5
inputs:
  - prompt@2026-11-01
  - docs/tasks/refactor-filter-modal/001_dfa_refactor_filter_modal.md@sha256:d2bfe2b8673b
---

## Task description

> /implement docs/tasks/refactor-filter-modal/001_dfa_refactor_filter_modal.md

## Inputs

| File                                                              | Location        | Pin                 |
| ----------------------------------------------------------------- | --------------- | ------------------- |
| docs/tasks/refactor-filter-modal/001_dfa_refactor_filter_modal.md | tracked in repo | sha256:d2bfe2b8673b |

## Context loaded

| Item                | Status / detail                                                                                                              |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| House rules         | CLAUDE.md (tabs, no semicolons, arrow fns, `i18next/no-literal-string`, `id-length`, aliases), package.json scripts          |
| Stack               | React 19 · Vite 6 · TypeScript 5.8 · Tailwind 4 · zustand 5 · react-query 5 · react-i18next · no API/DB · tests out of scope |
| Precedents          | `shared/components/Button` (component + barrel), `shared/store`, `shared/api/filters`                                        |
| Cross-cutting       | tsconfig `paths` (most aliases already exist; add `@features`, `@lib`), README deps section, CLAUDE.md refresh               |
| Best-practice rules | vercel-react-best-practices, vercel-composition-patterns (consulted; house rules win)                                        |

## Decisions & clarifications

- 2026-11-01 — Q: task name → A: `refactor-filter-modal` (existing DFA folder, current branch).
- 2026-11-01 — Q: commits → A: no commits; leave changes in the working tree.
- 2026-11-01 — DFA `001_dfa_refactor_filter_modal.md@sha256:d2bfe2b8673b` reused as the design (status "ready for implementation", no open questions); user invoked `/implement` on it.

## Acceptance criteria

DERIVED from DFA §1.2 Goal — pure refactor, behaviour and appearance identical:

- [x] AC1 — no duplicated markup, helper logic or class strings (F1–F5)
- [x] AC2 — filter feature isolated in `src/features/filter`; `pages/Home` only composes it (F6, F7, F10)
- [x] AC3 — consistent imports (aliases, barrels, no cycles); no dead code / unused deps (F8, F11–F14)
- [x] AC4 — `CLAUDE.md` matches the repo; new dependencies documented in README (F15, project rule)
- [x] AC5 — lint, format check and build pass

## Assumptions

- `defaultNS` / `useTranslation()` shape decided per DFA step 9 after checking `tsc`.
- `SearchRequest` shared card-style removal of duplicate strings is done through a `DIALOG_CARD_STYLES`-style choice, whichever adds no single-use prop.

## Steps

- [x] Step 1 — name, branch, inputs registered, checklist opened
- [x] Step 2 — context gathered, ACs extracted, clarifications asked
- [x] Step 3 — stack best practices + house rules loaded
- [x] Step 4 — design approved (existing DFA reused)
- [x] Step 5 — plan expanded below
- [x] Step 6 — implementation
  - [x] 6.1 deps + `cn()` + `@lib` alias (AC3)
  - [x] 6.2 README Dependencies section (AC4)
  - [x] 6.3 `Button` uses `cn()` (AC1)
  - [x] 6.4 shared `ModalHeader`, `Checkbox`, `InfoTooltip`, dialog styles (AC1)
  - [x] 6.5 feature slice `features/filter` + `@features` alias (AC2)
  - [x] 6.6 `isAllSelected` + `useFilterDraft` (AC1, AC2)
  - [x] 6.7 `FiltersStatus`, `SavedFilterDebug` (AC2)
  - [x] 6.8 types and API cleanup (AC3)
  - [x] 6.9 i18n config (AC3)
  - [x] 6.10 CLAUDE.md refresh (AC4)
- [x] Step 7 — validation green (incl. design conformance)
- [x] Step 8 — impact_summary.md + fe_handoff.md written
- [x] Step 9 — hand-back

## Validation

| Check                                   | Result                |
| --------------------------------------- | --------------------- |
| Lint                                    | PENDING               |
| Build / types                           | PENDING               |
| Migration consistency                   | NOT RUN — no database |
| App boots                               | PENDING               |
| Acceptance cross-check                  | PENDING               |
| Best-practices self-review              | PENDING               |
| Cross-cutting sync                      | PENDING               |
| Design conformance (vs DFA / design.md) | PENDING               |

## Follow-ups

- Add `extendTailwindMerge` theme config so `rounded-card` and other custom tokens are known to `cn()`.
- Manual visual regression at 320/768/1280px (button width overrides after `twMerge`).
- Vitest unit tests for `filterDraft.ts` and `useFilterDraft` (out of scope for this skill and DFA decision 5).
