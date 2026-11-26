# PortfolioCms admin

React admin panel for PortfolioCms.Api: Vite + React + TypeScript + [react-admin](https://marmelab.com/react-admin/) (Material UI).

```bash
npm install
cp .env.example .env.local   # optional; defaults to http://localhost:5122
npm run dev                  # http://localhost:5173
```

The API must be running (see the root README).

- `src/dataProvider.ts`: routes react-admin's calls to each resource's own data provider (`combineDataProviders`)
- `src/httpClient.ts`: API URL and validation-error mapping, shared by the resource data providers
- `src/App.tsx`: dashboard and the home page resource (menu comes from react-admin)
- `src/authProvider.ts`, `src/Layout.tsx`: placeholder auth (always signed in as "Admin") and the top-right user menu (Profile, Logout)
- `src/themes/`: theme picker (built-in react-admin themes) plus light/dark toggle in the app bar, same pattern as the react-admin demo; the choice is saved in localStorage
- `src/home-page/`: home page edit screen (tabbed, one tab per page section, each section's inputs in `<Section>Inputs.tsx`, fixed-size numbered lists via `FixedFormIterator.tsx`) and its data provider (singleton, multipart image uploads)
- `src/DiscardButton.tsx`: toolbar button that discards unsaved form changes
- `src/ImagePicker.tsx`: reusable image input with a 16:9 preview (accepts all `ImageInput` props except `children`)
