/**
 * @param project_id - Project id on Litlyx dashboard
 * @param body - Content of the request
 *
 * Send a POST request
 */
export declare function sendRequest(project_id: string, body: Record<string, any>, testMode?: boolean): void;
export declare function sendKeepAlive(project_id: string, body: Record<string, any>, testMode?: boolean): void;
