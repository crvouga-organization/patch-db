# Agent Notes

## Hard Rules

- **Never patch dependencies.** Do not use `bun patch`, `patch-package`, `pnpm patch`, or any other dependency-patching mechanism. Do not add a `patches/` directory or a `patchedDependencies` / `pnpm.patchedDependencies` / `resolutions` field to `package.json`. CI enforces this via `bun run check:no-patches`.

- **Never disable structural size limits for app code.** The Tiger-Style caps in `pkgs/eslint-rules/size-limits.cjs` (`max-lines`, `max-lines-per-function`, `max-statements`, `max-depth`, `max-params`, `max-nested-callbacks`, `complexity`, `max-classes-per-file`, `max-statements-per-line`) are load-bearing. Do **not** add per-file `'off'` overrides in any `pkgs/*/eslint.config.js`, and do **not** add `/* eslint-disable max-lines-per-function */` (or sibling) comments in source files. If a function tripped the cap, refactor it: extract sub-components, helper hooks, or pure helpers. The cap is the constraint, not a suggestion. The only legitimate exemption is `testOverrides()` (already wired in via the shared base config).

## Package layout

Workspace packages live under `pkgs/` with scope `@pkgs/<name>`:

```
pkgs/<name>/
  package.json
  tsconfig.json
  eslint.config.js
  src/
```

Flat packages (`patch-db`, `assert`, `keyword`, …) use:

```jsonc
"exports": {
  "./*": ["./src/*.ts", "./src/*.tsx", "./src/*/index.ts"]
}
```

`@pkgs/observability` uses per-runtime subpaths (`client/`, `server/`, `shared/`, `port/`, `impl-*`).

## Layering rules

- `shared/` cannot import from `client/` or `server/` (`shared-pure`).
- `client/` cannot import from `server/` and vice-versa (`client-not-server`, `server-not-client`).
- Every `@pkgs/*` package stays feature-agnostic — no imports from product apps or host-specific code.
- Only `@pkgs/sql-client` may value-import `pg` (enforced by `ci:no-direct-pg-imports`).

## CI

```bash
bun run check:ci
```

Runs syncpack, circular-deps, depcruise, no-direct-pg-imports, tc, lint, and test across all workspace packages.
