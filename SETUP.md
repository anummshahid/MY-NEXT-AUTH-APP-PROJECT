# Quick Setup Guide

## 1. Install Dependencies

```bash
npm install
```

## 2. Set Up Environment Variables

1. Copy the template:
   ```bash
   cp env.template .env.local
   ```

2. Generate NEXTAUTH_SECRET:
   ```bash
   openssl rand -base64 32
   ```
   Copy the output and paste it as `NEXTAUTH_SECRET` in `.env.local`

3. Get OAuth Credentials:

   **Google:**
   - Go to https://console.cloud.google.com/
   - Create OAuth 2.0 credentials
   - Add redirect URI: `http://localhost:3000/api/auth/callback/google`

   **GitHub:**
   - Go to https://github.com/settings/developers
   - Create OAuth App
   - Set callback: `http://localhost:3000/api/auth/callback/github`

   **Facebook:**
   - Go to https://developers.facebook.com/
   - Create app with Facebook Login
   - Set redirect URI: `http://localhost:3000/api/auth/callback/facebook`

4. Fill in all credentials in `.env.local`

## 3. Run Development Server

```bash
npm run dev
```

## 4. Open Browser

Navigate to http://localhost:3000

## 5. Initialize Git (Optional)

If you have Git installed:
```bash
git init
git add .
git commit -m "Initial commit: Next.js auth project"
```

## Troubleshooting

- If you see "NEXTAUTH_SECRET is not set", make sure `.env.local` exists and has the secret
- If OAuth doesn't work, verify callback URLs match exactly in provider dashboards
- For production, update `NEXTAUTH_URL` to your domain

