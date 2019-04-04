const PieServer = require("./pieServer");

let server = new PieServer();

server.listen(8385);

const child_process = require('child_process'),
    url = 'http://localhost:8385/test/main.html';

if (process.platform == 'wind32') {
    cmd = 'start';
} else if (process.platform == 'linux') {
    cmd = 'xdg-open';
} else if (process.platform == 'darwin') {
    cmd = 'open';
}
child_process.exec(`${cmd} "${url}"`);