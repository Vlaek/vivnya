# Favicon and GitHub deploy command

## Goal

Use the supplied `public/favicon.png` as the browser favicon and expose one npm command for publishing committed changes through the existing GitHub Pages workflow.

## Approaches considered

1. **Use the existing Actions workflow (selected).** Add a favicon link to `index.html` and make `npm run deploy` run the project checks before pushing `main` to `origin`. This reuses the verified Pages setup and adds no dependency.
2. **Use the `gh-pages` package.** Build locally and publish `dist/client` to a separate branch. This duplicates the existing Actions deployment path and adds package maintenance.
3. **Dispatch the workflow with GitHub CLI.** Run `gh workflow run` from npm. This requires an extra globally installed and authenticated CLI, so it is less portable.

## Design

- Add `<link rel="icon" type="image/png" href="%BASE_URL%favicon.png" />` to the document head. `%BASE_URL%` keeps the URL valid both locally and under `/vivnya/` on GitHub Pages.
- Add `"deploy": "npm run check && git push origin main"` to `package.json`.
- The command does not stage or commit files. Only already committed changes are published.
- A successful push triggers `.github/workflows/deploy-pages.yml`, which builds and deploys the site.

## Validation

- Run the existing full `npm run check` suite.
- Run the GitHub Pages build and confirm that `dist/client/index.html` references `/vivnya/favicon.png`.
- Commit and push the changes, wait for the Pages workflow to succeed, and verify that the deployed favicon URL returns HTTP 200.

