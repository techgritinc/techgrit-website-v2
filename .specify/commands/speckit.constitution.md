
## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Supported Flags

Parse `$ARGUMENTS` for these flags:

| Flag | Behavior |
|------|----------|
| `--discover` | **Discovery Mode**: Analyze existing codebase to extract patterns and create constitution from discovered practices |
| `--interactive` | **Interactive Mode**: Ask clarifying questions when patterns are ambiguous (works with or without `--discover`) |
| `--auto-accept` | **Auto-Accept Mode**: Use recommended answers for all questions without prompting (requires `--interactive`) |
| `--template` | **Template Mode** (default): Start from `.specify/templates/constitution-template.md` and fill via user input |

**Examples**:
- `/speckit.constitution` → Template mode, interactive questions
- `/speckit.constitution --discover` → Analyze codebase, auto-resolve clear patterns, ask about conflicts
- `/speckit.constitution --discover --interactive` → Discover + ask questions for every category
- `/speckit.constitution --template --auto-accept` → Use template with recommended best practices

## Outline

You are updating the project constitution at `.specify/memory/constitution.md`. This file is a TEMPLATE containing placeholder tokens in square brackets (e.g. `[PROJECT_NAME]`, `[PRINCIPLE_1_NAME]`). Your job is to (a) collect/derive concrete values, (b) fill the template precisely, and (c) propagate any amendments across dependent artifacts.

**Note**: If `.specify/memory/constitution.md` does not exist yet, it should have been initialized from `.specify/templates/constitution-template.md` during project setup. If it's missing, copy the template first.

## Execution Flow

### Step 0: Determine Mode

1. Check if `--discover` flag is present in `$ARGUMENTS`
2. If **YES**: Proceed to **Discovery Mode** (Section A below)
3. If **NO**: Proceed to **Template Mode** (Section B below)

---

## Section A: Discovery Mode (--discover)

**Purpose**: Analyze existing codebase to extract implicit patterns and codify them into a constitution.

### A1. Codebase Analysis Phase

Scan the project to discover patterns across these categories. For each category, use the specified detection method:

#### **1. Project Structure**

**Detection Method**:
- Check for directories: `src/`, `lib/`, `packages/`, `services/`, `apps/`
- Look for `package.json`, `lerna.json`, `nx.json`, `turbo.json` (monorepo indicators)
- Count top-level directories and their organization

**Pattern Types**:
- Monorepo (Nx, Turborepo, Lerna, pnpm workspaces)
- Microservices (multiple service directories)
- Library/Package (single focused purpose)
- Feature-based (src/features/)
- Layered (src/controllers, src/services, src/models)

**Output**: `structure_pattern: "<detected pattern>"`

#### **2. Tech Stack**

**Detection Method** (Language-Agnostic):

**A. Detect Languages** (by file extensions):
- JavaScript/TypeScript: `.js`, `.jsx`, `.ts`, `.tsx`, `.mjs`, `.cjs`
- Python: `.py`, `.pyw`, `.pyx`
- Java: `.java`
- C#: `.cs`, `.csx`
- Go: `.go`
- Rust: `.rs`
- Ruby: `.rb`, `.rake`
- PHP: `.php`
- Kotlin: `.kt`, `.kts`
- Swift: `.swift`
- Dart: `.dart`
- Elixir: `.ex`, `.exs`
- C/C++: `.c`, `.cpp`, `.cc`, `.h`, `.hpp`
- Scala: `.scala`
- Clojure: `.clj`, `.cljs`, `.cljc`

**B. Detect Package Managers & Manifests**:
- Node.js: `package.json`, `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`, `bun.lockb`
- Python: `requirements.txt`, `setup.py`, `pyproject.toml`, `Pipfile`, `poetry.lock`
- Java: `pom.xml`, `build.gradle`, `build.gradle.kts`, `settings.gradle`
- .NET: `*.csproj`, `*.sln`, `packages.config`, `*.nuspec`
- Go: `go.mod`, `go.sum`, `Gopkg.toml`
- Rust: `Cargo.toml`, `Cargo.lock`
- Ruby: `Gemfile`, `Gemfile.lock`, `*.gemspec`
- PHP: `composer.json`, `composer.lock`
- Dart: `pubspec.yaml`, `pubspec.lock`
- Elixir: `mix.exs`, `mix.lock`
- Swift: `Package.swift`, `Podfile`, `Cartfile`
- Scala: `build.sbt`, `project/build.properties`

**C. Detect Frameworks** (from manifests):
- **JavaScript/TypeScript**: `react`, `vue`, `angular`, `svelte`, `next`, `nuxt`, `express`, `fastify`, `nestjs`, `koa`
- **Python**: `django`, `flask`, `fastapi`, `tornado`, `pyramid`, `bottle`, `falcon`
- **Java**: `spring-boot`, `spring`, `micronaut`, `quarkus`, `dropwizard`, `vertx`
- **C#**: `aspnetcore`, `entity-framework`, `blazor`, `xamarin`, `maui`
- **Go**: `gin`, `echo`, `fiber`, `chi`, `gorilla`, `beego`
- **Ruby**: `rails`, `sinatra`, `hanami`, `roda`, `grape`
- **PHP**: `laravel`, `symfony`, `codeigniter`, `slim`, `lumen`
- **Rust**: `actix-web`, `rocket`, `warp`, `axum`, `tide`
- **Kotlin**: `ktor`, `spring-boot` (Kotlin)
- **Swift**: `vapor`, `kitura`, `perfect`
- **Elixir**: `phoenix`, `plug`

**D. Detect Build Tools**:
- **JS/TS**: `vite`, `webpack`, `rollup`, `esbuild`, `parcel`, `turbopack`, `swc`
- **Python**: `poetry`, `pip`, `pipenv`, `hatch`, `pdm`, `flit`
- **Java**: `maven`, `gradle`, `ant`, `bazel`
- **C#**: `msbuild`, `dotnet`, `nuget`
- **Go**: `go build`, `go mod`, `mage`
- **Rust**: `cargo`
- **Ruby**: `bundler`, `rake`
- **PHP**: `composer`
- **Dart**: `dart`, `flutter`
- **Elixir**: `mix`
- **General**: `make`, `cmake`, `bazel`, `buck2`, `ninja`

**E. Detect Test Frameworks**:
- **JS/TS**: `vitest`, `jest`, `mocha`, `jasmine`, `cypress`, `playwright`, `testcafe`, `ava`, `tape`
- **Python**: `pytest`, `unittest`, `nose2`, `doctest`, `hypothesis`, `tox`
- **Java**: `junit`, `testng`, `spock`, `mockito`, `assertj`
- **C#**: `xunit`, `nunit`, `mstest`, `specflow`
- **Go**: `testing` (built-in), `testify`, `ginkgo`, `gomega`
- **Rust**: `cargo test` (built-in), `rstest`, `proptest`
- **Ruby**: `rspec`, `minitest`, `test-unit`, `cucumber`
- **PHP**: `phpunit`, `codeception`, `behat`, `pest`
- **Swift**: `xctest`, `quick`, `nimble`
- **Kotlin**: `junit`, `kotest`, `spek`
- **Elixir**: `exunit` (built-in)

**Output**:
```json
{
  "languages": ["TypeScript", "Python", "Go"],
  "primary_language": "TypeScript",
  "frameworks": ["React", "FastAPI", "Gin"],
  "package_managers": ["pnpm", "Poetry", "go mod"],
  "build_tools": ["Vite", "Poetry", "go build"],
  "test_frameworks": ["Vitest", "Pytest", "testing"]
}
```

#### **3. Testing Patterns**

**Detection Method** (Language-Agnostic):

**A. Find Test Files by Language**:
- **JavaScript/TypeScript**: `**/*.test.{js,ts,jsx,tsx}`, `**/*.spec.{js,ts,jsx,tsx}`, `**/__tests__/**/*.{js,ts,jsx,tsx}`
- **Python**: `**/test_*.py`, `**/*_test.py`, `**/tests/**/*.py`
- **Go**: `**/*_test.go`
- **Java**: `**/Test*.java`, `**/*Test.java`, `**/*Tests.java`, `**/src/test/java/**/*.java`
- **C#**: `**/Test*.cs`, `**/*Test.cs`, `**/*Tests.cs`, `**/Tests/**/*.cs`
- **Rust**: `**/tests/**/*.rs`, `**/*_test.rs` (also check for `#[test]` annotations)
- **Ruby**: `**/test_*.rb`, `**/*_test.rb`, `**/spec/**/*_spec.rb`
- **PHP**: `**/Test*.php`, `**/*Test.php`, `**/tests/**/*.php`
- **Swift**: `**/*Tests.swift`, `**/Tests/**/*.swift`
- **Kotlin**: `**/Test*.kt`, `**/*Test.kt`, `**/src/test/**/*.kt`
- **Elixir**: `**/test/**/*_test.exs`
- **Scala**: `**/*Test.scala`, `**/*Spec.scala`, `**/src/test/**/*.scala`

**B. Analyze Test Organization**:
- **Co-located**: Tests next to source (`src/component.ts` + `src/component.test.ts`)
- **Separate**: Tests in dedicated directory (`src/` + `tests/` or `test/`)
- **Mirror Structure**: Test directory mirrors source structure
- **Flat**: All tests in one directory
- **By Type**: Separate directories (unit/, integration/, e2e/)

**C. Check Coverage Configs**:
- **JS/TS**: `.nycrc`, `jest.config.js`, `vitest.config.ts`, `coverage/`
- **Python**: `.coveragerc`, `coverage.py`, `pyproject.toml` [tool.coverage]
- **Java**: `jacoco.xml`, `pom.xml` (jacoco plugin), `build.gradle` (jacoco)
- **C#**: `coverlet.json`, `.runsettings`, `dotcover.xml`
- **Go**: Built-in coverage via `go test -cover`
- **Rust**: `tarpaulin.toml`, `llvm-cov` config
- **Ruby**: `.simplecov`, `coverage/`
- **PHP**: `phpunit.xml`, `clover.xml`

**D. Detect Test Types**:
- **Unit**: Test files matching source structure, mocking external dependencies
- **Integration**: `integration/`, `e2e/`, tests hitting real dependencies
- **End-to-End**: Cypress, Playwright, Selenium configs
- **Performance**: `benchmark/`, `perf/`, load testing tools
- **Snapshot**: Jest/Vitest snapshots, approval tests

**E. Count & Calculate**:
- Count test files vs source files
- Estimate test-to-code ratio
- Check for CI test runs in `.github/workflows/`, `.gitlab-ci.yml`, `Jenkinsfile`

**Pattern Types**:
- Test-Driven (tests/ directory structure, high test count, ratio >0.8)
- Test-After (lower test count, ratio <0.5)
- Co-located (tests next to source)
- Separated (dedicated test directories)
- Integration-focused (e2e/, integration/ directories)
- Unit-focused (mostly unit tests, high mocking)
- Mixed (combination of unit, integration, e2e)

**Output**:
```json
{
  "framework": "Vitest",
  "organization": "co-located",
  "coverage_target": "75%",
  "coverage_tool": "v8",
  "test_types": ["unit", "integration"],
  "test_count": 156,
  "source_count": 203,
  "ratio": "0.77",
  "ci_integration": true,
  "e2e_framework": "Playwright"
}
```

#### **4. Code Organization & Architecture**

**Detection Method**:
- Analyze directory structures in `src/`:
  - Feature-based: `src/features/<feature>/{components,hooks,stores}`
  - Layered: `src/{controllers,services,repositories,models}`
  - Domain-driven: `src/{domain,application,infrastructure}`
  - Hexagonal: `src/{core,adapters,ports}`
- Check for architecture decision records: `docs/adr/`, `architecture/`

**Output**: `architecture_pattern: "<detected pattern>"`

#### **5. Naming Conventions**

**Detection Method** (Language-Agnostic):

**A. Sample Files Across Codebase** (50+ files per language):

**File Naming Patterns**:
- `kebab-case.ts` - Common in JS/TS/web
- `PascalCase.tsx` - Common for React components
- `snake_case.py` - Standard in Python
- `camelCase.js` - Less common, but exists
- `flatcase.go` - Common in Go
- `PascalCase.cs` - Standard in C#
- `PascalCase.java` - Standard in Java
- `snake_case.rb` - Standard in Ruby
- `kebab-case.php` or `PascalCase.php` - Varies in PHP

**Directory Naming Patterns**:
- `kebab-case/` - Common in JS/TS/web
- `camelCase/` - Common in Java/C#
- `PascalCase/` - Common in C#
- `snake_case/` - Common in Python/Ruby
- `lowercase/` - Common in Go
- `flatcase/` - No separators

**B. Analyze Code Naming** (from language-specific patterns):

**JavaScript/TypeScript**:
- Variables/Functions: `camelCase`, `_privateVar`, `CONSTANT`
- Classes: `PascalCase`
- Interfaces: `IPascalCase` or `PascalCase`
- Types: `PascalCase` or `PascalCaseType`

**Python**:
- Variables/Functions: `snake_case`, `_private_var`, `CONSTANT`
- Classes: `PascalCase`
- Modules: `snake_case.py`

**Java**:
- Variables/Methods: `camelCase`
- Classes: `PascalCase`
- Constants: `SCREAMING_SNAKE_CASE`
- Packages: `lowercase` or `lowercase.dot.separated`

**C#**:
- Variables: `camelCase` (local), `PascalCase` (public)
- Methods/Properties: `PascalCase`
- Classes: `PascalCase`
- Interfaces: `IPascalCase`
- Constants: `PascalCase` or `SCREAMING_SNAKE_CASE`

**Go**:
- Variables/Functions: `camelCase` (unexported), `PascalCase` (exported)
- Packages: `lowercase`
- Constants: `camelCase` or `PascalCase`

**Rust**:
- Variables/Functions: `snake_case`
- Types/Traits: `PascalCase`
- Constants: `SCREAMING_SNAKE_CASE`
- Modules: `snake_case`

**Ruby**:
- Variables/Methods: `snake_case`
- Classes/Modules: `PascalCase`
- Constants: `SCREAMING_SNAKE_CASE`

**PHP**:
- Variables/Functions: `camelCase` or `snake_case`
- Classes: `PascalCase`
- Constants: `SCREAMING_SNAKE_CASE`

**Swift**:
- Variables/Functions: `camelCase`
- Types: `PascalCase`
- Protocols: `PascalCase`

**Kotlin**:
- Variables/Functions: `camelCase`
- Classes: `PascalCase`
- Constants: `SCREAMING_SNAKE_CASE`

**C. Read Linting Configs**:
- `.eslintrc` - naming-convention rules
- `pyproject.toml` - [tool.pylint] naming-style
- `.golangci.yml` - revive naming rules
- `rustfmt.toml` - naming conventions
- `.rubocop.yml` - Naming/* rules
- `phpcs.xml` - naming standards
- `.swiftlint.yml` - identifier_name rules

**D. Count & Analyze**:
- Count occurrences of each pattern
- Calculate dominant pattern (>50%)
- Flag conflicts (<80% consistency)
- Check if pattern matches language standards

**Output**:
```json
{
  "files": {
    "kebab-case": 45,
    "PascalCase": 12,
    "camelCase": 3
  },
  "directories": {
    "kebab-case": 8,
    "camelCase": 2
  },
  "code_naming": {
    "variables": "camelCase",
    "classes": "PascalCase",
    "constants": "SCREAMING_SNAKE_CASE"
  },
  "recommended": "kebab-case files, camelCase variables",
  "confidence": "75%",
  "language_standard": true
}
```

#### **6. Error Handling Patterns**

**Detection Method**:
- Search for error handling keywords:
  - `try-catch` blocks (count occurrences)
  - `Result<T, E>` pattern (TypeScript/Rust)
  - `Either<L, R>` (functional)
  - `throw new Error` vs `return { error: ... }`
- Check for error types/classes: `class CustomError extends Error`

**Output**:
```json
{
  "pattern": "Result<T, E>",
  "occurrences": 67,
  "alternative_count": 5,
  "recommended": "Result pattern"
}
```

#### **7. Code Style & Formatting**

**Detection Method** (Language-Agnostic):

**A. Universal Config Files**:
- `.editorconfig` - Cross-language editor settings (indent, charset, line endings)

**B. Language-Specific Formatters & Linters**:

**JavaScript/TypeScript**:
- Formatters: `.prettierrc`, `.prettierrc.json`, `prettier.config.js`
- Linters: `.eslintrc`, `.eslintrc.json`, `eslint.config.js`, `tsconfig.json`
- Extract: indent, quotes, semicolons, trailing commas, line length, arrow parens

**Python**:
- Formatters: `pyproject.toml` [tool.black], `setup.cfg`, `.flake8`, `.isort.cfg`
- Linters: `pylint.rc`, `.pylintrc`, `mypy.ini`, `ruff.toml`
- Tools: Black, isort, autopep8, yapf
- Extract: line length, indent, string quotes

**Java**:
- Formatters: `checkstyle.xml`, `.editorconfig`, `eclipse-formatter.xml`
- Linters: `pmd.xml`, `spotbugs.xml`
- Tools: Checkstyle, PMD, SpotBugs, Google Java Format
- Extract: indent, brace style, import order

**C#**:
- Formatters: `.editorconfig`, `stylecop.json`, `.globalconfig`
- Linters: `.editorconfig` [*.cs], `Directory.Build.props`
- Tools: StyleCop, Roslyn analyzers
- Extract: indent, brace style, naming conventions

**Go**:
- Formatters: `gofmt` (standard), `goimports`, `.golangci.yml`
- Linters: `.golangci.yml` (golangci-lint), `staticcheck.conf`
- Note: Go enforces tabs, standard formatting

**Rust**:
- Formatters: `rustfmt.toml`, `.rustfmt.toml`
- Linters: `clippy.toml`, `.clippy.toml`
- Tools: rustfmt, clippy
- Extract: indent, line length, imports style

**Ruby**:
- Formatters: `.rubocop.yml`
- Tools: RuboCop, Standard
- Extract: indent, quotes, line length

**PHP**:
- Formatters: `phpcs.xml`, `.php-cs-fixer.php`, `phpstan.neon`
- Tools: PHP-CS-Fixer, PHPCS, PHPStan
- Extract: indent, line length, PSR standards

**Swift**:
- Formatters: `.swiftformat`, `.swiftlint.yml`
- Tools: SwiftFormat, SwiftLint
- Extract: indent, line length, whitespace rules

**Kotlin**:
- Formatters: `.editorconfig`, `ktlint.gradle`
- Tools: ktlint, detekt
- Extract: indent, line length, import order

**Elixir**:
- Formatters: `.formatter.exs` (built-in)
- Linters: `.credo.exs`
- Tools: mix format, Credo

**Scala**:
- Formatters: `.scalafmt.conf`
- Linters: `scalastyle-config.xml`
- Tools: Scalafmt, Scalastyle

**C. Extract Common Rules**:
- Indent size (spaces or tabs)
- Quote style (single, double)
- Line length/max width
- Trailing commas
- Semicolons (where optional)
- Import/use statement ordering
- Brace style (K&R, Allman, etc.)
- Whitespace rules

**Output**:
```json
{
  "formatters": {
    "typescript": "Prettier",
    "python": "Black",
    "go": "gofmt"
  },
  "linters": {
    "typescript": "ESLint",
    "python": "Flake8",
    "go": "golangci-lint"
  },
  "rules": {
    "indent": 2,
    "indent_style": "spaces",
    "quotes": "single",
    "semicolons": false,
    "line_length": 100,
    "trailing_comma": true
  },
  "config_files": [".prettierrc", "pyproject.toml", ".editorconfig"]
}
```

#### **8. Dependency Management**

**Detection Method**:
- Check for lockfiles: `package-lock.json`, `pnpm-lock.yaml`, `poetry.lock`, `Cargo.lock`
- Look for version pinning patterns in `package.json`, `requirements.txt`
- Find dependency constraints: `peerDependencies`, `optionalDependencies`

**Output**:
```json
{
  "lockfile": "pnpm-lock.yaml",
  "pinning_strategy": "exact versions",
  "monorepo_deps": "workspace protocol"
}
```

#### **9. Git Workflow**

**Detection Method**:
- Read `.github/` or `.gitlab/` for CI/CD configs
- Check for branch protection rules in README or CONTRIBUTING
- Search for commit message patterns in recent history: `git log --oneline -50`
- Look for PR templates: `.github/pull_request_template.md`

**Output**:
```json
{
  "branch_strategy": "feature branches + main",
  "commit_format": "Conventional Commits",
  "pr_template": true,
  "required_checks": ["tests", "lint", "type-check"]
}
```

#### **10. Documentation Patterns**

**Detection Method** (Language-Agnostic):

**A. Detect Documentation Style by Language**:

**JavaScript/TypeScript**:
- Style: `/** JSDoc */`, `/* Block */`, `// Inline`
- Generators: `typedoc`, `jsdoc`, `documentation.js`, `tsdoc`
- Config: `typedoc.json`, `jsdoc.json`

**Python**:
- Style: `"""Docstring"""`, `'''Docstring'''`, `# Comment`
- Formats: Google, NumPy, Sphinx/reStructuredText
- Generators: `sphinx`, `mkdocs`, `pdoc3`, `pydoc`
- Config: `conf.py`, `mkdocs.yml`, `docs/`

**Java**:
- Style: `/** Javadoc */`, `/* Block */`, `// Inline`
- Generators: `javadoc` (built-in), `dokka` (Kotlin)
- Config: `pom.xml` (maven-javadoc-plugin), `build.gradle`

**C#**:
- Style: `/// XML doc`, `/** */`, `// Inline`
- Generators: DocFX, Sandcastle, Doxygen
- Config: `.csproj` (GenerateDocumentationFile), `docfx.json`

**Go**:
- Style: `// Godoc comments` (above declarations)
- Generator: `godoc`, `pkgsite` (built-in)
- Convention: Comment starts with symbol name

**Rust**:
- Style: `/// Rustdoc`, `//! Module doc`, `/** Block */`
- Generator: `cargo doc` (rustdoc, built-in)
- Config: `Cargo.toml` [package.documentation]

**Ruby**:
- Style: `# YARD comment`, `=begin rdoc`, `# Comment`
- Generators: YARD, RDoc
- Config: `.yardopts`, `rdoc.yml`

**PHP**:
- Style: `/** PHPDoc */`, `/* Block */`, `// Inline`
- Generators: phpDocumentor, Sami, Doxygen
- Config: `phpdoc.xml`, `sami.php`

**Swift**:
- Style: `/// Swift doc`, `/** Block */`, `// Inline`
- Generator: `swift doc`, jazzy
- Config: `.jazzy.yaml`

**Kotlin**:
- Style: `/** KDoc */`, `/* Block */`, `// Inline`
- Generator: Dokka
- Config: `dokka.gradle.kts`

**Elixir**:
- Style: `@moduledoc`, `@doc`, `# Comment`
- Generator: ExDoc (built-in with mix)
- Config: `mix.exs` [docs: []]

**Scala**:
- Style: `/** Scaladoc */`, `/* Block */`, `// Inline`
- Generator: `scaladoc` (built-in)
- Config: `build.sbt`

**C/C++**:
- Style: `/** Doxygen */`, `/// Qt-style`, `/* Block */`
- Generators: Doxygen, Sphinx (Breathe), Natural Docs
- Config: `Doxyfile`, `doxygen.conf`

**B. Count Documentation Coverage**:
- Sample functions/classes across codebase
- Count: documented vs undocumented public APIs
- Check for missing parameter descriptions
- Calculate coverage percentage

**C. Find Documentation Generators**:
- Check for config files (see above per language)
- Look for `docs/` directory with generated HTML
- Check CI/CD for doc generation steps
- Find documentation deployment (GitHub Pages, Read the Docs, etc.)

**D. Find Architecture Documentation**:
- `docs/` or `documentation/` directory
- `ARCHITECTURE.md`, `DESIGN.md`, `CONTRIBUTING.md`
- `README.md` (project overview)
- ADRs (Architecture Decision Records): `docs/adr/`, `architecture/decisions/`
- API documentation: `openapi.yaml`, `swagger.json`, `api/`
- Diagrams: `.drawio`, `.mermaid`, `.puml` (PlantUML)

**E. Check Documentation Standards**:
- All public APIs documented?
- Examples provided?
- Changelog maintained? (`CHANGELOG.md`)
- Version documentation?
- Inline code examples in docs?

**Output**:
```json
{
  "styles": {
    "typescript": "JSDoc",
    "python": "Google Docstrings",
    "go": "Godoc"
  },
  "coverage": {
    "typescript": "62%",
    "python": "78%",
    "go": "85%"
  },
  "generators": ["TypeDoc", "Sphinx", "godoc"],
  "arch_docs": {
    "readme": true,
    "architecture": true,
    "contributing": true,
    "adr": true,
    "changelog": true
  },
  "deployment": "GitHub Pages"
}
```

### A2. Pattern Extraction & Conflict Resolution

For each category analyzed:

1. **If pattern is clear** (>80% consistency):
   - Mark as `✓ Clear: <pattern>`
   - Auto-include in constitution

2. **If pattern is inconsistent** (mix of approaches):
   - Mark as `⚠️ Conflict: <dominant pattern> (X%) vs <alternative> (Y%)`
   - If `--interactive` flag: Ask user which to standardize on
   - If no `--interactive`: Use dominant pattern + add note

3. **If no pattern detected**:
   - Mark as `❓ Not Found`
   - If `--interactive`: Ask user to define
   - If no `--interactive`: Skip this principle

**Conflict Resolution Format**:
```
⚠️ Naming Convention Conflict Detected:

Current usage:
  - kebab-case.ts: 45 files (75%)
  - PascalCase.tsx: 12 files (20%)
  - camelCase.js: 3 files (5%)

Which should be the standard going forward?

A. kebab-case.ts (Recommended - matches 75% of existing files)
B. PascalCase.tsx
C. Custom rule (please specify)

Reply: [A/B/C or description]
```

### A3. Constitution Generation from Discovered Patterns

Generate constitution structured as:

```markdown
# [Project Name] Constitution

<!-- DISCOVERY METADATA
Generated: [ISO date]
Analysis: [X files, Y directories, Z configs]
Mode: Discovery + [Interactive/Auto]
Confidence: [Overall %]
-->

## Core Principles

### I. [Architecture Pattern] (PRESERVE EXISTING)
- **Pattern**: [Detected structure, e.g., "Feature-based modules"]
- **Implementation**:
  - [Specific rules extracted from codebase]
  - [Directory structure requirements]
  - [Cross-module dependency rules]
- **Rationale**: This structure found consistently across [N] existing modules
- **Status**: ✓ Clear (89% consistency)

### II. [Tech Stack Standards] (CODIFIED)
- **Languages**: [Primary language(s)]
- **Frameworks**: [Framework(s) + versions]
- **Build Tools**: [Build tool(s)]
- **Rationale**: Established stack from package.json and build configs
- **Status**: ✓ Clear

### III. [Testing Standards] (DISCOVERED)
- **Framework**: [Test framework]
- **Coverage Target**: [X%] (current: [Y%])
- **Organization**: [Co-located / Separate]
- **Rationale**: Current testing pattern found in [N] test files
- **Status**: ✓ Clear

### IV. [Naming Conventions] (STANDARDIZED)
- **Files**: [Pattern with %]
- **Functions/Variables**: [Pattern with %]
- **Types/Interfaces**: [Pattern with %]
- **Rationale**: [Dominant pattern %] of existing files follow this
- **Status**: ⚠️ Standardizing (was mixed)

### V. [Error Handling] (PRESERVE EXISTING)
- **Pattern**: [Detected error handling approach]
- **Rules**: [Specific implementation details]
- **Rationale**: Pattern used in [N] locations
- **Status**: ✓ Clear

[... additional principles based on discoveries ...]

## Governance

- **Constitution Version**: 1.0.0 (Initial from discovery)
- **Generated From**: Codebase analysis on [date]
- **Confidence Level**: [Overall %]
- **Amendments**: Follow standard constitution amendment process
- **Validation**: New code MUST follow discovered patterns unless explicitly amended

**Version**: 1.0.0 | **Generated**: [date] | **Last Amended**: [date]
```

### A4. Write Constitution & Continue to Section C

After generating constitution from discovered patterns:
1. Write to `.specify/memory/constitution.md`
2. Skip to **Section C: Consistency Propagation** (shared with Template Mode)

---

## Section B: Template Mode (Default)

**Purpose**: Start from template and fill via user input or inference.

Follow this execution flow:

1. Load the existing constitution at `.specify/memory/constitution.md`.
   - Identify every placeholder token of the form `[ALL_CAPS_IDENTIFIER]`.
   **IMPORTANT**: The user might require less or more principles than the ones used in the template. If a number is specified, respect that - follow the general template. You will update the doc accordingly.

2. Collect/derive values for placeholders:
   - If user input (conversation) supplies a value, use it.
   - Otherwise infer from existing repo context (README, docs, prior constitution versions if embedded).
   - For governance dates: `RATIFICATION_DATE` is the original adoption date (if unknown ask or mark TODO), `LAST_AMENDED_DATE` is today if changes are made, otherwise keep previous.
   - `CONSTITUTION_VERSION` must increment according to semantic versioning rules:
     - MAJOR: Backward incompatible governance/principle removals or redefinitions.
     - MINOR: New principle/section added or materially expanded guidance.
     - PATCH: Clarifications, wording, typo fixes, non-semantic refinements.
   - If version bump type ambiguous, propose reasoning before finalizing.

3. Draft the updated constitution content:
   - Replace every placeholder with concrete text (no bracketed tokens left except intentionally retained template slots that the project has chosen not to define yet—explicitly justify any left).
   - Preserve heading hierarchy and comments can be removed once replaced unless they still add clarifying guidance.
   - Ensure each Principle section: succinct name line, paragraph (or bullet list) capturing non‑negotiable rules, explicit rationale if not obvious.
   - Ensure Governance section lists amendment procedure, versioning policy, and compliance review expectations.

4. Continue to **Section C: Consistency Propagation** (below)

---

## Section C: Consistency Propagation (Shared by Both Modes)

After generating or updating the constitution (from either Discovery or Template mode), ensure consistency across all spec-kit artifacts.

### C1. Template Alignment Check

Read and update the following templates to align with constitution principles:

#### **1. Plan Template** (`.specify/templates/plan-template.md`)
- Check "Constitution Check" section exists
- Ensure all principles from constitution are validated in plan phase
- Update principle names if changed
- Add new principles to validation checklist

#### **2. Spec Template** (`.specify/templates/spec-template.md`)
- Verify required sections match constitution requirements
- Update scope/requirements alignment rules
- Add any new mandatory sections
- Remove deprecated sections

#### **3. Tasks Template** (`.specify/templates/tasks-template.md`)
- Ensure task categorization reflects principle-driven task types
- Update task format if constitution requires new traceability
- Add phases for new principles (e.g., observability, versioning gates)
- Remove task types for deprecated principles

#### **4. Command Files** (`.claude/commands/speckit.*.md`)
- Verify no outdated agent-specific references remain
- Update principle references if names changed
- Ensure all commands respect new constraints

#### **5. Runtime Guidance** (`README.md`, `docs/`)
- Update principle references in documentation
- Add examples for new principles
- Update getting started guides

### C2. Produce Sync Impact Report

Generate a report as an HTML comment and prepend to the constitution file:

```html
<!--
CONSTITUTION UPDATE REPORT
Generated: [ISO timestamp]
Mode: [Discovery/Template/Hybrid]

VERSION CHANGE: [old version] → [new version]
Bump Type: [MAJOR/MINOR/PATCH]
Rationale: [Why this bump type]

MODIFIED PRINCIPLES:
- [Old Title] → [New Title] (renamed)
- [Principle Name]: [What changed]

ADDED SECTIONS:
- [Section Name]: [Purpose]

REMOVED SECTIONS:
- [Section Name]: [Reason for removal]

TEMPLATE UPDATES:
✅ plan-template.md: Updated constitution check
✅ spec-template.md: No changes needed
⚠️  tasks-template.md: Manual review needed for [reason]
✅ commands/*.md: Updated principle references
⚠️  README.md: Pending - add examples for [new principle]

DEFERRED ITEMS:
- TODO(RATIFICATION_DATE): Original adoption date unknown
- TODO(CUSTOM_FIELD): Awaiting user input on [topic]

CONFIDENCE METRICS (Discovery Mode only):
- Overall: [X%]
- Clear patterns: [N/total]
- Conflicts resolved: [N]
- Manual inputs: [N]
-->
```

### C3. Validation Before Finalize

Run these checks before writing the final constitution:

1. **No unexplained bracket tokens** `[PLACEHOLDER]` remain (except intentional TODOs)
2. **Version line** at bottom matches report
3. **Dates** in ISO format `YYYY-MM-DD`
4. **Principles are declarative**: Use MUST/SHOULD/MAY with rationale
5. **Testable statements**: Every principle can be validated
6. **No vague language**: Replace "robust", "scalable", "intuitive" with specific criteria

### C4. Write Constitution

Write the completed constitution to `.specify/memory/constitution.md` (overwrite existing).

### C5. Output Final Summary

Present to the user:

```markdown
## Constitution Update Complete

**Mode**: [Discovery/Template/Hybrid]
**Version**: [old] → [new] ([MAJOR/MINOR/PATCH])
**Rationale**: [Why this version bump]

### Summary of Changes

**Principles**:
- ✓ [N] principles codified
- ⚠️ [N] conflicts resolved
- ❌ [N] patterns not detected (manual input needed)

**Template Updates**:
- ✅ [template name]: [what changed]
- ⚠️ [template name]: Manual review needed

**Follow-up Actions** (if any):
- [ ] Review and resolve TODO items in constitution
- [ ] Add examples for [new principle] to README
- [ ] Update team documentation with new standards

### Discovery Confidence (if --discover mode):
- **Overall**: [X%]
- **Clear Patterns**: [N/total categories]
- **Resolved Conflicts**: [N]
- **Manual Inputs**: [N]

### Files Updated:
- `.specify/memory/constitution.md`
- `.specify/templates/plan-template.md`
- `.specify/templates/spec-template.md`
- `.specify/templates/tasks-template.md`

### Suggested Commit Message:
```
docs: update constitution to v[X.Y.Z]

[Discovery/Template] mode: [brief description of changes]

- [Key change 1]
- [Key change 2]
- [Key change 3]
```

### Next Steps:
- Review the updated constitution at `.specify/memory/constitution.md`
- Run `/speckit.specify` to create a spec that follows new principles
- Run `/speckit.plan` to validate against updated constitution
```


---

## Formatting & Style Requirements

- Use Markdown headings exactly as in the template (do not demote/promote levels)
- Wrap long rationale lines to keep readability (<100 chars ideally)
- Keep a single blank line between sections
- Avoid trailing whitespace
- Add HTML comment header with sync report at top of file

## Special Cases

- **Partial updates**: If user supplies only one principle revision, still perform full validation and version decision
- **Missing info**: If critical info missing (e.g., ratification date unknown), insert `TODO(<FIELD_NAME>): explanation` and flag in Sync Impact Report
- **Existing constitution**: Always operate on `.specify/memory/constitution.md`, never create a new template
- **Discovery conflicts**: When patterns conflict, prefer dominant pattern (>50%) unless user specifies otherwise

## Discovery Mode Tips

**Best Practices**:
- Run discovery on stable codebases (not during major refactoring)
- Review and approve conflict resolutions before finalizing
- Use `--interactive` flag to review every category
- Re-run discovery after major architectural changes

**Limitations**:
- Discovery cannot detect unwritten policies (e.g., "always get security review")
- Small codebases (<10 files) may not have clear patterns
- Mixed-language projects may have conflicting conventions
- Discovery finds "what is", not "what should be" - use judgment
