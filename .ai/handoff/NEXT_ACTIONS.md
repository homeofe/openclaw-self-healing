# NEXT_ACTIONS (AAHP)

## Status Summary

| Status  | Count |
|---------|-------|
| Done    | 11    |
| Ready   | 3     |
| Blocked | 1     |

---

## Ready - Work These Next

### T-012 [high] - Add startup configuration validation with fail-fast behavior
- **Goal:** Validate config on startup and refuse to start if invalid, logging clear errors.
- **Context:** Currently parseConfig() silently falls back to defaults for any invalid value. The plugin starts even if modelOrder is empty, paths are not writable, or cooldownMinutes is set to an absurd value.
- **What to do:**
  - Export `validateConfig(config): { valid, errors }` function
  - Validate: modelOrder has at least one entry
  - Validate: cooldownMinutes is between 1 and 10080 (1 week)
  - Validate: probeIntervalSec >= 60
  - Validate: whatsappMinRestartIntervalSec >= 60
  - Validate: state file directory is writable (best-effort)
  - Log each validation error with api.logger?.error
  - Return early from register() if validation fails (fail-fast)
- **Files:** `index.ts`, `test/index.test.ts`, `README.md`
- **Definition of done:** validateConfig exported and tested; plugin refuses to start on bad config; README updated.
- **GitHub Issue:** #10

### T-013 [medium] - Write status snapshot file on each monitor tick
- **Goal:** Write `buildStatusSnapshot()` output to a JSON file on every tick for external polling.
- **Context:** The plugin already builds a StatusSnapshot and emits it via api.emit, but external tools cannot read it without subscribing to the event bus.
- **What to do:**
  - After each tick, write buildStatusSnapshot(state, config) to a JSON file
  - Default path: `~/.openclaw/workspace/memory/self-heal-status.json` (configurable via `statusFile`)
  - Write atomically (write to .tmp then rename)
  - Export `writeStatusFile(path, snapshot)` helper
  - Add statusFile to PluginConfig type and parseConfig
- **Files:** `index.ts`, `test/index.test.ts`, `README.md`
- **Definition of done:** Status file written every tick; atomic write; tests cover helper; README documents config key.
- **GitHub Issue:** #11

### T-014 [medium] - Export heal metrics to ~/.aahp/metrics.jsonl
- **Goal:** Append one JSONL line per heal event to `~/.aahp/metrics.jsonl` for analysis and alerting.
- **Context:** Heal events are currently only visible in logs and via api.emit(). There is no persistent record for analysis.
- **What to do:**
  - Export `appendMetric(line, metricsFile)` helper
  - Write entries for: model-cooldown, session-patched, whatsapp-restart, cron-disabled, model-recovered
  - Default metrics file: `~/.aahp/metrics.jsonl` (configurable via `metricsFile`)
  - Skip or mark dry-run events
  - Create parent directory if missing
- **Files:** `index.ts`, `test/index.test.ts`, `README.md`
- **Definition of done:** Helper exported and tested; all 5 event types write metrics; README documents format.
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
| T-011 | Add integration tests for monitor service tick flows | 2026-03-02 |
| T-004 | Add TypeScript build pipeline and type-checking | 2026-03-01 |
| T-010 | Expose self-heal status for external monitoring | 2026-02-28 |
| T-009 | Emit structured observability events for heal actions | 2026-02-28 |
| T-008 | Add dry-run mode for safe validation of healing logic | 2026-02-28 |
