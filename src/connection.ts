import { connect, disconnect, Mongoose } from "mongoose";
import { database } from "./database";
import { readFileSync } from "fs"

(<any>Mongoose).Promise = global.Promise;

export class Connection {
    private isConnected = false;
    
    public  connectToDB() {
        connect(database.url, {
            useNewUrlParser: true,
            ssl: true,
            sslValidate: false,
            sslCA: [readFileSync(database.pemPath)]})
        .then((db) => {
            this.isConnected = db.connections[0].readyState === 1;
            console.log('Connection to DB successful')
        })
        .catch((err) => console.error(err,'Error'));
    }

    public disconnect() {
        disconnect();
        this.isConnected = false;
    }

    public checkConnection(): boolean {
        return this.isConnected;
    }
}