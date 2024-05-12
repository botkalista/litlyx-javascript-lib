"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRequest = void 0;
const utils_1 = require("./utils");
const HOST = 'https://broker.litlyx.com';
const PATH = '/v1/metrics/push';
/**
 * @param project_id - Project id on Litlyx dashboard
 * @param body- Content of the request
 *
 * Send a POST request
 */
function sendRequest(project_id, body) {
    try {
        if ((0, utils_1.isClient)()) {
            fetch(HOST + PATH, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...body, pid: project_id })
            }).catch((ex) => {
                console.error('ERROR PUSHING', ex);
            });
        }
        else {
            const http = require('http');
            const req = http.request({ hostname: HOST, path: PATH, method: 'POST', headers: { 'Content-Type': 'application/json' } });
            req.on('error', (error) => console.error('ERROR PUSHING', error));
            const requestBody = JSON.stringify({ ...body, pid: project_id });
            req.write(requestBody);
            req.end();
        }
    }
    catch (ex) {
        console.error('ERROR PUSHING', ex);
    }
}
exports.sendRequest = sendRequest;
