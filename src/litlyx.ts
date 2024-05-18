import { sendKeepAlive, sendRequest } from "./requester";
import { isClient } from "./utils";


export type Settings = {
    testMode?: boolean,
}


export type PushOptions = {
    metadata?: Record<string, (string | number)>
}


/**
 * Represents a class with functionalities for analytics integration, session management, and event tracking.
 */
class Litlyx {

    private project_id?: string;
    private initialized: boolean = false;
    private settings?: Required<Settings>;
    private hooked: boolean = false;


    /**
     * Initializes the analytics with project ID and optional settings.
     * @param {string} project_id - The project identifier.
     * @param {Settings} [settings] - Optional settings for initialization.
     */
    init(project_id: string, settings?: Settings) {
        if (this.initialized) return console.warn('Already initialized');
        this.initialized = true;
        this.project_id = project_id;

        this.settings = {
            testMode: false,
            ...settings
        }

        if (!isClient()) return;

        this.pushVisit();
        this.hookHistory();


        setInterval(() => {
            sendKeepAlive(project_id, { website: location.hostname, userAgent: navigator.userAgent || '' }, this.settings?.testMode);
        }, 1000 * 60 * 1)


    }

    private hookHistory() {

        if (this.hooked) return;
        this.hooked = true;

        const me = this;
        const nativePushState = history.pushState;
        history.pushState = function (data: any, title: any, url: any) {
            nativePushState.apply(this, [data, title, url]);
            me.pushVisit();
        }

        addEventListener('popstate', () => me.pushVisit());
    }

    /**
     * 
     * @param {string} name - Name of the event to log
     * @param {PushOptions} options - Optional: push options
     */
    public event(name: string, options?: PushOptions) {
        if (!this.initialized) return console.error('Not initialized');
        if (!this.project_id) return console.error('project_id is required');
        const metadata = options?.metadata ? JSON.stringify(options.metadata) : undefined;
        const type = 1;
        sendRequest(this.project_id, { name, metadata, type }, this.settings?.testMode);
    }

    /**
     * Triggers a page visit event using current settings.
     */
    public pushVisit() {

        if (!isClient()) return;

        if (!this.initialized) return console.error('Not initialized');
        if (!this.project_id) return console.error('project_id is required');
        if (!this.settings) return console.error('You must call init before pushing');

        this.pushPageVisit(
            location.hostname,
            location.pathname,
            (document.referrer || 'self'),
            (innerWidth || 0),
            (innerHeight || 0),
            navigator.userAgent || ''
        );
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
    private async pushPageVisit(website: string, page: string, referrer: string, screenWidth: number, screenHeight: number, userAgent: string, metadata?: Record<string, (string | number)>) {

        if (!this.initialized) return console.error('Not initialized');
        if (!this.project_id) return console.error('project_id is required');

        await sendRequest(this.project_id, {
            website, page, referrer,
            screenWidth, screenHeight,
            userAgent, metadata, type: 0
        }, this.settings?.testMode);

    }

}

/**
 * Singleton instance of LitClass, accessible for import and use in other files.
 */
export const Lit = new Litlyx();



if (isClient()) {
    // Check if the script is imported with [data-project] and call init
    const scriptElem = document.querySelector('script[data-project]');
    if (scriptElem) {
        const project_id = scriptElem.getAttribute('data-project');
        const testMode = scriptElem.getAttribute('data-test-mode');
        if (project_id) {
            Lit.init(project_id, { testMode: testMode == 'true' });
        }
    }
}
