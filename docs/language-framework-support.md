# Language & Framework Support

## Overview

The `/speckit.constitution --discover` mode is **language and framework agnostic**. It analyzes your codebase regardless of the technology stack and extracts patterns from what actually exists in your project.

This document lists the languages, frameworks, and tools that discovery mode can detect and analyze.

---

## Supported Languages

Discovery mode detects languages by file extensions and analyzes their specific conventions:

| Language | File Extensions | Package Manager | Test Framework Detection | Linting/Formatting |
|----------|----------------|-----------------|-------------------------|-------------------|
| **JavaScript** | `.js`, `.mjs`, `.cjs` | npm, yarn, pnpm, bun | Jest, Mocha, AVA, Tape | ESLint, Prettier |
| **TypeScript** | `.ts`, `.tsx`, `.mts`, `.cts` | npm, yarn, pnpm, bun | Vitest, Jest, Mocha | ESLint, Prettier, TSLint |
| **Python** | `.py`, `.pyw`, `.pyx` | pip, poetry, pipenv, conda | Pytest, unittest, nose2 | Black, Flake8, Pylint, isort |
| **Java** | `.java` | Maven, Gradle, Ant | JUnit, TestNG, Spock | Checkstyle, PMD, SpotBugs |
| **C#** | `.cs`, `.csx` | NuGet, dotnet | xUnit, NUnit, MSTest | StyleCop, Roslyn |
| **Go** | `.go` | go mod | testing (built-in), testify | gofmt, golangci-lint |
| **Rust** | `.rs` | Cargo | cargo test (built-in) | rustfmt, clippy |
| **Ruby** | `.rb`, `.rake` | Bundler, RubyGems | RSpec, Minitest | RuboCop |
| **PHP** | `.php` | Composer | PHPUnit, Pest, Codeception | PHP-CS-Fixer, PHPCS |
| **Swift** | `.swift` | Swift PM, CocoaPods, Carthage | XCTest, Quick, Nimble | SwiftFormat, SwiftLint |
| **Kotlin** | `.kt`, `.kts` | Gradle, Maven | JUnit, Kotest | ktlint, detekt |
| **Scala** | `.scala` | sbt, Maven | ScalaTest, Specs2 | Scalafmt, Scalastyle |
| **Dart** | `.dart` | pub | dart test (built-in) | dartfmt (built-in) |
| **Elixir** | `.ex`, `.exs` | mix | ExUnit (built-in) | mix format (built-in) |
| **Clojure** | `.clj`, `.cljs`, `.cljc` | Leiningen, deps.edn | clojure.test, Midje | cljfmt |
| **C/C++** | `.c`, `.cpp`, `.cc`, `.h`, `.hpp` | CMake, Make, Conan | Google Test, Catch2 | clang-format, cpplint |

---

## Framework Detection

Discovery detects frameworks from dependency manifests (package.json, requirements.txt, etc.):

### JavaScript/TypeScript Frameworks

**Frontend**:
- React (+ Next.js, Remix, Gatsby)
- Vue (+ Nuxt, Vite)
- Angular
- Svelte (+ SvelteKit)
- Solid (+ SolidStart)
- Preact
- Lit
- Alpine.js

**Backend**:
- Express
- Fastify
- Koa
- Hapi
- NestJS
- Elysia
- tRPC

**Full-Stack**:
- Next.js
- Nuxt
- Remix
- SvelteKit
- Astro
- Qwik

**Mobile**:
- React Native
- Ionic
- Capacitor

### Python Frameworks

**Web**:
- Django
- Flask
- FastAPI
- Tornado
- Pyramid
- Bottle
- Falcon
- Quart
- Sanic

**Data Science**:
- NumPy
- Pandas
- Scikit-learn
- TensorFlow
- PyTorch

### Java/JVM Frameworks

**Java**:
- Spring Boot / Spring Framework
- Micronaut
- Quarkus
- Dropwizard
- Vert.x
- Play Framework

**Kotlin**:
- Ktor
- Spring Boot (Kotlin)

**Scala**:
- Akka
- Play Framework
- ZIO

### .NET Frameworks

- ASP.NET Core
- Entity Framework
- Blazor
- MAUI
- Xamarin
- WPF
- WinForms

### Go Frameworks

- Gin
- Echo
- Fiber
- Chi
- Gorilla
- Beego
- Revel
- Buffalo

### Rust Frameworks

- Actix-web
- Rocket
- Warp
- Axum
- Tide
- Poem

### Ruby Frameworks

- Ruby on Rails
- Sinatra
- Hanami
- Roda
- Grape
- Padrino

### PHP Frameworks

- Laravel
- Symfony
- CodeIgniter
- Slim
- Lumen
- Yii
- CakePHP

### Swift Frameworks

- Vapor
- Kitura
- Perfect
- SwiftUI (iOS)
- UIKit (iOS)

### Elixir Frameworks

- Phoenix
- Plug
- Nerves

---

## Build Tool Detection

Discovery identifies build tools from config files:

| Build Tool | Languages | Config Files |
|------------|-----------|--------------|
| **Vite** | JS/TS | `vite.config.js/ts` |
| **Webpack** | JS/TS | `webpack.config.js` |
| **Rollup** | JS/TS | `rollup.config.js` |
| **esbuild** | JS/TS | `esbuild.config.js` |
| **Turbopack** | JS/TS | `turbo.json` |
| **Parcel** | JS/TS | `.parcelrc` |
| **Maven** | Java | `pom.xml` |
| **Gradle** | Java/Kotlin | `build.gradle`, `build.gradle.kts` |
| **sbt** | Scala | `build.sbt` |
| **Cargo** | Rust | `Cargo.toml` |
| **go build** | Go | `go.mod` |
| **MSBuild** | C# | `*.csproj`, `*.sln` |
| **CMake** | C/C++ | `CMakeLists.txt` |
| **Make** | C/C++/Multi | `Makefile` |
| **Bazel** | Multi | `BUILD`, `WORKSPACE` |
| **Poetry** | Python | `pyproject.toml` |
| **Bundler** | Ruby | `Gemfile` |
| **Composer** | PHP | `composer.json` |
| **Swift PM** | Swift | `Package.swift` |
| **mix** | Elixir | `mix.exs` |

---

## Test Framework Detection

Discovery finds test frameworks by searching for:
- Test file patterns
- Config files
- Dependencies in manifests

### By Language

**JavaScript/TypeScript**:
- Vitest, Jest, Mocha, Jasmine, AVA, Tape, uvu
- E2E: Cypress, Playwright, Puppeteer, TestCafe, WebdriverIO

**Python**:
- Pytest, unittest, nose2, doctest, Hypothesis, Robot Framework
- BDD: Behave, lettuce

**Java**:
- JUnit (4/5), TestNG, Spock, Mockito, AssertJ, Hamcrest

**C#**:
- xUnit, NUnit, MSTest, SpecFlow, Shouldly

**Go**:
- testing (built-in), testify, ginkgo, gomega, gocheck

**Rust**:
- cargo test (built-in), rstest, proptest, quickcheck

**Ruby**:
- RSpec, Minitest, test-unit, Cucumber, Capybara

**PHP**:
- PHPUnit, Pest, Codeception, Behat, PHPSpec

**Swift**:
- XCTest (built-in), Quick, Nimble

**Kotlin**:
- JUnit, Kotest, Spek, MockK

**Elixir**:
- ExUnit (built-in)

**Scala**:
- ScalaTest, Specs2, uTest

---

## Linter & Formatter Detection

Discovery reads config files to detect code style tools:

### Universal
- **EditorConfig** (`.editorconfig`) - Works with all languages

### JavaScript/TypeScript
- **Formatters**: Prettier, dprint
- **Linters**: ESLint, TSLint (deprecated), Biome, Rome (deprecated)
- **Type Checkers**: TypeScript compiler, Flow

### Python
- **Formatters**: Black, autopep8, yapf, isort, Blue
- **Linters**: Flake8, Pylint, Pyflakes, pycodestyle, Ruff
- **Type Checkers**: mypy, Pyright, Pyre

### Java
- **Formatters**: Google Java Format, Eclipse Formatter
- **Linters**: Checkstyle, PMD, SpotBugs, Error Prone

### C#
- **Formatters**: Built-in (via .editorconfig)
- **Linters**: StyleCop, Roslyn Analyzers, FxCop

### Go
- **Formatters**: gofmt (standard), goimports, gofumpt
- **Linters**: golangci-lint (meta-linter), staticcheck, revive

### Rust
- **Formatters**: rustfmt (standard)
- **Linters**: clippy (standard), cargo-audit

### Ruby
- **Formatters**: RuboCop, Standard
- **Linters**: RuboCop, Reek, Brakeman (security)

### PHP
- **Formatters**: PHP-CS-Fixer, PHPCS
- **Linters**: PHPStan, Psalm, PHPCS, PHP_CodeSniffer

### Swift
- **Formatters**: SwiftFormat
- **Linters**: SwiftLint

### Kotlin
- **Formatters**: ktlint
- **Linters**: detekt, ktlint

### Elixir
- **Formatters**: mix format (built-in)
- **Linters**: Credo, Dialyzer

### Scala
- **Formatters**: Scalafmt
- **Linters**: Scalastyle, WartRemover, Scalafix

---

## Documentation Generator Detection

Discovery finds documentation tools from:
- Config files
- Dependencies
- `docs/` directory structure

### By Language

| Language | Generators Detected |
|----------|-------------------|
| **JavaScript/TypeScript** | TypeDoc, JSDoc, documentation.js, TSDoc, API Extractor |
| **Python** | Sphinx, MkDocs, pdoc3, pydoc, Read the Docs |
| **Java** | Javadoc (built-in), Dokka (for Kotlin) |
| **C#** | DocFX, Sandcastle, Doxygen, XML docs |
| **Go** | godoc, pkgsite (both built-in) |
| **Rust** | rustdoc (cargo doc, built-in) |
| **Ruby** | YARD, RDoc |
| **PHP** | phpDocumentor, Sami, Doxygen |
| **Swift** | swift doc, jazzy |
| **Kotlin** | Dokka |
| **Elixir** | ExDoc (built-in with mix) |
| **Scala** | Scaladoc (built-in) |
| **C/C++** | Doxygen, Sphinx (Breathe), Natural Docs |

---

## Project Structure Patterns

Discovery recognizes these common organizational patterns:

### Monorepo Patterns
- **Nx** - Detects: `nx.json`, `workspace.json`
- **Turborepo** - Detects: `turbo.json`
- **Lerna** - Detects: `lerna.json`
- **pnpm Workspaces** - Detects: `pnpm-workspace.yaml`
- **Yarn Workspaces** - Detects: `package.json` with `workspaces`
- **npm Workspaces** - Detects: `package.json` with `workspaces`
- **Gradle Multi-project** - Detects: `settings.gradle` with subprojects
- **Maven Multi-module** - Detects: parent `pom.xml` with modules

### Architecture Patterns
- **Feature-based**: `src/features/<feature>/{components,hooks,stores}`
- **Layered**: `src/{controllers,services,repositories,models}`
- **Domain-Driven**: `src/{domain,application,infrastructure}`
- **Hexagonal**: `src/{core,adapters,ports}`
- **Microservices**: Multiple service directories (`services/`, `apps/`)
- **Library/Package**: Single focused purpose with clear exports

---

## Git Workflow Detection

Discovery analyzes Git configuration from:

### CI/CD Platforms
- **GitHub Actions** - `.github/workflows/*.yml`
- **GitLab CI** - `.gitlab-ci.yml`
- **Jenkins** - `Jenkinsfile`
- **CircleCI** - `.circleci/config.yml`
- **Travis CI** - `.travis.yml`
- **Azure Pipelines** - `azure-pipelines.yml`
- **Bitbucket Pipelines** - `bitbucket-pipelines.yml`

### Workflow Elements
- **Branch Strategy**: Inferred from CI config and commit history
- **Commit Format**: Detected from `git log` (Conventional Commits, etc.)
- **PR Templates**: `.github/pull_request_template.md`, `.gitlab/merge_request_templates/`
- **Required Checks**: Parsed from CI config files

---

## Edge Cases & Limitations

### Multi-Language Projects

For projects with multiple languages (e.g., TypeScript frontend + Python backend):
- Discovery analyzes **all languages** found
- Each language gets separate pattern detection
- Constitution includes principles for each language
- Conflicts between language standards are flagged

**Example Output**:
```markdown
### III. Code Style Standards (MULTI-LANGUAGE)

**TypeScript** (Frontend):
- Prettier formatting: 2-space indent, single quotes, no semicolons
- ESLint for linting
- Config: `.prettierrc`, `.eslintrc`

**Python** (Backend):
- Black formatting: 88-char line length
- Flake8 for linting
- Config: `pyproject.toml`

**Rationale**: Each language follows its ecosystem's standard practices
```

### Legacy Codebases

For projects with inconsistent patterns:
- Discovery flags conflicts (e.g., "60% kebab-case, 40% camelCase")
- Asks user to choose standard (interactive mode)
- Documents decision in constitution
- New code must follow chosen standard

### Minimal Codebases

For projects with <10 files:
- May not have enough data for pattern detection
- Falls back to asking user or using language defaults
- Recommends using Template Mode instead

---

## Adding New Language Support

Discovery is designed to be extensible. The detection logic follows these principles:

1. **File Extensions**: Add to language detection list
2. **Package Managers**: Add manifest file patterns
3. **Test Patterns**: Add test file naming conventions
4. **Linting Configs**: Add config file detection
5. **Documentation**: Add doc generator detection

If your language/framework isn't detected, it will:
- Still analyze file naming patterns
- Still detect Git workflow
- Still find universal configs (.editorconfig)
- Mark language-specific items as "Not Detected"

You can then manually add those principles using Template Mode or by editing the constitution after discovery.

---

## Best Practices by Ecosystem

### Web Development (JS/TS)
- Expect detection of: React/Vue/Angular, Vite/Webpack, Vitest/Jest
- Common patterns: Feature-based structure, component co-location
- Strong formatter opinions: Prettier widely used

### Backend Services (Python/Java/Go)
- Expect detection of: Framework (Flask/Spring/Gin), test framework
- Common patterns: Layered architecture, DDD
- Strong type-checking in typed languages

### Mobile Development (Swift/Kotlin)
- Expect detection of: iOS/Android patterns, XCTest/JUnit
- Common patterns: MVVM, Clean Architecture
- Platform-specific conventions

### Systems Programming (Rust/C++)
- Expect detection of: Cargo/CMake, cargo test/Google Test
- Common patterns: Clear module boundaries
- Strong safety guarantees in Rust

---

## Support Matrix

| Feature | Coverage |
|---------|----------|
| **Languages** | 15+ major languages |
| **Frameworks** | 50+ web/backend/mobile frameworks |
| **Build Tools** | 20+ build systems |
| **Test Frameworks** | 30+ testing tools |
| **Linters/Formatters** | 40+ code quality tools |
| **Doc Generators** | 15+ documentation systems |
| **Package Managers** | 20+ dependency managers |
| **CI/CD Platforms** | 7+ major platforms |

---

## Future Additions

We're continuously expanding language support. If your language/framework isn't listed, it may still work - discovery is designed to be resilient and will extract what it can from any codebase structure.

To request support for a new language/framework, open an issue with:
- Language/framework name
- Typical file extensions
- Package manager file names
- Test file patterns
- Linting/formatting config files
