To generate cask data:

```sh
curl https://formulae.brew.sh/api/cask.json \
  | jq '[.[] | {token: .token, homepage: .homepage}]' \
  > src/cask-slim.json
```
