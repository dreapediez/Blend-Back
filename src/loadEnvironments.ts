import "dotenv/config";

const {
  PORT: port,
  DEBUG: debug,
  SECRET: secret,
  MONGODB_URL: mongodbUrl,
  MONGODB_NAME: mongodbName,
  SUPABASE_URL: supabaseUrl,
  SUPABASE_KEY: supabasekey,
  SUPABASE_STORAGE_NAME: supabaseStorageName,
  ALLOWED_ORIGINS: allowedOrigins,
} = process.env;

interface Environments {
  port: number;
  debug: string;
  secret: string;
  mongodb: {
    url: string;
    name: string;
  };
  supabase: {
    url: string;
    key: string;
    storageName: string;
  };
  allowedOrigins: string[];
}

const environments: Environments = {
  port: +port || 4001,
  debug,
  secret,
  mongodb: {
    url: mongodbUrl,
    name: mongodbName,
  },
  supabase: {
    url: supabaseUrl,
    key: supabasekey,
    storageName: supabaseStorageName,
  },
  allowedOrigins: allowedOrigins?.split(",") ?? [],
};

export default environments;
