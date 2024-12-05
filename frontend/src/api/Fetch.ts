export class Fetch {
  static readonly api: string = "https://localhost:5000";
  static async post<T>(data: T, endpoint: string): Promise<T> {
    const response = await fetch(`${this.api}/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("gagal post data");
    }
    return response.json();
  }
  static async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.api}/${endpoint}`);
    if (!response.ok) {
      throw new Error("gagal get data");
    }
    return response.json()
  }
}
