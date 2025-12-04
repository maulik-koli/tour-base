import { CustomError } from "./response";

export const createDbWrapper = <T extends (...args: any[]) => Promise<any>>(
    errorMsg: string, 
    fn: T
) => {
    return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
        try {
            const result = await fn(...args);
            return result as ReturnType<T>;
        }
        catch (error: any) {
            if(error.name == 'MongoServerError' && error.code == 11000) {
                throw new CustomError(409, errorMsg);
            }
            throw error;
        }
    }
}