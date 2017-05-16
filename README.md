# BTC Markets NPM module

[![npm version](https://badge.fury.io/js/nl-btcmarkets.svg)](https://badge.fury.io/js/nl-btcmarkets)

## About

This is based off my ruby gem, but I'm trying to create a node.js trading engine

## Examples

### Get Order Book

```javascript
// BTC and AUD
i.public({endpoint: '/market/BTC/AUD/orderbook'}, (cb) => {console.log(cb)});
// ETC and AUD
i.public({endpoint: '/market/ETC/AUD/orderbook'}, (cb) => {console.log(cb)});
```

### Get Balances

```javascript
i.private({endpoint: '/account/balance', method: 'GET', apikey: '', apisecret: ''}, (cb) => {console.log(cb);})
```
