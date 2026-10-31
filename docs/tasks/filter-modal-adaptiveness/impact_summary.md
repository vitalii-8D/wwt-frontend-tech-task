---
version: 1.0.0
updated: 2026-10-31
inputs:
  - docs/tasks/filter-modal-adaptiveness/001_dfa_filter_modal_adaptiveness.md@sha256:a2d7992b88f4
---

# Impact summary — filter-modal-adaptiveness

| Module                                | Change                                                                                         | AC            |
| ------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------- |
| `src/pages/Home/ui/FilterModal.tsx`   | full-screen sheet below `sm`, sticky header/footer, scaled title, 44px close, full-width Apply | AC1, AC2, AC5 |
| `src/pages/Home/ui/FilterGroup.tsx`   | grid → `columns-1 sm:columns-2 lg:columns-3`; inline style and `rows` removed                  | AC3           |
| `src/pages/Home/ui/OptionItem.tsx`    | `break-inside-avoid`, `pb-4`, `min-h-11`, wrapping label                                       | AC3, AC5      |
| `src/pages/Home/ui/ConfirmDialog.tsx` | compact card, stacked buttons (Confirm on top) below `sm`                                      | AC4           |
| `src/pages/Home/ui/App.tsx`           | responsive padding, h1, full-width open button, `pre` max width                                | AC6           |
| `Dialog.tsx`, `main.css`              | not changed (`scroll-py-20` added in the dialog className instead of CSS)                      | —             |

## Deviations from the design

- Header and footer use `-mt-4`/`-mb-4` (phones) so the sticky bars cover the dialog's 16px padding; the DFA did not list this. Reason: otherwise content scrolls visibly above the header.
- Header keeps `relative` behaviour via `sm:relative` (not `sm:static`) so the absolutely positioned close button stays anchored.
- `scroll-py-20` added to the filter dialog className (DFA §4 item 6 allowed it conditionally; added up front, unverified in a browser).
- Close buttons in both dialogs also use `flex items-center justify-center` to center the icon in the 44px hit area.

Resolution: left as documented deviations (not yet confirmed with the user).

## Contract / DB / env / breaking changes

None.

## Regress manually

The viewport matrix in DFA §8 (320, 375, 768, 1024, 1280px): columns, sticky bars, confirm stacking, close paths, keyboard focus under sticky bars, long names, homepage at 320px. Compare desktop against a screenshot from before.
