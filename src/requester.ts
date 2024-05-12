
import fetch from 'node-fetch';

const HOST = 'https://broker.litlyx.com';
const PATH = '/v1/metrics/push';

/**
 * @param project_id - Project id on Litlyx dashboard
 * @param body- Content of the request
 * 
 * Send a POST request
 */
export function sendRequest(project_id: string, body: Record<string, any>) {
    fetch(HOST + PATH, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...body, pid: project_id })
    }).catch((ex: any) => {
        console.error('ERROR PUSHING', ex);
    });
}
