#!/usr/bin/env bash
# Step 0 setup: remove the Expo template's demo files and install the
# libraries the NeuroMind app needs. Safe to run more than once.
# Run from anywhere:  bash scripts/setup-step0.sh
set -euo pipefail
cd "$(dirname "$0")/.."

echo "→ Removing Expo template demo files…"
rm -f  src/app/explore.tsx
rm -f  src/components/animated-icon.module.css \
       src/components/animated-icon.tsx \
       src/components/animated-icon.web.tsx \
       src/components/app-tabs.tsx \
       src/components/app-tabs.web.tsx \
       src/components/external-link.tsx \
       src/components/hint-row.tsx \
       src/components/themed-text.tsx \
       src/components/themed-view.tsx \
       src/components/web-badge.tsx
rm -rf src/components/ui src/hooks
rm -f  src/global.css
rm -f  assets/images/expo-badge.png assets/images/expo-badge-white.png \
       assets/images/expo-logo.png assets/images/logo-glow.png \
       assets/images/react-logo.png assets/images/react-logo@2x.png assets/images/react-logo@3x.png \
       assets/images/splash-icon.png assets/images/tutorial-web.png
rm -rf assets/images/tabIcons
# reset-project would move the NeuroMind code away, so it goes too.
rm -f  scripts/reset-project.js
node -e "const f='package.json',p=require('./'+f);delete p.scripts['reset-project'];require('fs').writeFileSync(f,JSON.stringify(p,null,2)+'\n')"

echo "→ Installing libraries (SDK-matched versions)…"
npx expo install \
  @expo-google-fonts/dm-sans \
  @expo-google-fonts/dm-serif-display \
  expo-sqlite \
  react-native-svg \
  expo-haptics

echo "→ Checking types…"
npx tsc --noEmit

echo "✓ Step 0 done. Start the app with:  npx expo start"
