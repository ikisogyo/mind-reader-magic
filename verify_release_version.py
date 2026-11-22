#!/usr/bin/env python3
"""Prevent publishing a release tag that does not match app/build.gradle metadata."""
from pathlib import Path
import os, re, sys
root = Path(__file__).resolve().parent
build_file = (root / 'app/build.gradle').read_text(encoding='utf-8')
version = re.search(r"versionName\s+['\"]([^'\"]+)['\"]", build_file)
if not version:
    print('ERROR: versionName not found in app/build.gradle')
    sys.exit(1)
expected = 'v' + version.group(1)
actual = os.environ.get('RELEASE_TAG', '').strip()
print(f'App version: {expected}')
print(f'Release tag: {actual or "<missing>"}')
if actual != expected:
    print(f'ERROR: Release tag must exactly match {expected}')
    sys.exit(1)
print('PASS: Release tag matches app version')
