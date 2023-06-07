# Requirements

The version of node currently listed in [.node-version](./.node-version).

If you use nvm or [fnm](https://github.com/Schniz/fnm), it should use the right
version of Node automagically.

# Getting started

1. `npm install`
2. `npm run watch`
3. Go to `chrome://extensions/`
4. Enable Developer mode
5. Click "Load unpacked" and navigate to the `dist` folder that was created inside this repo root when you ran `npm run watch` above.

# To re-generate cask data

```sh
curl https://formulae.brew.sh/api/cask.json \
  | jq '[.[] | {token: .token, homepage: .homepage}]' \
  > src/cask-slim.json
```
