# Moventest NativeScript

This project is part of an experimentation to test different mobile cross platform frameworks.
It connects to a Google Cloud Firestore database, displays a list of stored users, and allows to modify / add some.

## How to
To launch the project:
- first install NativeScript: https://docs.nativescript.org/angular/start/quick-setup
- run `npm install`
- run `tns debug android`

To debug in Chrome:
open [chrome-devtools://devtools/bundled/inspector.html?experiments=true&ws=localhost:40000](chrome-devtools://devtools/bundled/inspector.html?experiments=true&ws=localhost:40000)

To build a release apk
- execute this command line: `tns build android --release --key-store-path "F:\Android\keystore\Keystore" --key-store-password xxx --key-store-alias "mrk playing with android" --key-store-alias-password xxx`