# patch-db

Patch-based entity database with Postgres authority, SQLite client cache, HTTP sync transport, React query hooks, and a deterministic sync simulator.

## Workspace layout

```
pkgs/
  patch-db/        # core library
  assert/          # assertions + crash UI
  async/           # fire-and-forget helpers
  attribute/       # attribute/index model
  keyword/         # branded string types
  logger/          # logging port
  observability/   # tracing port + adapters
  pub-sub/         # pub/sub port
  sql/             # SQL fragment builders
  sql-client/      # Postgres/SQLite client factories
  sqlite/          # SQLite query helpers
  ts-reset/        # TypeScript ambient resets
  eslint-rules/    # shared ESLint config
```

## Development

```bash
bun install
bun run check:ci
```

Per-package tasks:

```bash
bun run --filter @pkgs/patch-db test
bun run --filter @pkgs/patch-db tc
bun run --filter @pkgs/patch-db lint
```

## Postgres integration test

`@pkgs/patch-db` includes an optional Postgres integration test (`migrate-reconcile-pg.integration.test.ts`). It runs only when `DATABASE_URL` is set:

```bash
DATABASE_URL=postgres://... bun run --filter @pkgs/patch-db test
```

## Documentation

- [`pkgs/patch-db/SYNC.md`](pkgs/patch-db/SYNC.md) — sync model and identity vocabulary
- [`pkgs/patch-db/src/sim/README.md`](pkgs/patch-db/src/sim/README.md) — deterministic sync simulator

## License

Private — see repository owner for usage terms.
