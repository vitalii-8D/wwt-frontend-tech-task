---
title: filter-modal — implementation checklist
version: 1.1.0
updated: 2026-10-29
task: filter-modal
branch: feature/filter-modal
base: feat/filter_modal@774c413
inputs:
  - prompt@2026-10-29
  - docs/tasks/filter-modal/001_dfa_filter_modal.md@sha256:bbe985eb6a30
---

## Task description

> /implement docs/tasks/filter-modal/001_dfa_filter_modal.md . do not commit

User override: **no commits** this run (supersedes commit-per-step).

## Inputs

| File                                            | Location        | Pin                 |
| ----------------------------------------------- | --------------- | ------------------- |
| docs/tasks/filter-modal/001_dfa_filter_modal.md | tracked in repo | sha256:bbe985eb6a30 |
| README.md (task text)                           | tracked in repo | n/a                 |

## Context loaded

| Item                | Detail                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------- |
| House rules         | CLAUDE.md, .prettierrc.json, tsconfig.json                                                  |
| Stack               | React 19 + Vite + TS, react-query 5, zustand 5, react-i18next 13, Tailwind 4                |
| Best-practice rules | vercel-react-best-practices (rerender-\*, js-set-map-lookups, rendering-conditional-render) |

## Decisions & clarifications

- 2026-10-29 — Task name `filter-modal` confirmed. Branch `feature/filter-modal` created from `feat/filter_modal@774c413`.
- 2026-10-29 — DFA confirmed current and approved as the design.
- 2026-10-29 — User: do not commit.

## Acceptance criteria

- [x] AC1 — Button on homepage opens filter modal built from filterData.json
- [x] AC2 — Modal pre-filled with saved selection
- [x] AC3 — Apply opens confirm dialog; confirm saves to zustand store, cancel keeps previous state
- [x] AC4 — Homepage shows saved filter as JSON (SearchRequestFilter)
- [x] AC5 — react-query, tailwind, i18n, zustand, semantic HTML used

## Assumptions

- Figma assets (close/info icons) hand-authored as SVG if the connector download is unavailable.

## Steps

- [x] Step 1 — name, branch, checklist
- [x] Step 2 — context
- [x] Step 3 — best practices
- [x] Step 4 — DFA approved
- [x] Step 5 — plan below
- [x] Step 6 — implementation
  - [x] 6.1 tsconfig aliases + i18next.d.ts fix
  - [x] 6.2 data layer (`@api/filters`) + store (`@store`)
  - [x] 6.3 filterDraft helpers
  - [x] 6.4 i18n keys, Dialog, icons, theme tokens
  - [x] 6.5 FilterGroup, ConfirmDialog, FilterModal, App
- [x] Step 7 — validation
- [x] Step 8 — impact_summary.md + fe_handoff.md
- [x] Step 9 — hand-back

## Validation

| Check                  | Result                                |
| ---------------------- | ------------------------------------- |
| Lint                   | PASS                                  |
| Build / types          | PASS                                  |
| Acceptance cross-check | PASS (code-level; not browser-tested) |
| Design conformance     | DEVIATIONS (see impact_summary.md)    |

## Notes (post-implementation changes)

- svgr `include` fixed (headless-Chrome test found icons crashing); now accepts both `.svg` and `.svg?react`.
- Per-option description tooltip added (`title`), `OptionItem.tsx` extracted.
- "Use old filter" closes both dialogs (`onDiscard`); backdrop click = that dialog's close button; `Dialog` ignores nested `close` events.
- DFA updated to match (decisions 12-15, sections 3.2, 4.4, 4.4a, 9, 10.3).
- Re-tested in headless Chrome after each change.

## Follow-ups

- Headless Chrome (CDP) smoke test run: open, prefill, apply, cancel, confirm, close. Visual styling not checked.
- Figma icons hand-authored, not downloaded from Figma.
