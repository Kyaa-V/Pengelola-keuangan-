interface ApiResponse<T> {
    success: boolean;
    data?: T;
    errorData?: any;
    message?: string;
}

export class Fetch {
    static readonly api: string = "http://localhost:5000";

    static async post<T>(data: T, endpoint: string): Promise<ApiResponse<T>> {
        try {
            const response = await fetch(`${this.api}/api${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                return {
                    succes: false,
                    errorData: result,
                    message: result.message || "Terjadi kesalahan"
                };
            }

            return {
                succes: true,
                datas: result
            };
        } catch (error) {
            return {
                succes: false,
                message: error.message || "Network error"
            };
        }
    }

    static async get<T>(endpoint: string): Promise<ApiResponse<T>> {
        try {
            const response = await fetch(`${this.api}/api${endpoint}`);
            const result = await response.json();

            if (!response.ok) {
                return {
                    succes: false,
                    errorData: result,
                    message: result.message || "Terjadi kesalahan"
                };
            }

            return {
                succes: true,
                datas: result
            };
        } catch (error) {
            return {
                succes: false,
                message: error.message || "Network error"
            };
        }
    }

    static async update<T>( endpoint: string,data: T,): Promise<ApiResponse<T>> {
        try {
            const response = await fetch(`${this.api}/api${endpoint}`, {
                method: "PATCH", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                return {
                    succes: false,
                    errorData: result,
                    message: result.message || "Terjadi kesalahan"
                };
            }

            return {
                succes: true,
                datas: result
            };
        } catch (error) {
            return {
                succes: false,
                message: error.message || "Network error"
            };
        }
    }
}
