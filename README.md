# Saasden Dashboard

## Before using

- Please make sure that you have:
 - Node.js installed (https://nodejs.org/)
 - Setup Environment variables
   - Create .env.development file and paste these variables with your own values
      ```bash
            NEXT_PUBLIC_DOMAIN=http://localhost:3000
            NEXT_PUBLIC_JWT_SECRET=<random_secret>
            NEXT_PUBLIC_GOOGLE_CLIENT_ID=
            NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=
            NEXT_PUBLIC_GITHUB_CLIENT_ID=
            NEXT_PUBLIC_GITHUB_CLIENT_SECRET=
            NEXT_PUBLIC_PIESOCKET_API_KEY=
            NEXT_PUBLIC_PIESOCKET_CLUSTER_ID=
      ```
 - Add Redirect URIs to your google and github OAuth App
  - `http://localhost:3000/api/auth/callback/google`
  - `http://localhost:3000/api/auth/callback/github`

## Usage

To run the project, please use the following commands:
 - `npm install`
 - `npm run dev`
    - Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment Link
 - [https://saasden-red.vercel.app/](https://saasden-red.vercel.app/)