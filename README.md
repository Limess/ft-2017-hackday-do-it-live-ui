### Premise

Crawling the https://live.ft.com events page for upcoming events, exposing this for integration with an API, then pulling from this API to show a beautiful (hacked together) sidebar article on an FT page.

### Running it

This project uses [yarn](https://dl.yarnpkg.com) and yarn scripts.

#### Start a stubbed FT article with stubs locally

```shell
yarn start
```

#### Crawl FT.live

Outputs to output/ft-live.json

```shell
yarn run crawl
```

#### Build static assets

```shell
yarn run build
```

### Open browser and watch static assets

```shell
yarn run watch
```