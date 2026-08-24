import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("declares the supplied PNG favicon using Vite's base URL", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

  assert.match(
    html,
    /<link rel="icon" type="image\/png" href="%BASE_URL%favicon\.png" \/>/,
  );
});

test("deploy checks the project before pushing main", async () => {
  const packageJson = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  );

  assert.equal(packageJson.scripts.deploy, "npm run check && git push origin main");
});
