# Hindicode Roadmap

This roadmap describes the major evolution path for Hindicode.

## Phase 1: Hindi JavaScript Core

Focus:
- compiler foundation
- CLI basics
- diagnostics
- Node and browser-oriented execution coverage
- test and docs scaffolding

Primary outcome:
- Hindicode stops being only a regex translator and becomes a structured language toolchain foundation.

## Phase 2: Production Hindicode — ✅ mostly done

Done: full keyword coverage, ES modules, browser runtime, source maps, Hindi error messages and typo suggestions. Open items (structured translation, watch/build, config) moved to Phase 3.

Focus:
- structured translation replacing the legacy path
- code generation and source maps
- stronger ESM and runtime interoperability
- debug workflows and compile outputs
- packaging, build, and watch ergonomics
- compatibility guarantees for early adopters

Primary outcome:
- Hindicode becomes realistic for sustained developer use, not only experiments.

## Phase 3: Framework Hindicode — next (see PHASE_THREE_PLAN.md)

Focus:
- Vite/esbuild/Webpack integration
- React support
- test runner integration
- template and app scaffolding flows
- framework compatibility fixtures

Primary outcome:
- Hindicode becomes usable inside mainstream JavaScript app workflows.

## Phase 4: Ecosystem Maturity

Focus:
- editor tooling
- formatter and linting rules
- playground and education tooling
- package ecosystem patterns
- advanced contributor workflows

Primary outcome:
- Hindicode becomes a serious ecosystem project rather than only a compiler package.

## Cross-Phase Rules

- correctness beats feature count
- docs and tests must grow with features
- new syntax should be specified before it is marketed
- framework support should not outpace compiler reliability
