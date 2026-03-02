# NEXT_ACTIONS (AAHP)

## Status Summary

| Status  | Count |
|---------|-------|
| Done    | 10    |
| Ready   | 4     |
| Blocked | 1     |

---

## Ready - Work These Next

### T-011 [high] - Add integration tests for monitor service tick flows
- **Goal:** Cover the full monitor tick cycle with integration-level tests using a mocked api object.
- **Scope:** WhatsApp restart path, cron disable + issue create path, model recovery probe path, config hot-reload, dry-run suppression. Use Jest timer mocks.
- **Definition of done:** At least 20 new integration tests added; all healing paths exercised; `npm test` passes.
- **Files:** `test/index.test.ts`, `index.ts`
- **GitHub Issue:** #9

### T-012 [high] - Add startup configuration validation with fail-fast behavior
- **Goal:** Validate config on startup and refuse to start if invalid, logging clear errors.
- **Scope:** Export `validateConfig(config): { valid, errors }`. Validate `modelOrder` non-empty, `cooldownMinutes` 1-10080, `probeIntervalSec` >= 60, `whatsappMinRestartIntervalSec` >= 60, state dir writable.
- **Definition of done:** `validateConfig` exported and tested; plugin refuses to start on bad config; README updated.
- **Files:** `index.ts`, `test/index.test.ts`, `README.md`
- **GitHub Issue:** #10

### T-013 [medium] - Write status snapshot file on each monitor tick
- **Goal:** Write `buildStatusSnapshot()` output to a JSON file on every tick for external polling.
- **Scope:** Default path `~/.openclaw/workspace/memory/self-heal-status.json`, configurable via `statusFile`. Atomic write (`.tmp` + rename). Export `writeStatusFile(path, snapshot)` helper.
- **Definition of done:** Status file written every tick; atomic write; tests cover helper; README documents config key.
- **Files:** `index.ts`, `test/index.test.ts`, `README.md`
- **GitHub Issue:** #11

### T-014 [medium] - Export heal metrics to ~/.aahp/metrics.jsonl
- **Goal:** Append one JSONL line per heal event to `~/.aahp/metrics.jsonl` for analysis and alerting.
- **Scope:** Export `appendMetric(line, metricsFile)` helper. Write entries for: model-cooldown, session-patched, whatsapp-restart, cron-disabled, model-recovered. Configurable via `metricsFile`. Dry-run support.
- **Definition of done:** Helper exported and tested; all 5 event types write metrics; README documents format.
- **Files:** `index.ts`, `test/index.test.ts`, `README.md`
- **GitHub Issue:** #12

---

## Blocked

### T-005 [high] - Implement structured plugin health monitoring and auto-disable
- **Blocked by:** Waiting for `openclaw plugins list --json` API from openclaw core
- **Goal:** Monitor plugin health and auto-disable failing plugins using structured JSON output.
- **Context:** Current code has a stub that parses plain text output from `openclaw plugins list`. No robust parsing is possible without the `--json` flag.
- **What to do (when unblocked):**
  - Parse `openclaw plugins list --json` output for plugin status
  - Auto-disable plugins with `status=error` (respecting `pluginDisableCooldownSec`)
  - Create GitHub issues for disabled plugins
- **Files:** `index.ts`, `test/index.test.ts`
- **Definition of done:** Failing plugins are detected via JSON API and auto-disabled; tests cover detection and disable logic.
- **GitHub Issue:** #3

---

## Recently Completed

| Task  | Title | Date |
|-------|-------|------|
| T-004 | Add TypeScript build pipeline and type-checking | 2026-03-01 |
| T-010 | Expose self-heal status for external monitoring | 2026-02-28 |
| T-009 | Emit structured observability events for heal actions | 2026-02-28 |
| T-008 | Add dry-run mode for safe validation of healing logic | 2026-02-28 |
| T-007 | Add active model recovery probing to shorten cooldown periods | 2026-02-28 |
