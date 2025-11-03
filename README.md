# Math Race for Kids - Deployment Guide

This guide provides instructions on how to build this React application locally using Docker and deploy it to GitHub Pages.

A build system (Vite) has been added to this project to bundle the code into static HTML, CSS, and JavaScript files that can be hosted on any static web host.

## Prerequisites

1.  **Docker:** You must have Docker installed and running on your local machine.
2.  **GitHub Repository:** You need a GitHub repository to host your project's code and the final deployed site.
3.  **Node.js & npm:** Required for installing dependencies if you choose to build outside of Docker.

## Step 1: Project Setup

Before you can build the project, you need to configure it for your GitHub repository.

1.  **Install Dependencies:** Open your terminal in the project root and run:
    ```bash
    npm install
    ```

2.  **Configure Base Path:** Open `vite.config.ts` and change the `base` property from `/<YOUR_REPOSITORY_NAME>/` to match your GitHub repository's name. For example, if your repository URL is `https://github.com/your-username/math-race`, you should change the line to:
    ```typescript
    base: '/math-race/',
    ```
    This step is crucial for ensuring the app's assets load correctly on GitHub Pages.

## Step 2: Build the Application Locally with Docker

Using Docker ensures you have the correct environment for building the application without needing to manage Node.js versions locally.

1.  **Build the Docker Image:** In the project's root directory, run the following command to build a Docker image named `math-race-builder`.
    ```bash
    docker build -t math-race-builder .
    ```

2.  **Extract the Build Artifacts:** These commands will create a temporary container from the image, copy the `dist` folder (which contains the production-ready website) from the container to your local machine, and then remove the container.
    ```bash
    # Create a temporary container
    docker create --name math-race-container math-race-builder

    # Copy the /app/dist folder from the container to your current directory
    docker cp math-race-container:/app/dist ./dist

    # Remove the temporary container
    docker rm math-race-container
    ```

After these steps, you will have a `dist` folder in your project directory. This folder contains the complete, optimized website ready for deployment.

## Step 3: Deploy to GitHub Pages

We will deploy the contents of the `dist` folder to a special branch named `gh-pages` in your repository. GitHub Pages will automatically serve the files from this branch.

1.  **Navigate into the `dist` directory:**
    ```bash
    cd dist
    ```
    **Important:** The following commands must be run from *inside* the `dist` directory.

2.  **Initialize a new Git repository:**
    ```bash
    git init
    git checkout -b gh-pages
    ```

3.  **Add and commit the files:**
    ```bash
    git add .
    git commit -m "Deploy to GitHub Pages"
    ```

4.  **Add your remote repository:** Replace `<YOUR_REPOSITORY_URL>` with your actual repository URL (e.g., `https://github.com/your-username/math-race.git`).
    ```bash
    git remote add origin <YOUR_REPOSITORY_URL>
    ```

5.  **Push to the `gh-pages` branch:** The `-f` (force) flag is used to overwrite the history of the `gh-pages` branch on each deployment, which is a common practice for this type of deployment.
    ```bash
    git push -f origin gh-pages
    ```

6.  **Configure GitHub Pages:**
    *   Go to your repository on GitHub.
    *   Click on **Settings** > **Pages**.
    *   Under "Build and deployment", for the **Source**, select **Deploy from a branch**.
    *   For the **Branch**, select `gh-pages` and `/ (root)`.
    *   Click **Save**.

Your website should be live at `https://<your-username>.github.io/<your-repository-name>/` within a few minutes.
