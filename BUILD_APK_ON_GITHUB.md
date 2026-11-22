# Get an APK using GitHub Actions (one-time setup)

This repository has an automated Android build workflow. It is intended to avoid installing Android SDK/Gradle on the development machine.

## One-time setup
1. The target repository is already created: https://github.com/ikisogyo/mind-reader-magic. It is currently empty.
2. On a Windows PC, extract this ZIP. The extracted folder itself is the repository root (it contains `.github`, `app`, `build.gradle`, and `settings.gradle`). Open PowerShell in that folder.
3. Install Git for Windows if the `git` command is not available.
4. Double-click `START_APK_UPLOAD.bat`. It is configured for the repository above, requires Git for Windows (not GitHub CLI), stages and commits the project, and pushes `main`. Git Credential Manager may open a browser sign-in if needed. It stops rather than overwrite an unexpected existing remote, and keeps its window open to show the result.

If you prefer manual upload, run these commands from the extracted project root:

```powershell
git init
git add .
git commit -m "Mind Reader Magic source"
git branch -M main
git remote add origin https://github.com/ikisogyo/mind-reader-magic.git
git push -u origin main
```

If Git asks you to authenticate, complete GitHub's browser/device login flow.

## Start the APK build (automatic after upload)
1. The `git push -u origin main` in the upload step automatically triggers the **Android debug APK** workflow because the workflow listens for pushes to `main` and `master`.
2. Open the repository on GitHub and select **Actions** to monitor the run. Do not manually run a second build unless the automatic run did not start.
3. Wait for the run to finish green. If it fails, open the failed step and save/copy the error log for troubleshooting.
4. In the successful run, scroll to **Artifacts**, download `mindmagic-debug-apk`, and extract `app-debug.apk`. The artifact also includes `app-debug.apk.sha256` to verify file integrity.

The workflow automatically runs source preflight and JavaScript regression tests before Gradle assembles the APK. It keeps the artifact for 14 days. A green workflow and the artifact are required before calling the APK build complete. This does not replace installation/physical-device testing.

## Important
The project ZIP is source code, not an APK. This workflow has been configured but has **not yet been executed** in GitHub Actions.

## Automatic APK release from a version tag

After the project is pushed to GitHub and the normal build has passed, create and push a version tag from PowerShell:

```powershell
git tag v0.3.192
git push origin v0.3.192
```

The `Android APK release` workflow first checks that the pushed tag exactly matches the app `versionName` (for example, `v0.3.192`), then runs preflight and regression tests, builds the APK, calculates its SHA-256, and publishes the APK under the clearly labeled `mindmagic-debug.apk` name and its matching checksum as a GitHub Release asset. A mismatched tag is rejected before the build. The GitHub release is marked prerelease because this is a debug APK, not a production-signed build. The build still uses `assembleDebug` (debug APK, not a production-signed release APK); installation and device verification are separate required checks.


## CI更新 v0.3.185
SDKライセンス承認処理では、`yes` 側の正常なSIGPIPEを誤ってビルド失敗にせず、同時に `sdkmanager` 自身の終了コードは確実にビルドへ伝えるよう修正しました。


## v0.3.192 source update
Settings and reset actions are transactional: when local storage fails, in-memory settings/item data are restored instead of appearing changed until the app is restarted. The Node regression suite now covers both successful reset and storage-failure rollback.


Gitのユーザー名・メールが未設定でも、このアップロードスクリプトはリポジトリ内だけにビルド用の識別情報を設定します。既存のグローバル設定は変更しません。
