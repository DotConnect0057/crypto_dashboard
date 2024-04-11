import mongoose, { Schema } from 'mongoose';
import url from 'url';

const parseUri = url.parse(process.env.MONGODB_URI);
const uriHost = parseUri.hostname;
const uriPort = parseUri.port;
const uriDbName = parseUri.pathname.substring(1);

let conn;

const existingConnection = mongoose.connections.find((c) => {
    return c.host === uriHost &&
    c.port === uriPort &&
    c.name === uriDbName &&
    c.readyState === 1;
});

if (existingConnection && existingConnection.readyState === 1) {
    console.log('Reusing existing connection');
    conn = existingConnection;
} else {
    console.log('Creating new connection');
    conn = mongoose.createConnection(process.env.MONGODB_URI);
}

try {
    conn.on('connected', () => {
        console.log('Connection established');
    });
} catch (error) {
    console.log('Error establishing connection');
}

const BackTestSchema = new Schema(
    {
        title: String,
    }, { collection: "BTCUSDT" });

const BackTest = conn.models.BackTest || conn.model('BackTest', BackTestSchema);
export default BackTest;