import { isClient } from './utils';

const HOST = 'broker.litlyx.com';
const PATH = '/v1/metrics/push';

/**
 * @param project_id - Project id on Litlyx dashboard
 * @param body - Content of the request
 * 
 * Send a POST request
 */
export function sendRequest(project_id: string, body: Record<string, any>, testMode: boolean = false) {

    const currentHost = testMode ? 'http://127.0.0.1:8088' : 'https://' + HOST;

    try {
        if (isClient()) {
            fetch(currentHost + PATH, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...body, pid: project_id })
            }).catch((ex: any) => {
                console.error('ERROR PUSHING', ex);
            });
        } else {
            const httLib = testMode ? require('http') : require('https');
            const req = httLib.request({
                hostname: testMode ? '127.0.0.1' : HOST, path: PATH,
                port: testMode ? 8088 : 443,
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
