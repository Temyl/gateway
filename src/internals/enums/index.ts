export enum Role {
    LANLORD = 'lanlord',
    CORPER = 'corper',
    AGENT = 'agent',
    ADMIN = 'admin'
}

export enum FileSize {
  BYTE = 1,
  KB = 1_024 * BYTE,
  MB = 1_024 * KB,
}

export enum DURATION {
  SECONDS = 1_000,
  MINUTES = 60 * SECONDS,
  HOURS = 60 * MINUTES,
  DAYS = 24 * HOURS,
}

export enum AppEnv {
    PRODUCTION = 'production',
    STAGING = 'staging',
    DEVELOPMENT = 'development',
    TEST = 'test',
}

export enum LOGGER_LEVEL {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
  VERBOSE = 'verbose', 
}



