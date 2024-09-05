import Hapi from '@hapi/hapi';
import routes from './routes.js'; // Ensure this import path is correct

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    // Add routes to the server
    server.route(routes);

    await server.start();
    console.log(`Server running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
