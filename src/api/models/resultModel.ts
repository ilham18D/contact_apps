export interface RequestResult<T> {
    loading: boolean;
    result: T;
    error?: Error;
  }
  