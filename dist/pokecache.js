export class Cache {
    #cache = new Map();
    #reapIntervalid = undefined;
    #interval = 0;
    constructor(interval) {
        this.#interval = interval;
        this.#startReapLoop();
    }
    add(key, val) {
        const entry = {
            createdAt: Date.now(),
            val,
        };
        this.#cache.set(key, entry);
    }
    get(key) {
        return this.#cache.get(key);
    }
    stopReapLoop() {
        clearInterval(this.#reapIntervalid);
        this.#reapIntervalid = undefined;
    }
    #reap() {
        const minTime = Date.now() - this.#interval;
        for (const [key, entry] of this.#cache.entries()) {
            if (entry.createdAt < minTime) {
                this.#cache.delete(key);
            }
        }
    }
    #startReapLoop() {
        this.#reapIntervalid = setInterval(() => this.#reap(), this.#interval);
    }
}
