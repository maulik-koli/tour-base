
export interface ApiResponse<T> {
    status: number;
    message: string;
    data?: T;
}

export interface ApiError {
    status: number;
    message: string;
}

export type PaginationType = {
    page: number;
    limit: number;
    totalPages: number;
    totalItems: number;
    isPrevPage: boolean;
    isNextPage: boolean;
}