# PR0MOTH3R v2.0
WEB GUI for osmo-nitb-scripts-calypsobts / osmo-nitb-scripts

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

Also u can change production config paths (defoult calypso dragonos paths) . This JS file looks as follows:

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


And change buttons command . This JS file looks as follows:

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

![PROMOTHER](https://pbs.twimg.com/media/FjlWu8cXgAAuMF9?format=jpg&name=4096x4096)
![PROMOTHER](https://pbs.twimg.com/media/FjlWu8fWAAAS-4o?format=jpg&name=4096x4096)
![PROMOTHER](https://pbs.twimg.com/media/FjlWu8kWYAIjXl5?format=jpg&name=4096x4096)
