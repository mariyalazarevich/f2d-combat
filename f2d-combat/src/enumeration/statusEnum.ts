export const EStatus = {
  idle: 'idle',
  loading: 'loading',
  successfull: 'successfull',
  error: 'error',
} as const;

export type EStatus = (typeof EStatus)[keyof typeof EStatus];
