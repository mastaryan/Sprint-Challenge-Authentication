const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const session = require('express-session');
const KnexStore = require('connect-session-knex')(session);

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');
const knex = require('../database/dbConfig.js');
const server = express();

const sessionConfig = {
    name: 'Try my cookie',
    secret: 'secrets dont make friends',
    resave: false,
    saveUnitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 30,
        secure: false,
        httpOnly: true
    },
    store: new KnexStore ({
        knex,
        tablename: 'sessions',
        createtable: true,
        sidfieldname: 'sid',
        clearInterval: 1000 * 60 * 30
    })
};

server.use(session(sessionConfig))
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;
