---
version: 1.1.0
updated: 2026-10-29
inputs: 001_dfa_filter_modal.md@sha256:bbe985eb6a30
---

# Impact summary

| Module                                                              | Change                                                                                                                                 | AC       |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `tsconfig.json`                                                     | `@api/@assets/@components/@pages/@store/@temp` paths                                                                                   | AC5      |
| `src/i18next.d.ts`                                                  | import paths fixed                                                                                                                     | AC5      |
| `src/shared/api/filters/*`                                          | `fetchFilters`, `useFiltersQuery`                                                                                                      | AC1      |
| `src/shared/store/*`                                                | zustand `useFilterStore` (in-memory)                                                                                                   | AC3, AC4 |
| `src/pages/Home/model/filterDraft.ts`                               | pure draft helpers                                                                                                                     | AC2, AC3 |
| `src/pages/Home/ui/{App,FilterModal,FilterGroup,ConfirmDialog}.tsx` | UI                                                                                                                                     | AC1-AC4  |
| `src/pages/Home/ui/OptionItem.tsx`                                  | option row extracted from `FilterGroup` with description tooltip                                                                       | AC1      |
| `src/shared/components/Dialog/*`                                    | native `<dialog>` wrapper                                                                                                              | AC1, AC3 |
| `src/shared/assets/{close,info}.svg`                                | icons                                                                                                                                  | AC1      |
| `src/shared/i18n/locales/en/filter.json`                            | copy                                                                                                                                   | AC5      |
| `vite.config.ts`                                                    | svgr `include` changed to `['**/*.svg', '**/*.svg?react']` (the old `**/*.svg` alone never matched `?react` imports, so icons crashed) | AC1      |
| `src/main.css`                                                      | `@theme` tokens, `.filter-checkbox`                                                                                                    | AC1      |

## Deviations from the design

- Icons are hand-authored SVGs, not Figma exports (assets not downloaded).
- `Dialog` takes an extra `labelledBy` and `className` prop.
- Descriptions are shown only as native `title` tooltips: the filter description on the section info icon, the option description on each option row. No inline text.
- `.filter-checkbox` is plain CSS in `main.css`, not Tailwind utilities (the tick needs a pseudo-state background).
- Confirm dialog is rendered nested inside the filter `<dialog>`; it is still top-layer via `showModal()`.

## Regress manually

Open modal, tick options, Apply, Cancel/Esc (store unchanged), Apply again, confirm (JSON updates), reopen (pre-filled), Esc on filter dialog.

No contract, DB or env changes. No new dependencies.

## Post-review changes

- "Use old filter" closes both dialogs without saving (`onDiscard`); the confirm's close icon and Esc only close the confirm.
- Backdrop click on a dialog behaves like its own close button (`Dialog` compares click coordinates with the dialog rect).
- `Dialog` ignores `close` events from nested dialogs (React bubbles them through the tree).
