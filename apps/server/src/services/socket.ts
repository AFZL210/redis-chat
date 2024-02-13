import { Server } from 'socket.io';
import Redis from 'ioredis';


const pub = new Redis({
    host: "redis-23f93ad5-ak341668-1ede.a.aivencloud.com",
    port: 17536,
    username: 'default',
    password: 'AVNS_o-oBnbOeZfg91kcXHw6'
});
const sub = new Redis({
    host: "redis-23f93ad5-ak341668-1ede.a.aivencloud.com",
    port: 17536,
    username: 'default',
    password: 'AVNS_o-oBnbOeZfg91kcXHw6'
});

class SocketService {
    private _io: Server;

    constructor() {
        console.log("Init Socket Service...");
        this._io = new Server({
            cors: {
                allowedHeaders: ['*'],
                origin: '*'
            }
        });

        sub.subscribe('MESSAGES');
    }

    public initListners() {
        const io = this._io;
        console.log("Init Socket listners...");

        io.on('connect', socket => {
            console.log("New socket connected", socket.id);

            socket.on('event:message', async ({ message }: { message: string }) => {
                console.log("New message", message);
                // publish this msg to redis
                await pub.publish('MESSAGES', JSON.stringify(message));
            })
        })

        sub.on('message', (channel, message) => {
            if (channel === 'MESSAGES') {
                io.emit('message', message);
            }
        })
    }

    get io() {
        return this._io;
    }
}

export default SocketService;
