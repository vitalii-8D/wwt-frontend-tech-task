---
title: filter-modal-adaptiveness — implementation checklist
version: 1.2.0
updated: 2026-10-31
task: filter-modal-adaptiveness
branch: feature/filter-modal-adaptiveness
base: feature/filter-modal-adaptiveness@cb7b766 (branched from main@cb7b766)
inputs:
  - prompt@2026-10-31
  - docs/tasks/filter-modal-adaptiveness/001_dfa_filter_modal_adaptiveness.md@sha256:a2d7992b88f4
---

## Task description

> /implement docs/tasks/filter-modal-adaptiveness/001_dfa_filter_modal_adaptiveness.md

## Inputs

| File                                                                | Location                  | Pin                 |
| ------------------------------------------------------------------- | ------------------------- | ------------------- |
| `001_dfa_filter_modal_adaptiveness.md` (design-first DFA, = design) | tracked in repo, not copy | sha256:a2d7992b88f4 |

## Context loaded

| Item                | Status / detail                                                                                         |
| ------------------- | ------------------------------------------------------------------------------------------------------- |
| House rules         | `CLAUDE.md`, `package.json` scripts (`lint:all`, `build`, `format:check:all`)                           |
| Stack               | React 19 + Vite + TS, Tailwind v4, zustand, react-query, react-i18next · no DB · no API change · Vitest |
| Precedents          | the existing `src/pages/Home/ui/*` components (className-only changes)                                  |
| Cross-cutting       | none (no i18n keys, no types, no store change)                                                          |
| Best-practice rules | `vercel-react-best-practices` / composition: not exercised (CSS-only change); house rules + Tailwind v4 |

## Decisions & clarifications

- 2026-10-31 — Q: task name → A: `filter-modal-adaptiveness` (confirmed)
- 2026-10-31 — Q: is the DFA still current? → A: yes, proceed. DFA `001_dfa_filter_modal_adaptiveness.md@sha256:a2d7992b88f4` approved as design.
- 2026-10-31 — Implementation note (not a contract change): the DFA's `p-4` dialog plus `sticky top-0` header would leave a 16px strip where content scrolls above the header. Header/footer get negative margins (`-mt-4`/`-mb-4`) on phones to cover the padding. Same classes otherwise.

## Acceptance criteria

DERIVED from DFA §1.2 / §2 (approved with the DFA):

- [x] AC1 — Desktop (≥1024px) appearance is unchanged.
- [x] AC2 — Below 640px the filter modal is a full-screen sheet with a sticky header and a sticky Apply footer.
- [x] AC3 — Option columns: 1 (<640), 2 (640–1023), 3 (≥1024), column-first order, checkboxes not split across columns.
- [x] AC4 — Confirm dialog on phones is a compact card with stacked buttons (Confirm on top); side by side from 640px.
- [x] AC5 — No horizontal scroll at 320px; touch targets ≥ 44px on touch widths; long names wrap.
- [x] AC6 — Homepage minimal tweaks (padding, h1 size, full-width open button, `pre` scrolls inside).
- [x] AC7 — Tailwind only, no JS layout, no new dependency; semantics, DOM and tab order unchanged.

## Assumptions

- Manual viewport verification (DFA decision 8) is the user's; no browser is driven here. Validation covers lint, format, build.
- No tests written (out of scope for this skill; DFA decision 8).

## Steps

- [x] Step 1 — name, branch, inputs registered, checklist opened
- [x] Step 2 — context gathered, ACs extracted, clarifications asked
- [x] Step 3 — stack best practices + house rules loaded
- [x] Step 4 — design approved (existing DFA reused)
- [x] Step 5 — plan expanded below
- [x] Step 6 — implementation
  - [x] 6.1 `FilterModal.tsx` — responsive dialog, sticky header/footer, title, close button (AC1, AC2, AC5, AC7)
  - [x] 6.2 `FilterGroup.tsx` + `OptionItem.tsx` — `columns-*`, remove inline style and `rows`, touch height, wrapping (AC3, AC5)
  - [x] 6.3 `ConfirmDialog.tsx` — compact card, stacked buttons (AC4, AC5)
  - [x] 6.4 `App.tsx` — homepage tweaks (AC6)
- [x] Step 7 — validation green (incl. design conformance)
- [x] Step 8 — impact_summary.md + fe_handoff.md written
- [x] Step 9 — hand-back

## Validation

| Check                       | Result                                                                              |
| --------------------------- | ----------------------------------------------------------------------------------- |
| Lint                        | PASS                                                                                |
| Format check                | PASS                                                                                |
| Build / types               | PASS                                                                                |
| Migration consistency       | NOT RUN — no database                                                               |
| App boots                   | NOT RUN — no browser/viewport check here; vite build passes                         |
| Acceptance cross-check      | PASS (code-level; AC1/AC2/AC5 visual parts need the manual viewport matrix, DFA §8) |
| Best-practices self-review  | PASS                                                                                |
| Cross-cutting sync          | PASS — none required                                                                |
| Design conformance (vs DFA) | DEVIATIONS — see impact_summary.md                                                  |

## Follow-ups

none yet
