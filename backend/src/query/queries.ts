import { db } from "../application/database";
import { responseError } from "../error/response-error";

export class queries {
    static post = async <T>(query: string, data: T): Promise<any> => {
        return new Promise((resolve, reject) => {
            db.query(query, data, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    };
    static get = async (query: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            db.query(query, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    };
}
