# Admin (admin/)

Vite + React 19 + TypeScript, react-admin 5 on Material UI. For react-admin APIs, use the `react-admin` skill. File map: `admin/README.md`.

## Verify

Run from `admin/` and make sure all three pass:

- `npm run lint` (oxlint)
- `npm run format:check` (oxfmt; `npm run format` fixes it)
- `npm run build` (`tsc -b` + Vite)

## Conventions

- All API calls go through data providers; components never call `fetch` directly.
- Send multipart requests as `FormData` with dotted field names matching the API's form binding, and include an image only when a new file was picked.
- API validation errors are joined into one notification by `httpClient.ts`; keep that mapping for new endpoints.
- The API returns root-relative image URLs; prefix them with `apiUrl` (from `VITE_API_URL`).
- Use react-admin and MUI components and the theme before writing custom UI or hard-coded colors.
