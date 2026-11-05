# GitHub Pages Deployment and Future Updates

This guide describes how the Agent Explorer source was pushed to GitHub and published as a website, then how to update it later.

- Repository: <https://github.com/ksbaig/ksbaig_AI_Agents>
- Website: <https://ksbaig.github.io/ksbaig_AI_Agents/>
- Deployment branch: `main`

## One-time setup

1. Create a GitHub repository and note its HTTPS URL.
2. Keep the React/Vite project in a local folder. Make sure `.gitignore` excludes generated files such as `node_modules/`, `dist/`, and local `.env` files.
3. Initialize Git if the folder is not already a repository, then connect it to GitHub:

   ```powershell
   git init -b main
   git remote add origin https://github.com/ksbaig/ksbaig_AI_Agents.git
   ```

4. If the GitHub repository already has an initial commit, fetch it and base the local branch on it before adding project files:

   ```powershell
   git fetch origin
   git reset origin/main
   ```

   `git reset origin/main` is for the initial setup when the local repository has no commits. Do not use it to update an established project.

5. Stage, commit, and push the project:

   ```powershell
   git add -A
   git commit -m "Add Agent Explorer React app"
   git push -u origin main
   ```

6. In the GitHub repository, open **Settings > Pages** and set the publishing source to **GitHub Actions**.

## How this Vite site is deployed

GitHub Pages hosts this repository as a project site, so its URL includes the repository name. Vite needs that path when it builds production assets. The setting is in [`vite.config.js`](../vite.config.js):

```js
base: process.env.GITHUB_ACTIONS ? '/ksbaig_AI_Agents/' : '/',
```

The workflow at [`.github/workflows/deploy-pages.yml`](../.github/workflows/deploy-pages.yml) runs whenever code is pushed to `main`. It uses Node.js 22, runs `npm ci` and `npm run build`, then publishes the generated `dist/` folder. You normally do not need to configure Pages again.

## Update the website next time

1. Open a terminal in the project folder. Confirm you are on `main` and see the expected files:

   ```powershell
   git status --short --branch
   ```

2. Make and test your changes. The project checks are:

   ```powershell
   npm test
   npm run lint
   npm run build
   ```

3. Stage and commit the files you want to publish:

   ```powershell
   git add -A
   git status --short
   git commit -m "Describe the update"
   ```

4. Push to GitHub:

   ```powershell
   git push
   ```

   The local `main` branch tracks `origin/main`, so `git push` is sufficient. Pushing to `main` automatically starts the Pages deployment workflow.

5. Open **GitHub repository > Actions > Deploy to GitHub Pages**. Wait for the latest run to finish with a green check, then refresh the website URL above. Publishing can take a short time after the workflow succeeds.

## If something goes wrong

- **The website shows 404:** Open the latest Pages workflow run and confirm both `build` and `deploy` succeeded. In **Settings > Pages**, confirm the source is **GitHub Actions**. Confirm the Vite base path matches the repository name and capitalization.
- **Push is rejected because GitHub has newer commits:** First run `git pull --rebase origin main`, resolve any reported conflicts, then run `git push`. Do not force-push to solve this.
- **Git asks you to sign in:** Complete sign-in with Git Credential Manager or the browser prompt. Never put a GitHub password or token in the project files.
- **`node_modules/` or `dist/` appears in the staged list:** Stop before committing and check `.gitignore`; those generated folders should not be uploaded.

## If working on a different computer

Clone the repository, install its dependencies, and enter the project folder:

```powershell
git clone https://github.com/ksbaig/ksbaig_AI_Agents.git
cd ksbaig_AI_Agents
npm ci
```

Then use the update steps above. Keep your work in this cloned repository so Git can track and push it.
