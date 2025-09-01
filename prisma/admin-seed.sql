-- Use pgcrypto to hash the password on the server
CREATE EXTENSION IF NOT EXISTS pgcrypto;

INSERT INTO admin_users (username, password_hash)
VALUES ('altoadmin', crypt('altoproperty2025@@', gen_salt('bf', 12)))
ON CONFLICT (username) DO NOTHING;


