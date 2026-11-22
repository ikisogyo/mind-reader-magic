# Mind Reader Magic v0.3.192

## Packaging fix (v0.3.176 project bundle)
- ZIP is now packaged with project files at the archive root, so GitHub detects `.github/workflows` and Actions can run after the repository is created.
- The Android app version remains v0.3.182; this bundle change does not modify app behavior.

## Current source milestone
- Image import commits only after local storage succeeds; failed saves restore the previous image.
- Item cue thumbnails refresh after image save attempts.

## Local validation
- Run all regression scripts: `for test in tests/*.cjs; do node "$test" || exit 1; done`
- JavaScript syntax: `node --check tests/inline-screen.js`
- Android APK build: not yet verified in this environment.

## APK build route
This project includes `.github/workflows/android-build.yml`, which provisions JDK 17, Gradle 8.7, and Android SDK 35 on GitHub Actions, runs preflight and regression tests, builds `assembleDebug`, and uploads the debug APK as a 14-day workflow artifact. See `BUILD_APK_ON_GITHUB.md` for the exact steps.

**Status honesty:** a successful Node test suite is not an Android APK build. No APK is claimed until the workflow completes successfully and the APK artifact exists. Physical-device testing remains a separate step.

## CI artifact reliability update (bundle revision 0.3.178)

- Regression-test shell now fails immediately if any test command fails (`set -e`), preventing a later passing test from hiding an earlier failure.
- The debug-build artifact now includes `app-debug.apk.sha256` alongside the APK for integrity checking.
- The Android app version itself is unchanged (`0.3.182`); this bundle revision updates build/release tooling only.

## v0.3.192
- Settings screen now reports online/offline network state and refreshes when connectivity changes.
- Failed item/special-photo image reads now show an explicit message instead of silently doing nothing.
- Regression tests updated for the current app version and new behavior.

## v0.3.192 (transactional settings)
- Settings edits now roll back the in-memory configuration if local storage fails, rather than leaving unsaved values active.
- The item/image reset now rolls back the item slots on storage failure; cue words and special-photo settings remain untouched.
- Added regression coverage for successful reset and storage-failure rollback.


## v0.3.192

Stopping recognition now cancels the current SpeechRecognizer session and releases the recognition-active guard immediately, preventing a subsequent round from being blocked while waiting for a final callback.


## v0.3.192

Stopping recognition now cancels the active session and clears the start guard immediately, preventing the next performance round from being blocked while awaiting a final callback.


## v0.3.192

Stopping recognition cancels the active session and clears the start guard immediately, preventing a subsequent round from being blocked while waiting for a final callback.


Gitのユーザー名・メールが未設定でも、このアップロードスクリプトはリポジトリ内だけにビルド用の識別情報を設定します。既存のグローバル設定は変更しません。
