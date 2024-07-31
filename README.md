# MinIO Setup and Integration with NestJS

This guide will help you set up MinIO using Docker and integrate it with your NestJS application. You will create a
bucket, generate access keys, set the region, and configure your application to use these details.

## Prerequisites

- Docker installed on your machine
- Node.js and NestJS set up in your development environment

## Step 1: Run the Docker container:

```bash 
  docker-compose up -d
```

## Step 2: Access MinIO and Create a Bucket

1. Open your browser and go to `http://localhost:9001`.
2. Log in using the credentials specified in the `docker-compose.yml` file (`user` and `password`).
3. Create a new bucket

## Step 3: Generate Access Keys and Set Region

1. Navigate to the "Access Keys" section in the MinIO console.
2. Create a new access key.
3. Navigate to the "Configuration" section in the MinIO console.
4. Set the region for your MinIO instance.

## Step 4: Configure Environment Variables

Create a `.env` file in the root of your NestJS project and add the following variables. Replace the placeholders with
the actual values from your MinIO setup.

```
S3_REGION=your-region
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
S3_ENDPOINT=http://localhost:9000
```

## Step 5: Install Dependencies and Run the Application

Run the following commands to install the necessary dependencies and start your NestJS application:

```bash
npm install
npm run dev
```

By following these steps, you will set up MinIO using Docker, configure access keys and region, and integrate it with
your NestJS application.
