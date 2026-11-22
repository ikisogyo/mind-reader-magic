こころみえみえ Android Host + Core Screen prototype v0.3.153

This archive continues the v0.3.149 prototype. It is a source prototype, not a verified APK.

Included:
- Full-screen heart performance screen and settings panel
- Four object slots with image upload and name
- Six editable cue words with thumbnail previews tied to object image slots
- Editable special-photo cue, image, and message
- LocalStorage save/restore
- Android speech bridge cue recognition and cue-gated reveal
- Heart tap reveal and face-down orientation reveal
- Result tap OR face-up orientation returns to heart and starts listening
- Spoken "リセット" clears the four object names/images while preserving cue words and special-photo settings
- Five randomized synthesized reveal sound patterns (Web Audio; sound is optional if unsupported)

Changes in v151:
- When an object image is selected/replaced, all cue-word thumbnails tied to that item refresh immediately.
- Re-rendering settings no longer accumulates special-photo file input change handlers.


Release metadata update (v0.3.152):
- Corrected Android Gradle versionCode/versionName to match the source package.
- Prior source checks were rerun against this release; see release validation results.

Changes in v0.3.153:
- Enabled WebView DOM storage so the app localStorage settings can persist on Android.
- Updated app label from prototype host wording to the intended app name.
- Updated release version metadata to 0.3.153.

Changes in v0.3.156:
- Fixed a Java compile blocker: WebViewSpeechBridge was declared final while MainActivity creates an anonymous subclass to intercept start() and request microphone permission.
- Removed final from WebViewSpeechBridge and bumped Android release metadata to 0.3.156.
- Added a regression source check for the subclass/override relationship.
- Android Gradle build remains unverified in this environment because Gradle/Android SDK are not installed.

Changes in v0.3.156:
- Fixed a Java compile blocker: WebViewSpeechBridge was declared final while MainActivity creates an anonymous subclass to intercept start() and request microphone permission.
- Removed final from WebViewSpeechBridge and bumped Android release metadata to 0.3.156.
- Added a regression source check for the subclass/override relationship.
- Android Gradle build remains unverified in this environment because Gradle/Android SDK are not installed.


v0.3.156: Recognized item and special-photo cues stop native listening immediately before the reveal prompt. Regression tests added.


v0.3.156: Reset command now stops speech recognition, clears pending reveal state and hides stale result; cue words and special photo configuration remain preserved. Added regression test.


v0.3.156 change: spoken reset now explicitly stops speech recognition, clears pending reveal state, hides any stale result, resets the heart handler, and provides feedback on the performance screen. Cue words and special photo settings remain unchanged. Regression checks added.

v0.3.157: Added build_preflight.py to validate project structure, manifest permissions/launcher, Android plugin and SDK targets, version alignment, WebView local asset loading, and speech bridge wiring before attempting a Gradle build. Preflight result in this environment: 20/22 checks passed; Gradle executable and Android SDK environment are missing, so APK build remains blocked. This preflight is not a substitute for a real Android build.


v0.3.158: Added a GitHub Actions Android build workflow that can run preflight, execute the CJS regression checks, assemble a debug APK on a hosted Android build runner, and upload the APK as a workflow artifact. This hosted build has not yet been executed; it requires pushing the project to a GitHub repository and running the workflow.

v0.3.159: Fixed face-down sensor detection to accept both positive and negative beta angles (abs(beta) > 145), rather than only positive angles. Added a regression check for both signs. Android APK still requires the hosted workflow to be run; no APK is claimed here.


[Development tooling v0.3.160]
- GitHub Actions Android build workflow now explicitly accepts Android SDK licenses and installs platform-tools.
- Preflight script now exits with a non-zero status if any required project or environment check fails, so CI cannot silently continue past a failed check.
- Added CI workflow regression checks.
- App itself remains version 0.3.159; this update changes build tooling only, not app features.
- APK has not yet been generated or device-tested in this environment.


Development tooling v0.3.161: CI Android toolchain verification tightened. SDK license failures are no longer masked, toolchain versions are logged, Gradle builds emit stack traces, and the APK file is explicitly checked before artifact upload.

App update v0.3.160: tightened spoken reset matching. Reset now accepts exact "リセット" and common command endings, but no longer clears item/image data merely because an unrelated transcript contains the word as a substring. Regression checks added for this behavior. Android build is still not executed in this environment because Gradle and Android SDK are unavailable.

v0.3.164 release notes
- Tightened spoken reset phrase matching: suffix must be an exact allowed phrase, not merely begin with one.
- Prevents accidental reset for phrases such as "リセットしてもいい？".
- Updated Android versionCode/versionName and legacy metadata tests to match 0.3.164.
- Added behavioral tests for positive and negative reset phrase cases.

v0.3.166: Speech-recognition error now stops the listening state, restores the start button, hides stop, and shows a retry hint.


v0.3.168 milestone 1/5: Recognition end-state handling fixed. When SpeechRecognizer reports listening=false without a recognized cue or active reveal, the UI restores the start/stop controls and prompts the user to repeat the cue. This avoids a stuck listening UI after a normal recognition end. Android APK build and device validation remain unverified in this environment.


Version 0.3.182 update: failed image storage attempts now roll back to the previous image in memory and preview. Android APK build/device verification remains pending.
