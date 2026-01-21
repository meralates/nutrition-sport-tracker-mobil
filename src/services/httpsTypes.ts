export type ApiResponse<T> = {
  data: T;
  message?: string;
};

export type ApiError = {
  status?: number;
  code?: string;
  message: string;
  details?: any;
};

export type Paginated<T> = {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
};
