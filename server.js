const Hapi = require('hapi');
const Path = require('path');
const mongoose = require('mongoose');

const options = {
    ops: {
        interval: 1000
    },
    reporters: {
        myConsoleReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{
                log: '*',
                response: '*'
            }]
        }, {
            module: 'good-console'
        }, 'stdout'],
        myFileReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{
                ops: '*'
            }]
        }, {
            module: 'good-squeeze',
            name: 'SafeJson'
        }, {
            module: 'good-file',
            args: ['./test/fixtures/awesome_log']
        }]
    }
};
mongoose.connect("mongodb://localhost:27017/happiapp", {
        useNewUrlParser: true
    })
    .then(() => {
        server.log('info', "database connected");
    })
    .catch((err) => console.log(err));
const server = new Hapi.server({
    port: 3000,
    host: "localhost"
});
server.route({
    method: 'GET',
    path: '/{name}',
    handler: (request, h) => {
        return `<h1>Hello  ${request.params.name} !<h1>`;
    }
});

const init = async () => {

    await server.register({
        plugin: require('./routes/user_routes').userRoutes
    });

    await server.register({
        plugin: require('good'),
        options,
    });

    await server.register(require('vision'));
    server.views({
        engines: {
            html: require('handlebars')
        },
        path: Path.join(__dirname, 'views')
    })
    await server.register(require('inert'));
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return h.view('index', {
                name: "john Doe",
                tasks: [{
                    text: "Task1",
                    text: "Task2",
                    text: "task2"
                }]
            });
        }
    });
    server.route({
        method: 'GET',
        path: '/about',
        handler: (request, h) => {

            return h.file('./public/html/about.html');
        }
    })

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

init();