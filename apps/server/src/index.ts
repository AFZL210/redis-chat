import http from 'http';
import SocketService from './services/socket';

async function init() {

    const sockerService = new SocketService();

    const httpServer = http.createServer();
    const PORT = process.env.PORT || 8000;

    sockerService.io.attach(httpServer);

    httpServer.listen(PORT, () => {
        console.log(`HTTP server started at PORT: ${PORT}`)
    });

    sockerService.initListners();
}

init();
