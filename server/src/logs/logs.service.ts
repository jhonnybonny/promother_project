import WebSocket from 'ws'
import subProcess from "child_process";

const command = `cd /usr/src/osmo-nitb-scripts-calypsobts && sudo gnome-terminal --geometry=75x20 -- ./auto.sh && sudo ./main.py -u`
const stopCommand = `sudo killall -SIGINT "python3" ; sudo killall -9 "osmocon"`
const resetCommand = `sudo killall -SIGINT "python3" ; sudo killall -9 "osmocon" ; sudo rm -rf /usr/src/CalypsoBTS/hlr.sqlite3`
const unknownCommand = `ping -t 8.8.8.8`

// todo - a lot of refactoring

class LogsService {
    private wsServer!: WebSocket.Server<WebSocket.WebSocket>
    private spawnedProcess!:  subProcess.ChildProcess

    async startWebSocketServer() {
        this.wsServer =  await new WebSocket.Server({port: 9000})
        console.log('[server]: started a WebSocket server')
        this.wsServer.on('connection', this.onConnect)
    }

    async onConnect(wsClient: WebSocket) {
        console.log('[server]: User connected via WebSocket')
    }

    spawnCommand() {
        console.log('[server]: started a process')
        this.spawnedProcess = subProcess.spawn(command, [''], {
            shell: true,
            stdio: [ 'ignore']
        })
        if (this.spawnedProcess.stdout) {
            this.spawnedProcess.stdout.setEncoding('utf8')
            this.spawnedProcess.stdout.on('data', (data) => {
                this.wsServer.clients.forEach(
                    client => { client.send(JSON.stringify(data)) }
                )
            })
            this.wsServer.clients.forEach(
                client => {
                    client.on('close', () => {
                        console.log('[server]: User disconnected from WebSocket')
                    })
                }
            )
        }
        if (!this.spawnedProcess.stderr) return
        this.spawnedProcess.stderr.setEncoding('utf8')
        this.spawnedProcess.stderr.on('data', (data) => {
            this.wsServer.clients.forEach(
                client => { client.send(JSON.stringify(data)) }
            )
        })
    }
    killProcess() {
        console.log('[server]: killed process')
        this.spawnedProcess = subProcess.spawn(stopCommand, [''], {
            shell: true,
            stdio: [ 'ignore']
        })
    }
    resetDatabase() {
        console.log('[server]: reset database')
        this.spawnedProcess = subProcess.spawn(resetCommand, [''], {
            shell: true,
            stdio: [ 'ignore']
        })
    }
    executeUnknown() {
        const unknownProcess = subProcess.spawn(unknownCommand, [''], {
            shell: true,
            stdio: [ 'ignore']
        })
        if (unknownProcess.stdout) {
            unknownProcess.stdout.setEncoding('utf8')
            unknownProcess.stdout.on('data', (data) => {
                this.wsServer.clients.forEach(
                    client => { client.send(JSON.stringify(data)) }
                )
            })
            this.wsServer.clients.forEach(
                client => {
                    client.on('close', () => {
                        console.log('[server]: User disconnected from WebSocket')
                    })
                }
            )
        }
        if (!unknownProcess.stderr) return
        unknownProcess.stderr.setEncoding('utf8')
        unknownProcess.stderr.on('data', (data) => {
            this.wsServer.clients.forEach(
                client => { client.send(JSON.stringify(data)) }
            )
        })
    }
}

export default new LogsService()
