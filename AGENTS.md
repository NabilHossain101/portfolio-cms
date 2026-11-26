# PortfolioCms

Headless CMS: `src/PortfolioCms.Api` (ASP.NET Core REST API) and `admin` (react-admin panel). Setup, run and migration commands are in `README.md`.

- Before editing API code, read `src/AGENTS.md`; before editing admin code, read `admin/AGENTS.md`.
- The API's request and response shapes are a contract. When you change one, update that resource's `admin/src/<feature>/dataProvider.ts` in the same change.
- Keep `README.md` in sync when you change setup, run commands or folder layout.
- Don't commit `*.db` files or anything in `src/PortfolioCms.Api/wwwroot/uploads/` (both are git-ignored).
