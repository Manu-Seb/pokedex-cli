export type CacheEntry<T> = {
    createdAt: number;
    val: T;
};

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalid: NodeJS.Timeout | undefined = undefined;
    #interval: number = 0;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    add<T>(key: string, val: T) {
        const entry: CacheEntry<T> = {
            createdAt: Date.now(),
            val,
        };
        this.#cache.set(key, entry);
    }

    get<T>(key: string): CacheEntry<T> | undefined {
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
