# Aquabrim CMS

A headless CMS for the Aquabrim website.

- **`api/`** — Node + Express + PostgreSQL backend (REST API)
- **`admin/`** — React + Vite admin panel (content management UI)

The admin edits content; the API stores it in PostgreSQL; the public Aquabrim
site reads published content from the API.

## Prerequisites

- Node.js 18+
- PostgreSQL 18 running locally

## First-time setup

```bash
# 1. API
cd api
npm install
# Edit .env — set DB_PASSWORD / DATABASE_URL to your Postgres password
# Create the database (once), then create tables + seed the admin user:
npm run migrate

# 2. Admin
cd ../admin
npm install
```

Default admin login (change the password after first login):

```
Email:    admin@aquabrim.com
Password: Admin@123
```

## Running (two terminals)

```bash
# Terminal 1 — API on http://localhost:5000
cd api
npm run dev

# Terminal 2 — Admin on http://localhost:5173
cd admin
npm run dev
```

## API structure

Two separate route groups, mirrored by two controller folders:

- **Admin** (`/api/admin/...`) — the CMS sets/updates content. Protected by JWT.
- **Frontend** (`/api/...`) — the public website reads content. No auth.

Every page has its **own controller file** (`controllers/admin/homeController.js`,
`controllers/frontend/homeController.js`, …), so each page is easy to find and
can grow its own logic later.

### Admin endpoints (auth required, except login)

| Method | Route                          | Purpose                    |
|--------|--------------------------------|----------------------------|
| POST   | `/api/admin/auth/login`        | Log in, returns JWT        |
| GET    | `/api/admin/auth/me`           | Current admin              |
| POST   | `/api/admin/upload`            | Upload image (field `file`), returns URL |
| GET    | `/api/admin/<slug>`            | Read a page for editing    |
| PUT    | `/api/admin/<slug>`            | Save a page's content      |

### Frontend endpoints (public)

| Method | Route                | Purpose                       |
|--------|----------------------|-------------------------------|
| GET    | `/api/<slug>`        | Read a page's published content |

`<slug>` is one of: `home`, `about-us`, `products`, `blogs`, `contact-us`,
`pricing-policy`, `privacy-policy`, `refund-policy`, `shipping-policy`,
`terms-and-conditions`, `warranty-policy`.

## Data model — one table

There is a single content table, **`pages`**:

| Column    | Type      | Notes                                     |
|-----------|-----------|-------------------------------------------|
| `slug`    | text      | Unique id used by the frontend            |
| `name`    | text      | Human label shown in the CMS              |
| `content` | JSONB     | **All** of the page's data (text, images, lists) |

Because `content` is JSON, each page holds whatever shape it needs and new
sections require no database changes. (`admins` also exists, only for login.)
