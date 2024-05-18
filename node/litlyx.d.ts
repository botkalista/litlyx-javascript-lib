export type Settings = {
    testMode?: boolean;
};
export type PushOptions = {
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
