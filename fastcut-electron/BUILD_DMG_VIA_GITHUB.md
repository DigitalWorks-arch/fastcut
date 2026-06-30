# Build the Mac .dmg Right Now via GitHub Actions (no Mac needed)

This uses GitHub's free cloud Mac runners to build the actual `.dmg` for
you. Takes about 5 minutes total, no Mac required on your end.

## 1. Create a free GitHub account
If you don't have one already: https://github.com/join

## 2. Create a new repository
1. Go to https://github.com/new
2. Name it `fastcut` (or anything), keep it **Public** (required for free
   unlimited Actions minutes — Private repos get limited free minutes too,
   so Private works fine for a small project like this as well).
3. Don't add a README/gitignore — leave it empty. Click **Create repository**.

## 3. Upload this project
Easiest way (no git command line needed):
1. On the new repo's page, click **"uploading an existing file"**.
2. Drag in everything from this `fastcut-electron` folder *except* the
   `node_modules` and `dist` folders if present (they shouldn't be, I
   already excluded them).
3. **Important:** GitHub's drag-and-drop upload skips folders starting with
   a dot like `.github`. So also separately do this:
   - In the repo, click **"Add file" → "Create new file"**.
   - For the filename, type exactly: `.github/workflows/build-mac.yml`
     (GitHub auto-creates the folders from the slashes).
   - Paste in the contents of the `build-mac.yml` file I gave you.
   - Click **Commit changes**.

(If you're comfortable with git/command line instead, it's just:
`git init && git add . && git commit -m "init" && git remote add origin <your-repo-url> && git push -u origin main`
— faster, and handles the `.github` folder automatically.)

## 4. Run the build
1. In your repo, click the **Actions** tab.
2. You should see "Build Mac DMG" listed. Click it.
3. Click **"Run workflow"** (dropdown button) → **Run workflow** (confirm).
4. Wait ~3-5 minutes — refresh the page, you'll see a green checkmark when done.

## 5. Download your .dmg
1. Click into the finished workflow run.
2. Scroll down to **Artifacts** → click **FastCut-Mac-DMG** to download a
   zip containing your `.dmg`.
3. That's it — when you're back on your Mac, open that `.dmg` and drag
   FastCut into Applications like any normal app. First launch needs
   right-click → Open to bypass the unsigned-app warning.

## Re-running after changes
Anytime you edit the code and push/upload changes, just go back to the
Actions tab and click "Run workflow" again to get a fresh `.dmg`.
