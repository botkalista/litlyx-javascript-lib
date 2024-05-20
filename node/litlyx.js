"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lit = void 0;
const requester_1 = require("./requester");
const utils_1 = require("./utils");
/**
 * Represents a class with functionalities for analytics integration, session management, and event tracking.
 */
class Litlyx {
    project_id;
    initialized = false;
    settings;
    hooked = false;
    /**
     * Initializes the analytics with project ID and optional settings.
     * @param {string} project_id - The project identifier.
     * @param {Settings} [settings] - Optional settings for initialization.
     */
    init(project_id, settings) {
        if (this.initialized)
            return console.warn('Already initialized');
        this.initialized = true;
        this.project_id = project_id;
        this.settings = {
            testMode: false,
            ...settings
        };
        if (!(0, utils_1.isClient)())
            return;
        this.pushVisit();
        this.hookHistory();
        (0, requester_1.sendKeepAlive)(project_id, { website: location.hostname, userAgent: navigator.userAgent || '', instant: true }, this.settings?.testMode);
        setInterval(() => {
            (0, requester_1.sendKeepAlive)(project_id, { website: location.hostname, userAgent: navigator.userAgent || '' }, this.settings?.testMode);
        }, 1000 * 60 * 1);
    }
    hookHistory() {
        if (this.hooked)
            return;
        this.hooked = true;
        const me = this;
        const nativePushState = history.pushState;
        history.pushState = function (data, title, url) {
            nativePushState.apply(this, [data, title, url]);
            me.pushVisit();
        };
        addEventListener('popstate', () => me.pushVisit());
    }
    /**
     *
     * @param {string} name - Name of the event to log
     * @param {PushOptions} options - Optional: push options
     */
    event(name, options) {
        if (!this.initialized)
            return console.error('Not initialized');
        if (!this.project_id)
            return console.error('project_id is required');
        const metadata = options?.metadata ? JSON.stringify(options.metadata) : undefined;
        const type = 1;
        (0, requester_1.sendRequest)(this.project_id, { name, metadata, type }, this.settings?.testMode);
    }
    /**
     * Triggers a page visit event using current settings.
     */
    pushVisit() {
        if (!(0, utils_1.isClient)())
            return;
        if (!this.initialized)
            return console.error('Not initialized');
        if (!this.project_id)
            return console.error('project_id is required');
        if (!this.settings)
            return console.error('You must call init before pushing');
        this.pushPageVisit(location.hostname, location.pathname, (document.referrer || 'self'), (innerWidth || 0), (innerHeight || 0), navigator.userAgent || '');
    }
    /**
     * Sends a detailed page visit event to the server.
     * @param {string} website - Website name or identifier.
     * @param {string} page - Current page path.
     * @param {string} referrer - Referrer URL.
     * @param {number} screenWidth - Screen width in pixels.
     * @param {number} screenHeight - Screen height in pixels.
     * @param {string} userAgent - Browser user agent.
     * @param {Record<string, (string | number)>} [metadata] - Additional metadata.
     */
    async pushPageVisit(website, page, referrer, screenWidth, screenHeight, userAgent, metadata) {
        if (!this.initialized)
            return console.error('Not initialized');
        if (!this.project_id)
            return console.error('project_id is required');
        await (0, requester_1.sendRequest)(this.project_id, {
            website, page, referrer,
            screenWidth, screenHeight,
            userAgent, metadata, type: 0
        }, this.settings?.testMode);
    }
}
/**
 * Singleton instance of LitClass, accessible for import and use in other files.
 */
exports.Lit = new Litlyx();
if ((0, utils_1.isClient)()) {
    // Check if the script is imported with [data-project] and call init
    const scriptElem = document.querySelector('script[data-project]');
    if (scriptElem) {
        const project_id = scriptElem.getAttribute('data-project');
        const testMode = scriptElem.getAttribute('data-test-mode');
        if (project_id) {
            exports.Lit.init(project_id, { testMode: testMode == 'true' });
        }
    }
}
