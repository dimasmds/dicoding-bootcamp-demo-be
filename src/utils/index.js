import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

function generateId(prefix) {
  return `${prefix}-${crypto.randomBytes(16).toString('hex')}`;
}

const config = {
  supabase: {
    anonKey: process.env.SUPABASE_ANON_KEY,
    project: process.env.SUPABASE_PROJECT,
  }
};

export { generateId, config };
