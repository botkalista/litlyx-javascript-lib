import { isClient } from './utils';

const HOST = 'broker.litlyx.com';
const PATH = '/v1/metrics/push';

/**
 * @param project_id - Project id on Litlyx dashboard
 * @param body- Content of the request
 * 
 * Send a POST request
 */
export function sendRequest(project_id: string, body: Record<string, any>) {

    try {
        if (isClient()) {
            fetch('https://' + HOST + PATH, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...body, pid: project_id })
            }).catch((ex: any) => {
                console.error('ERROR PUSHING', ex);
            });
        } else {
            const https = require('https');
            const req = https.request({
                hostname: HOST, path: PATH,
                port: 443,
                method: 'POST', headers: { 'Content-Type': 'application/json' }
            });
            req.on('error', (error: any) => console.error('ERROR PUSHING', error));
            const requestBody = JSON.stringify({ ...body, pid: project_id });
            req.write(requestBody);
            req.end();
        }
    } catch (ex) {
        console.error('ERROR PUSHING', ex)
    }
}
