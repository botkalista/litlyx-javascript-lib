"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRequest = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const HOST = 'https://broker.litlyx.com';
const PATH = '/v1/metrics/push';
/**
 * @param project_id - Project id on Litlyx dashboard
 * @param body- Content of the request
 *
 * Send a POST request
 */
function sendRequest(project_id, body) {
    (0, node_fetch_1.default)(HOST + PATH, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...body, pid: project_id })
    }).catch((ex) => {
        console.error('ERROR PUSHING', ex);
    });
}
exports.sendRequest = sendRequest;
