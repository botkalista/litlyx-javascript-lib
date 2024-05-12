export type Settings = {
    autoPageVisit?: boolean;
    customSession?: string;
};
export type PushOptions = {
    session?: string;
    metadata?: Record<string, (string | number)>;
};
/**
 * Represents a class with functionalities for analytics integration, session management, and event tracking.
 */
declare class Litlyx {
    private project_id?;
    private initialized;
    private settings?;
    private hooked;
    /**
     * Initializes the analytics with project ID and optional settings.
     * @param {string} project_id - The project identifier.
     * @param {Settings} [settings] - Optional settings for initialization.
     */
    init(project_id: string, settings?: Settings): void;
    private hookHistory;
    /**
     * Generates a random session ID.
     * @returns {string} - A new session ID.
     */
    private generateSession;
    /**
    * Retrieves or generates a session ID based on current settings.
    * @returns {string} - The current or a new session ID.
    */
    private getSession;
    /**
     * Updates the session storage with the new session ID.
     * @param {string} session - The session ID to be stored.
     */
    updateSession(session: string): void;
    /**
     *
     * @param {string} name - Name of the event to log
     * @param {PushOptions} options - Optional: push options
     */
    event(name: string, options?: PushOptions): void;
    /**
     * Triggers a page visit event using current settings.
     */
    pushVisit(): void;
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
    private pushPageVisit;
}
/**
 * Singleton instance of LitClass, accessible for import and use in other files.
 */
export declare const Lit: Litlyx;
export {};
