# PR0MOTH3R v2.0 &middot; [![Build Status](https://img.shields.io/travis/deathnon/deathnon/latest.svg?style=flat-square)](https://travis-ci.org/deathnon/deathnon) [![Website](https://img.shields.io/website-up-down-green-red/http/deathnon.com.svg?style=flat-square)](http://deathnon.com) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://deathnon.com) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/deathnon/deathnon/blob/master/LICENSE)
<p>
<img src="https://github.com/jhonnybonny/promother_project/blob/main/client/src/assets/icons/ico.png?raw=true" height="80"align="right">
</p>


<p>
This project aims to create a user-friendly web-based Graphical User Interface (GUI) for managing your base stations. The GUI is built on top of the osmo-nitb-scripts-calypsobts OR osmo-nitb-scripts software packages, which are used to configure and operate cellular base stations.
</p>


__________________________



<p align="center">
  <img src="https://pbs.twimg.com/media/FjlWu8cXgAAuMF9?format=jpg&name=4096x4096" width="800" />
</p>

<p align="center">
  <img src="https://pbs.twimg.com/media/FjlWu8fWAAAS-4o?format=jpg&name=4096x4096" width="400" />
  <img src="https://pbs.twimg.com/media/FjlWu8kWYAIjXl5?format=jpg&name=4096x4096" width="400" />
</p>


## ⚠️ WARNING ⚠️

First of all, you need to understand what are you doing and any possible consequences. Please note, that you can only use the frequencies you have a valid license for. In many countries you cannot operate any GSM RF equipment until a proper license from the regulatory authority is obtained. Running a BTS without such license and/or interfering with the commercial networks is out of law and may be punished!


## Prerequisites

- SDR full duplex devices (USRP, LimeSDR, BladeRF, etc.) or CalypsoBTS 
- DragonOS

### Installing

First u need install nodejs and npm

```sh
$ sudo apt install nodejs npm
```

also you need install yarn

```sh
$ npm install yarn
```

Then you need 
```sh
cd client && yarn && yarn run build 
```
```sh
cd server && yarn && yarn run  build 
```
### Paths

Also u can change production config paths (defoult calypso dragonos paths) . This JS file promother_project/server/src/configs/default-config.ts :

```js
...
// =======================================================================
// Production config paths (calypso dragonos bts)
export const bscConfigPath = '/usr/src/CalypsoBTS/openbsc.cfg'
export const btsConfigPath = '/usr/src/CalypsoBTS/osmo-bts-trx-calypso.cfg'
export const configFilePath = '/usr/src/osmo-nitb-scripts-calypsobts/config.json'
export const dataBaseLink = '/usr/src/CalypsoBTS/hlr.sqlite3'
// =======================================================================
...
```


And change buttons command . This JS file promother_project/server/src/logs/logs.service.ts :

```js
...
// =======================================================================
const command = `cd /usr/src/osmo-nitb-scripts-calypsobts && sudo gnome-terminal --geometry=75x20 -- ./auto.sh && sudo ./main.py -u`
const stopCommand = `sudo killall -SIGINT "python3" ; sudo killall -9 "osmocon"`
const resetCommand = `sudo killall -SIGINT "python3" ; sudo killall -9 "osmocon" ; sudo rm -rf /usr/src/CalypsoBTS/hlr.sqlite3`
// =======================================================================
...
```


Start prtomother
```sh
$ cd server && yarn run dev
```

