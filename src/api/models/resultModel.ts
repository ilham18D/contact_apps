export interface RequestResult<T> {
    loading: boolean;
    result: any;
    error?: Error;
  }
  