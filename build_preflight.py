#!/usr/bin/env python3
"""Pre-build checks for MindMagic Android project (does not replace Android Gradle build)."""
from pathlib import Path
import re, xml.etree.ElementTree as ET, shutil, subprocess, sys
root=Path(__file__).resolve().parent
checks=[]
def check(name, ok, detail=''):
    checks.append((name, bool(ok), detail))
required=['settings.gradle','build.gradle','gradle.properties','app/build.gradle','app/src/main/AndroidManifest.xml','app/src/main/java/jp/mindmagic/app/MainActivity.java','app/src/main/java/jp/mindmagic/speech/SpeechRecognitionHelper.java','app/src/main/java/jp/mindmagic/speech/WebViewSpeechBridge.java','app/src/main/assets/index.html','app/src/main/assets/bridge-events.js']
for rel in required: check('Required file '+rel,(root/rel).is_file())
manifest=root/'app/src/main/AndroidManifest.xml'
try:
    tree=ET.parse(manifest); r=tree.getroot(); android='{http://schemas.android.com/apk/res/android}'
    check('Manifest XML parses',True)
    check('RECORD_AUDIO permission',any(x.attrib.get(android+'name')=='android.permission.RECORD_AUDIO' for x in r.findall('uses-permission')))
    check('Launcher Activity present',any(x.attrib.get(android+'name')=='jp.mindmagic.app.MainActivity' for x in r.findall('./application/activity')))
except Exception as e: check('Manifest XML parses',False,str(e))
gradle=(root/'app/build.gradle').read_text()
rootgradle=(root/'build.gradle').read_text()
check('Android plugin declared', 'com.android.application' in rootgradle and '8.6.1' in rootgradle)
check('compileSdk 35',bool(re.search(r'compileSdk\s+35',gradle)))
check('minSdk 23',bool(re.search(r'minSdk\s+23',gradle)))
check('Version metadata aligned',bool(re.search(r"versionCode\s+(\d+).*?versionName\s+['\\\"]0\.3\.\1['\\\"]", gradle, re.S)))
java=(root/'app/src/main/java/jp/mindmagic/app/MainActivity.java').read_text()
bridge=(root/'app/src/main/java/jp/mindmagic/speech/WebViewSpeechBridge.java').read_text()
check('MainActivity loads local HTML','file:///android_asset/index.html' in java)
check('WebView JS bridge setup present','addJavascriptInterface' in java)
check('Speech bridge has start/stop',('start' in bridge and 'stop' in bridge))
check('Gradle executable available',shutil.which('gradle') is not None,shutil.which('gradle') or 'not installed')
check('Android SDK configured',bool(__import__('os').environ.get('ANDROID_HOME') or __import__('os').environ.get('ANDROID_SDK_ROOT')),'ANDROID_HOME/ANDROID_SDK_ROOT not set')
print('MindMagic pre-build check')
for name,ok,detail in checks: print(('PASS' if ok else 'BLOCK'),name,detail)
print(f'{sum(ok for _,ok,_ in checks)}/{len(checks)} preflight checks passed')
# Fail fast in CI/local build environments when required tools or project checks are missing.
sys.exit(0 if all(ok for _,ok,_ in checks) else 1)
