# FinSight Technical Implementation Breakdown

## 1) Repository and Runtime Topology

This project is a two-application monorepo:

- `backend/`: TypeScript Node.js API service (Express + Mongoose).
- `client/`: React + TypeScript SPA (Vite + Redux Toolkit + RTK Query).

### Runtime split

- **Backend** is responsible for authentication, transaction CRUD, analytics aggregation, recurring transaction processing, and monthly AI-enhanced reporting.
- **Frontend** handles route protection, auth/session state persistence, API orchestration via RTK Query, and data-heavy dashboards/tables.

---

## 2) Backend Architecture (Implementation-Level)

## 2.1 Bootstrapping and middleware chain

Code entrypoint: `backend/src/index.ts`

Request lifecycle:

1. `express.json()` / `express.urlencoded()` parse body.
2. `passport.initialize()` enables JWT auth strategy globally.
3. `cors({...})` allows cross-origin frontend with credentials.
4. Route modules mounted under `Env.BASE_PATH`:
   - `/auth`
   - `/user`
   - `/transaction`
   - `/report`
   - `/analytics`
5. Protected routes use `passportAuthenticateJwt` middleware.
6. `errorHandler` centralizes exception -> HTTP conversion.
7. Server startup triggers DB connection and cron initialization (development only).

### Modules and why they were chosen

- `express`: minimal, composable HTTP framework with explicit middleware chain.
- `passport` + `passport-jwt`: battle-tested strategy abstraction for bearer token auth.
- `cors`: straightforward browser cross-origin policy management.
- `dotenv`: environment config loading at boot.

---

## 2.2 Configuration system

- `backend/src/config/env.config.ts`: environment variable mapping using `getEnv` helper.
- `backend/src/config/database.config.ts`: Mongoose connection with tuned timeouts:
  - `serverSelectionTimeoutMS: 8000`
  - `socketTimeoutMS: 45000`
  - `connectTimeoutMS: 30000`

### Why this setup

- Centralized env resolution prevents ad hoc `process.env` usage.
- Explicit timeout values reduce indefinite hangs and speed failure detection under network/database issues.

---

## 2.3 API layering pattern

The backend follows a clear **route → controller → service → model** layering:

- **Routes** map URL + HTTP verb to controller (e.g., `transaction.route.ts`).
- **Controllers** parse request, validate input, and format response.
- **Services** implement business logic and persistence operations.
- **Models** define schema constraints and document behavior.

### Design patterns used

- **Service Layer Pattern**: business rules in `src/services/*.service.ts`.
- **Repository-like use via Mongoose models**: data access concentrated in service methods.
- **Middleware Pattern**: auth, async exception capture, error normalization.
- **DTO/Schema Validation Pattern** (runtime): Zod schemas per feature.

---

## 2.4 Validation and error handling strategy

### Validation

- Library: `zod`
- Files: `src/validators/*.validator.ts`
- Applied in controllers (e.g., `createTransactionSchema.parse(req.body)`)

Why `zod`:

- Runtime safety for untrusted JSON input.
- Type inference (`z.infer`) keeps TS types synchronized with validation contracts.

### Error normalization

- `AppError` hierarchy in `src/utils/app-error.ts`
- `errorHandler` middleware handles:
  - `ZodError` → structured 400 with field messages
  - `MulterError` → file upload-specific messages
  - `AppError` subclasses → semantic status code + error code
  - unknown errors → 500 fallback

Why this design:

- Centralized exception-to-response policy yields predictable API behavior and cleaner controller code.

---

## 2.5 Authentication and authorization

### Implementation

- `passport-jwt` extracts token from `Authorization: Bearer <token>`
- `JwtStrategy` verifies HS256 token + audience `user`
- User hydration via `findByIdUserService(payload.userId)`

### Token generation

- `src/utils/jwt.ts` uses `jsonwebtoken`
- Returns both token and `expiresAt` (derived from decoded payload) to support frontend expiration logic.

### Password management

- `bcrypt` used through utility wrappers (`src/utils/bcrypt.ts`)
- Password hash is enforced in `User` model pre-save hook.

Why these libraries:

- `jsonwebtoken` and `bcrypt` are standard, audited choices with broad ecosystem support.
- `passport-jwt` avoids custom token parsing/auth edge-case handling.

---

## 2.6 Database design and interaction model

Database: MongoDB via `mongoose`

### Core models

1. `User`
   - unique email, hashed password, optional profilePicture.
   - instance methods: `comparePassword`, `omitPassword`.

2. `Transaction`
   - user ownership (`userId` ref), category/type/payment metadata.
   - monetary amount stored in cents using schema setter (`convertToCents`) and read using getter (`convertToDollarUnit`).
   - recurring fields: `isRecurring`, `recurringInterval`, `nextRecurringDate`, `lastProcessed`.

3. `ReportSetting`
   - per-user report scheduling configuration.

4. `Report`
   - report history and send status tracking.

### Query patterns

- CRUD with ownership filter (`userId`) for tenant isolation.
- Pagination via `skip/limit` + `countDocuments`.
- Heavy analytics/report computations with MongoDB aggregation pipelines:
  - `$match`, `$group`, `$facet`, `$project`, `$map`, `$sort`, `$limit`.
- Bulk write optimization for imports and job processing using `bulkWrite`.

Why Mongoose:

- Strong schema declaration, hooks, and document methods.
- Aggregation pipeline support for OLAP-like dashboard/report queries directly in DB.

---

## 2.7 Feature-by-feature backend technical implementation

## 2.7.1 Auth feature (`/auth/*`)

- Register (`registerService`): wrapped in MongoDB transaction session.
  - Creates user.
  - Creates default report setting atomically.
- Login (`loginService`): verifies password, signs JWT, returns profile + report setting.

Libraries used:

- `mongoose` sessions/transactions for multi-document consistency.
- `bcrypt` for password compare.
- `jsonwebtoken` for token issuance.
- `zod` for input contracts.

---

## 2.7.2 User feature (`/user/*`)

- Current user retrieval via JWT-derived identity.
- Profile updates support `profilePicture` file upload.

Libraries used:

- `multer` + `multer-storage-cloudinary` + `cloudinary` for managed image upload and hosted URL storage.

Why:

- Offloading file storage from app servers avoids local disk coupling and simplifies horizontal scaling.

---

## 2.7.3 Transactions feature (`/transaction/*`)

Capabilities:

- Create / Read / Update / Delete
- Duplicate transaction
- Bulk import
- Bulk delete
- Receipt scan to structured transaction data via AI

Implementation highlights:

- Search and filtering with regex on title/category.
- Recurrence scheduling with `calculateNextOccurrence` (`date-fns`-based helper).
- Bulk operations through `bulkWrite` and `deleteMany`.

Libraries used:

- `mongoose` for persistence and querying.
- `date-fns` for deterministic recurrence date calculations.
- `@google/genai` + `axios` for OCR-like receipt extraction flow:
  1. receipt uploaded to Cloudinary,
  2. URL fetched as binary,
  3. converted to base64,
  4. sent to Gemini model with strict JSON response requirement.

Why:

- `date-fns` avoids mutable date pitfalls and gives composable utility functions.
- `@google/genai` adds model-native multimodal understanding for receipts without implementing OCR + custom NLP pipeline in-house.

---

## 2.7.4 Analytics feature (`/analytics/*`)

Endpoints:

- `/summary`
- `/chart`
- `/expense-breakdown`

Implementation style:

- **On-demand aggregation** from `Transaction` collection at request time.
- No materialized analytics table/model found.

Aggregation techniques used:

- Conditional summation by transaction type.
- Period-over-period comparison by deriving previous window dynamically.
- Time-series grouping by date string.
- Category concentration logic (`topThree + others`) via `$facet`.

Libraries used:

- `mongoose` aggregation pipelines.
- `date-fns` (`differenceInDays`, `subDays`, `subYears`) for comparative windows.

Why this approach:

- Simplifies consistency (always reads from source-of-truth transactions).
- Faster to implement than precompute infrastructure.
- Tradeoff: query cost grows with dataset size.

---

## 2.7.5 Reports feature (`/report/*`)

Functions:

- Report history pagination
- Report setting toggle
- On-demand generation
- Scheduled generation + email delivery

Technical pipeline (`generateReportService`):

1. Aggregate transactions for period with `$facet`:
   - summary totals
   - top expense categories
2. Derive savings metrics and category percentages.
3. Prompt Gemini for machine-generated insights JSON.
4. Return consolidated report object.

Libraries used:

- `mongoose` aggregation.
- `@google/genai` for financial insight generation.
- `date-fns` for period labels.

Why:

- `$facet` allows multi-view analytics in one DB roundtrip.
- AI generation provides narrative insights beyond deterministic KPIs.

---

## 2.8 Background processing and scheduling

Files:

- `src/cron/scheduler.ts`
- `src/cron/jobs/transaction.job.ts`
- `src/cron/jobs/report.job.ts`

Scheduled jobs:

1. Recurring transaction expansion (daily 00:05 UTC).
2. Monthly report processing (1st day 02:30 UTC).

Concurrency/data integrity characteristics:

- Cursor iteration for memory-safe processing of large result sets.
- Per-item session transactions for safe multi-write operations.
- Report job uses `bulkWrite` for write batching.

Library used:

- `node-cron`

Why:

- Lightweight in-process scheduling that is easy to ship with Node runtime.

Note:

- Cron startup is currently gated to development mode in `index.ts`.

---

## 3) Frontend Architecture and Data Orchestration

## 3.1 Application shell and routing

- Router: `react-router-dom` (`client/src/routes/index.tsx`)
- Route guards:
  - `AuthRoute` (public routes)
  - `ProtectedRoute` (requires token + user)

Layout composition:

- `BaseLayout` for auth pages.
- `AppLayout` for authenticated app shell.

---

## 3.2 State and API data layer

### Core stack

- `@reduxjs/toolkit` for store/slices.
- RTK Query (`createApi`) for endpoint definitions, caching, and invalidation.
- `redux-persist` for auth state persistence.

Implementation details:

- `apiClient` uses `fetchBaseQuery` and injects bearer token from persisted auth state.
- API tags (`transactions`, `analytics`, etc.) coordinate cache invalidation.
- Mutations invalidate dependent tags to refresh stale dashboard/table data.

Why this stack:

- RTK Query removes repetitive async boilerplate.
- Predictable cache invalidation keeps analytics and lists synchronized after writes.
- Persisted auth improves UX across reloads.

---

## 3.3 Frontend feature implementations

### Auth

- `authSlice` stores token, expiration, user, reportSetting.
- `use-auth-expiration` monitors token expiry and attempts refresh flow, otherwise logs out.

Libraries used:

- Redux Toolkit slice reducers.
- RTK Query mutations for auth endpoints.

### Analytics

- `analyticsAPI.ts` defines three analytics queries with shared date-range filters.
- Dashboard composition in `pages/dashboard/*` consumes these hooks.

Libraries used:

- RTK Query for request lifecycle/caching.
- Recharts (`recharts`) for chart rendering in analytics UI components.

### Transactions

- API feature includes create/edit/delete/duplicate/list/bulk/scan.
- Table rendering via `@tanstack/react-table` in transaction table components.
- CSV import parsing likely via `react-papaparse` (dependency present and import modal exists).

### Forms and UI primitives

- `react-hook-form` + `@hookform/resolvers` + `zod` for form state + validation consistency.
- Radix UI primitives + `class-variance-authority` + `clsx` + `tailwind-merge` for composable design system.
- Tailwind CSS v4 via Vite plugin for utility-first styling.

---

## 4) End-to-End Data Flow (Concrete)

## 4.1 Example: Create Transaction → Dashboard Update

1. User submits transaction form (React form layer).
2. `useCreateTransactionMutation` calls `POST /transaction/create`.
3. Controller validates with Zod and delegates to service.
4. Service persists via Mongoose model.
5. Mutation invalidates `transactions` and `analytics` tags.
6. RTK Query re-fetches list and dashboard analytics endpoints.
7. Updated aggregate data appears without manual cache wiring.

## 4.2 Example: Receipt Scan

1. Client sends multipart/form-data with receipt file.
2. Multer + Cloudinary storage middleware uploads image and injects file metadata.
3. Service fetches uploaded image bytes via Axios.
4. Bytes are base64 encoded and submitted to Gemini model.
5. Model JSON response is parsed and returned as pre-filled transaction draft fields.

## 4.3 Example: Scheduled Monthly Report

1. Cron triggers report job.
2. Enabled report settings cursor iterates users.
3. Service aggregates period KPIs + categories.
4. AI insights generated.
5. Email sent via Resend mailer.
6. Report history/status and next schedule date updated in transactional flow.

---

## 5) API Design Characteristics

- Resource-oriented endpoint grouping by domain (`/auth`, `/transaction`, `/report`, `/analytics`).
- Authentication middleware applied at router mount level for protected domains.
- Consistent JSON response envelope with `message` and payload.
- Pagination contract standardized (`pageSize`, `pageNumber`, `totalCount`, `totalPages`).
- Query-parameter filtering for list endpoints.

Implementation notes:

- Input validation mostly controller-level via Zod.
- Error semantics encoded with custom error classes and `errorCode` enum.

---

## 6) Scalability and Performance Considerations

## 6.1 Current strengths

- DB-side aggregations avoid transferring raw rows to application tier.
- Bulk write/delete APIs reduce network roundtrips.
- Cursor-based cron processing is memory efficient.
- Cloudinary externalizes binary asset storage.
- Frontend RTK Query cache + tag invalidation minimizes redundant data fetching logic.

## 6.2 Existing bottlenecks/tradeoffs

- Analytics endpoints are computed on-demand from raw transactions (no precomputed materialized views).
- Regex filters on large transaction datasets can become expensive.
- In-process cron scheduling may be less robust than external job orchestration in multi-instance deployments.
- Potential mismatch exists between frontend auth refresh/logout endpoints and backend routes currently present.

## 6.3 Practical scaling path

1. Add compound indexes for common transaction access patterns (e.g., `userId + createdAt`, `userId + date`, `userId + type`).
2. Introduce materialized daily analytics summaries for high-volume accounts.
3. Move background scheduling to external workers/queues (e.g., BullMQ + Redis) for multi-instance safety.
4. Add response caching for expensive read-heavy analytics ranges.
5. Split AI operations into async job pipeline to protect API latency budgets.

---

## 7) Security and Reliability Implementation Notes

- Password hashing with bcrypt pre-save hook.
- JWT audience and algorithm explicitly constrained.
- Route-level JWT guard for protected resources.
- File upload restricted by MIME type and file size limit.
- Strong input validation and centralized error handling reduce invalid-state writes.
- Transaction sessions used where multi-document atomicity matters (register + default settings, recurring expansion, report status updates).

Potential hardening opportunities:

- `helmet` and `cookie-parser` are dependencies but not currently wired in `index.ts`.
- Refresh-token flow endpoints are referenced client-side but not visible in backend route set.

---

## 8) Feature-to-Library Mapping (Backend)

| Feature | Primary files | Libraries/modules | Why this choice |
|---|---|---|---|
| HTTP API routing | `src/index.ts`, `src/routes/*` | `express` | Fast, minimal, middleware-centric architecture |
| Auth strategy | `config/passport.config.ts`, `utils/jwt.ts` | `passport`, `passport-jwt`, `jsonwebtoken` | Standard JWT strategy + token signing utilities |
| Password security | `models/user.model.ts`, `utils/bcrypt.ts` | `bcrypt` | Secure one-way hashing and verification |
| Input validation | `validators/*`, controllers | `zod` | Runtime validation + TS inference |
| Persistence + aggregations | `models/*`, `services/*` | `mongoose` | Schema, hooks, transactions, aggregation API |
| Date windowing/recurrence | `utils/date.ts`, `utils/helper.ts` | `date-fns` | Reliable immutable date math |
| File uploads | `config/cloudinary.config.ts` | `multer`, `cloudinary`, `multer-storage-cloudinary` | Streamlined multipart handling + cloud storage |
| AI receipt/report insights | `services/transaction.service.ts`, `services/report.service.ts` | `@google/genai`, `axios` | Multimodal extraction + narrative insight generation |
| Scheduled jobs | `cron/*` | `node-cron` | Lightweight recurring tasks in Node process |
| Email dispatch | `mailers/*` | `resend` | API-first transactional email delivery |

---

## 9) Feature-to-Library Mapping (Frontend)

| Feature | Primary files | Libraries/modules | Why this choice |
|---|---|---|---|
| Build/dev tooling | `vite.config.ts`, scripts | `vite`, `@vitejs/plugin-react` | Fast TS/React development feedback loop |
| Routing & guards | `routes/*` | `react-router-dom` | Declarative nested routes + guard patterns |
| Global state | `app/store.ts`, `features/auth/authSlice.ts` | `@reduxjs/toolkit`, `react-redux` | Predictable state updates with minimal boilerplate |
| API data + caching | `app/api-client.ts`, feature APIs | RTK Query (`createApi`) | Endpoint abstraction, tags, cache invalidation |
| Session persistence | `app/store.ts` | `redux-persist` | Persist auth/session across reloads |
| Tables | `components/data-table/*`, transaction table | `@tanstack/react-table` | Highly flexible client-side table primitives |
| Forms | various form components | `react-hook-form`, `@hookform/resolvers`, `zod` | Performant forms + schema validation integration |
| Charts | dashboard chart components | `recharts` | Declarative React charting with composition |
| Date selection | date range components | `react-day-picker`, `date-fns` | Rich calendar UI + date utilities |
| UI primitives | `components/ui/*` | Radix UI packages, `class-variance-authority`, `clsx`, `tailwind-merge`, `tailwindcss` | Accessible primitives + composable style system |
| CSV import | transaction import modal | `react-papaparse` | Browser CSV parsing for bulk import workflows |

---

## 10) Observed Design Principles in the Codebase

1. **Separation of concerns**: API adapters, business logic, and data schemas are clearly split.
2. **Single source of truth for business validation**: Zod contracts in backend validators and typed frontend payloads.
3. **Derived-state over duplication**: analytics computed from transactional source records.
4. **Fail-fast and explicit error semantics**: custom exception hierarchy with HTTP mapping.
5. **Composable feature slices**: frontend APIs are isolated per domain and injected into shared API client.

---

## 11) Summary

Technically, FinSight is implemented as a modular TypeScript MERN-style stack with:

- Express + Mongoose backend centered on service-layer business logic and DB-side aggregations.
- JWT auth via Passport strategy and secure password hashing.
- AI-assisted features (receipt parsing + report insights) integrated into transaction/report pipelines.
- React + RTK Query frontend with tag-based cache invalidation and persisted auth state.
- Background automation via cron jobs for recurring financial events.

The implementation is already robust for SMB-scale workloads, with clear extension points for precomputed analytics, queue-backed workers, and stronger production hardening as traffic grows.
