import mongoose from 'mongoose';

const { HOST, MONGODB_PORT, MONGODB_DATABASE, MONGODB_AUTH_SOURCE, MONGODB_USER, MONGODB_PASS } = process.env;

const connection = mongoose.connect(`mongodb://${HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    authSource: MONGODB_AUTH_SOURCE,
    user: MONGODB_USER,
    pass: MONGODB_PASS
});

export default connection;