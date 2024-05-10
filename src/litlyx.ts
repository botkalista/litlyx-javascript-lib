import fetch from 'node-fetch';

const HOST = 'https://broker.litlyx.com';
const PATH = '/v1/metrics/push';


type Framework = 'Vanilla' | 'Nuxt' | 'Next' | 'Vue' | 'Angular' | 'React';

/**
 * Settings type, represents optional settings for initializing LitClass.
 */
export type Settings = {
    autoPageVisit?: boolean,          // Automatically tracks page visits if set to true
    customSession?: string,           // Allows specifying a custom session ID
    serverMode?: boolean,             // Enables server mode, affecting session handling and metrics pushing
    customServer?: string,
    framework?: {
        name: Framework,
        settings?: any,
    }
}

/**
 * PushOptions type, used when triggering events to include session and metadata.
 */
export type PushOptions = {

    // Specifies the session ID to use, if not provided, the current session will be used
    session?: string,

    // Additional metadata for the event
    metadata?: Record<string, (string | number)>
}


/**
 * Represents a class with functionalities for analytics integration, session management, and event tracking.
 */
class LitClass {

    private project_id?: string;
    private settings?: Required<Settings>;
    private initialized: boolean = false;

    /**
     * Generates a random session ID.
     * @returns {string} - A new session ID.
     */
    private generateSession() {
        const sessionID = (Math.random() * Date.now()).toFixed(0);
        return sessionID;
    }

    /**
     * Retrieves or generates a session ID based on current settings.
     * @returns {string} - The current or a new session ID.
     */
    private getSession() {
        if (!this.settings) return 'NO_SESSION';
        if (this.settings.serverMode) return 'SERVER_SESSION';
        const sessionID = sessionStorage.getItem('lit-user-session');
        if (sessionID) return sessionID;
        const newSessionID = this.generateSession();
        this.settings.customSession = newSessionID;
        this.updateSession(newSessionID);
        return newSessionID;
    }

    /**
     * Updates the session storage with the new session ID.
     * @param {string} session - The session ID to be stored.
     */
    public updateSession(session: string) {
        if (this.settings?.serverMode) return;
        sessionStorage.setItem('lit-user-session', session);
    }

    /**
     * Initializes the analytics with project ID and optional settings.
     * @param {string} project_id - The project identifier.
     * @param {Settings} [settings] - Optional settings for initialization.
     */
    public init(project_id: string, settings?: Settings) {
        if (this.initialized) return console.warn('Already initialized');
        this.initialized = true;
        this.project_id = project_id;
        this.settings = {
            autoPageVisit: true,
            serverMode: false,
            customSession: this.generateSession(),
            customServer: HOST,
            framework: { name: 'Vanilla' },
            ...settings
        }

        if (this.settings.autoPageVisit && !this.settings.serverMode) this.pushVisit();

        if (this.settings.framework.name == 'Vanilla') return;

        if (this.settings.framework.name === 'Nuxt') return this.initNuxtVue();
        if (this.settings.framework.name === 'Vue') return this.initNuxtVue();

        if (this.settings.framework.name === 'React') this.initReact();

    }


    private initNuxtVue() {
        if (!this.settings) return console.error('Settings is undefined');
        if (!this.settings.framework.settings.router) return console.warn('Router is not passed to framework.settings.router');
        this.settings.framework.settings.router.afterEach(() => this.pushVisit());
    }

    private initReact() {
        if (!this.settings) return console.error('Settings is undefined');
        if (!this.settings.framework.settings.useEffect) return console.warn('useEffect is not passed to framework.settings.useEffect');
        if (!this.settings.framework.settings.useLocation) return console.warn('useLocation is not passed to framework.settings.useLocation');

        this.settings.framework.settings.useEffect(() => {
            this.pushVisit();
        }, [this.settings.framework.settings.useLocation()]);

    }



    /**
     * Tracks an event with specified name and options.
     * @param {string} name - The name of the event.
     * @param {PushOptions} [options] - Optional parameters like session and metadata.
     */
    public event(name: string, options?: PushOptions) {
        const session = options?.session || this.getSession();
        const metadata = options?.metadata ? JSON.stringify(options.metadata) : undefined;
        const type = 1;
        this.httpRequest({ name, session, metadata, type });
    }

    /**
     * Triggers a page visit event using current settings.
     */
    public pushVisit() {
        if (!this.settings) return console.warn('You must call init before pushing');
        this.pushPageVisit(
            this.settings.serverMode ? 'SERVER' : location.hostname,
            this.settings.serverMode ? '/server' : location.pathname,
            this.settings.serverMode ? 'server' : (document.referrer || 'self'),
            this.getSession(),
            this.settings.serverMode ? 0 : (innerWidth || 0),
            this.settings.serverMode ? 0 : (innerHeight || 0),
            navigator.userAgent || ''
        );
    }

    /**
     * Sends a detailed page visit event to the server.
     * @param {string} website - Website name or identifier.
     * @param {string} page - Current page path.
     * @param {string} referrer - Referrer URL.
     * @param {string} session - Session identifier.
     * @param {number} screenWidth - Screen width in pixels.
     * @param {number} screenHeight - Screen height in pixels.
     * @param {string} userAgent - Browser user agent.
     * @param {Record<string, (string | number)>} [metadata] - Additional metadata.
     */
    private pushPageVisit(website: string, page: string, referrer: string, session: string, screenWidth: number, screenHeight: number, userAgent: string, metadata?: Record<string, (string | number)>) {
        this.httpRequest({ website, page, referrer, session, screenWidth, screenHeight, userAgent, metadata, type: 0 })
    }

    /**
     * Makes an HTTP request to the configured endpoint to push data.
     * @param {Record<string, any>} body - The data to be sent in the HTTP request.
     */
    private httpRequest(body: Record<string, any>) {
        fetch((this.settings?.customServer || HOST) + PATH, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pid: this.project_id, ...body })
        }).catch((ex: any) => {
            console.error('ERROR PUSHING', ex);
        });
    }

}


/**
 * Singleton instance of LitClass, accessible for import and use in other files.
 */
export const Lit = new LitClass();
