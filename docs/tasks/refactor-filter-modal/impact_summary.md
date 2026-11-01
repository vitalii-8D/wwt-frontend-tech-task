---
version: 1.0.0
updated: 2026-11-01
inputs:
  - docs/tasks/refactor-filter-modal/001_dfa_refactor_filter_modal.md@sha256:d2bfe2b8673b
branch: refactor/refactor-filter-modal@ee360b5 (uncommitted)
---

# Impact summary — refactor-filter-modal

## Impacted modules

| Module                                                                    | Change                                                                                                                                                                    | AC       |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `src/features/filter/{index.ts,ui/*,model/*}`                             | new slice (moved with `git mv`): `FilterModal`, `FilterGroup`, `FilterOption` (was `OptionItem`), `ConfirmDialog`, `filterDraft` (+`isAllSelected`), new `useFilterDraft` | AC1, AC2 |
| `src/pages/Home/ui/{App,FiltersStatus,SavedFilterDebug}.tsx`              | page only composes; status and debug view extracted                                                                                                                       | AC2      |
| `src/shared/components/{ModalHeader,Checkbox,InfoTooltip}`                | new shared primitives replacing duplicated markup                                                                                                                         | AC1      |
| `src/shared/components/Button/Button.tsx`                                 | classes merged through `cn()`                                                                                                                                             | AC1      |
| `src/shared/components/Dialog/Dialog.tsx`                                 | owns `bg-white backdrop:bg-black/40`, merged with caller classes through `cn()`                                                                                           | AC1      |
| `src/shared/lib/{cn.ts,index.ts}`                                         | new `cn()` (clsx + tailwind-merge)                                                                                                                                        | AC1      |
| `src/shared/api/types/Filter/*`                                           | cycles removed; `FilterVariants.ts` → `FilterChoose.ts`; direct sibling imports; barrel API unchanged                                                                     | AC3      |
| `src/shared/api/types/SearchRequest/index.ts`                             | new barrel; consumers import `@api/types/SearchRequest`                                                                                                                   | AC3      |
| `src/shared/api/filters/fetchFilters.ts`, `src/shared/temp/filterData.ts` | cast moved out of API code into a typed mock module                                                                                                                       | AC3      |
| `src/shared/store/filterStore.ts`                                         | import path only                                                                                                                                                          | AC3      |
| `src/shared/i18n/*`                                                       | `debug: import.meta.env.DEV`; `defaultNS: 'filter'`; `not-found.json` and registration removed; `i18n.d.ts` uses relative imports                                         | AC3      |
| all components using `useTranslation`                                     | `useTranslation()` without namespace argument                                                                                                                             | AC3      |
| `tsconfig.json`                                                           | aliases `@features/*`, `@lib/*`                                                                                                                                           | AC3      |
| `package.json`, `pnpm-lock.yaml`                                          | add `clsx`, `tailwind-merge`; remove `date-fns`, `immer`, `react-router`, `react-router-dom`                                                                              | AC3      |
| `README.md`                                                               | new "Dependencies" section (why/what for)                                                                                                                                 | AC4      |
| `CLAUDE.md`                                                               | architecture, aliases, `cn()` convention refreshed; stale i18n/alias notes removed                                                                                        | AC4      |

## Deviations from the design

| #   | DFA says                                                       | Built                                                                                  | Reason                                                                                                                   |
| --- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| D1  | `FiltersStatus` retry uses `Button`                            | retry stays the underlined inline `<button>`                                           | `Button` is a filled brand button; using it would change appearance (pure refactor)                                      |
| D2  | `fetchFilters` drops the cast via `satisfies` / typed constant | the single `as FilterItem[]` cast now lives in `shared/temp/filterData.ts`             | JSON `type: string` is not assignable to `FilterType.OPTION`; a runtime validator was out of scope                       |
| D3  | shared dialog card classes incl. `rounded-card`                | `Dialog` owns only `bg-white backdrop:bg-black/40`; `rounded-card` stays at call sites | `tailwind-merge` does not know custom `rounded-card`, so a base `rounded-card` would not be overridden by `rounded-none` |
| D4  | `docs/tasks/filter-modal*` pointer if needed                   | none added                                                                             | those docs record history; not rewritten                                                                                 |

Resolution: not yet decided with the user (accept / change code / update DFA). Left documented.

## Contract changes

None at runtime. Internal: `OptionItem` → `FilterOption` (props `filterId`, `option`, `isChecked`, `onToggle`); `FilterModal` now imported from `@features/filter`.

## DB changes / env vars / breaking changes

None.

## What to regress manually (no tests written)

At 320, 768 and 1280px: page load + disabled button while loading + error/retry; modal pre-filled from saved filter; "All" select/clear; option toggles; Apply → confirm → debug JSON updates; cancel (X, Esc, backdrop) keeps the draft; "Use old filter" closes without saving. Check button widths (`w-full max-w-[280px] sm:w-[280px]`, `max-w-[280px] sm:w-auto`, `max-w-[184px]`), header sizes and sticky header/footer. The option checkbox now sits in a wrapper `div` (`flex min-w-0 gap-4`); check long option names wrap the same.
