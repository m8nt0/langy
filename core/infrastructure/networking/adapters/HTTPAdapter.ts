// core/infrastructure/networking/adapters/HTTPAdapter.ts

interface HTTPConfig {
    baseUrl: string;
    timeout: number;
    headers?: Record<string, string>;
}

export class HTTPAdapter {
    private config: HTTPConfig;

    constructor(config: HTTPConfig) {
        this.config = config;
    }

    async get(path: string, params?: any): Promise<any> {
        const url = new URL(path, this.config.baseUrl);

        // If params is defined as follows:

        // javascript

        // const params = {
        //     search: "books",
        //     sort: "asc",
        //     page: 2
        // };

        // And url is a URL object:

        // javascript

        // const url = new URL("https://www.example.com");

        if (params) {
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        }

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: this.config.headers,
            signal: AbortSignal.timeout(this.config.timeout)
        });

        return await response.json();
    }

    async post(path: string, data: any): Promise<any> {
        const response = await fetch(`${this.config.baseUrl}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...this.config.headers
            },
            body: JSON.stringify(data),
            signal: AbortSignal.timeout(this.config.timeout)
        }); 
        return await response.json()
    }

    async put(path: string, data: any): Promise<any> {
        const response = await fetch(`${this.config.baseUrl}${path}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...this.config.headers,
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    async delete(path: string): Promise<any> {
        const response = await fetch(`${this.config.baseUrl}${path}`, {
            method: 'DELETE',
            headers: this.config.headers
        });
        return await response.json()
    }
}