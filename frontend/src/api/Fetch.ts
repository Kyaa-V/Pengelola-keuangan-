export class Fetch {
    static readonly api: string = "http://localhost:5000";
    static async post<T>(data: T, endpoint: string): Promise<T> {
        const response = await fetch(`${this.api}/api${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            return { succes: false, errorData };
        }
        const result = await response.json();
        return { succes: true, datas: result };
    }
    static async get<T>(endpoint: string): Promise<T> {
        const response = await fetch(`${this.api}/api${endpoint}`);

        if (!response.ok) {
            const errorData = await response.json();
            return { succes: false, errorData };
        }
        const result = await response.json();
        return { succes: true, datas: result };
    }
}
