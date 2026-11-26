# PortfolioCms — headless CMS

| Folder | What | Stack |
|---|---|---|
| `src/PortfolioCms.Api` | REST API | ASP.NET Core 10, EF Core 10 + SQLite, OpenAPI |
| `admin` | Admin panel | Vite, React, TypeScript, react-admin (Material UI) |

The public website (Next.js) lives in a separate repository and uses this API.

## Prerequisites

- .NET 10 SDK (pinned in `global.json`)
- Node.js 24+ and npm

## Setup

```bash
# installs dotnet-ef (dotnet-tools.json)
dotnet tool restore

# creates src/PortfolioCms.Api/cms.db
dotnet ef database update -p src/PortfolioCms.Api

# root: concurrently (for npm run dev)
npm install

# admin panel
npm --prefix admin install
```

## Run

```bash
npm run dev
```

| App | URL |
|---|---|
| API | http://localhost:5122 (docs: `/scalar`) |
| Admin | http://localhost:5173 |

`npm run dev` runs `dotnet watch` (hot reload) and Vite together. `Ctrl+C` stops both, and if either one exits the other is stopped too.

To run them separately:

```bash
dotnet watch --project src/PortfolioCms.Api
npm --prefix admin run dev
```

If `dotnet watch` fails with "The configured user limit (128) on the number of inotify instances has been reached", raise the Linux limit:

```bash
echo fs.inotify.max_user_instances=512 | sudo tee /etc/sysctl.d/99-inotify.conf
sudo sysctl --system
```

## Database migrations

From the repo root, after changing `Models/` or `CmsDbContext`:

```bash
dotnet ef migrations add <Name> -p src/PortfolioCms.Api -o Data/Migrations
dotnet ef database update -p src/PortfolioCms.Api
```

## Layout

```text
.
├── PortfolioCms.slnx
├── global.json
├── dotnet-tools.json
├── src/PortfolioCms.Api/
│   ├── Controllers/
│   ├── Models/
│   ├── Dtos/
│   ├── Requests/
│   ├── Services/           IImageStorage
│   ├── Validation/         ImageFile
│   ├── Data/               DbContext + Migrations
│   └── wwwroot/uploads/    git-ignored
└── admin/src/
    ├── App.tsx
    ├── dataProvider.ts     routes to each resource
    ├── httpClient.ts
    └── <feature>/          screens + dataProvider.ts
```

## Deploying (VPS)

- Uploaded images are written to `wwwroot/uploads/`. Keep them outside the release folder by pointing the web root at persistent storage, e.g. `ASPNETCORE_WEBROOT=/var/lib/cms/wwwroot` (the API creates `uploads/` inside it).
- Behind nginx, forward `X-Forwarded-Proto` and set `client_max_body_size 200m;`.
