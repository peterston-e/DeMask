# DeMask

A pricing tool for professional painters & decorators.

Deploying a simple Next.js 14 application to AWS and setting up a CI/CD pipeline using GitHub and GitHub Actions involves several steps. Here's a high-level outline of the process:

1.  **Set Up Your Next.js Application**:

    - Ensure your Next.js app is working locally.
    - Version control your code using Git and push it to a GitHub repository.

2.  **Prepare Your AWS Environment**:

    - Choose a deployment target on AWS (e.g., S3 for static deployment or EC2/Elastic Beanstalk for server-side apps).
    - Set up an AWS account and configure necessary services like EC2 or Elastic Beanstalk.

3.  **EC2 Deployment** (For simplicity, I'll detail an EC2 approach): - **Create an EC2 Instance**: - Go to the AWS Management Console and launch a new EC2 instance. - Select an appropriate Amazon Machine Image (AMI), instance type, and configure security groups. - Make sure you have a key pair to access the EC2 instance via SSH.

        - **Configure EC2 for Next.js**:
          - SSH into your EC2 instance and install Node.js, npm, Git, and any necessary dependencies.
          - Clone your GitHub

    repository onto the instance manually for the initial setup.

        - **Install PM2** (Process Manager) to keep your Next.js app running:
          ```
          npm install pm2 -g
          ```

4.  **Setting Up GitHub Actions**:

    - **Create a `.github/workflows` Directory** in your Next.js project.
    - **Add a Workflow File** (e.g., `deploy.yml`) with the necessary configuration:

      ```yaml
      name: Deploy Next.js App to AWS EC2

      on:
        push:
          branches:
            - main

      jobs:
        deploy:
          runs-on: ubuntu-latest

          steps:
            - name: Checkout code
              uses: actions/checkout@v2

            - name: Set up Node.js environment
              uses: actions/setup-node@v2
              with:
                node-version: "14"

            - name: Install dependencies
              run: npm install

            - name: Build Next.js app
              run: npm run build

            - name: Deploy to EC2
              uses: appleboy/ssh-action@v0.1.2
              with:
                host: ${{ secrets.AWS_EC2_HOST }}
                username: ${{ secrets.AWS_EC2_USER }}
                key: ${{ secrets.AWS_EC2_KEY }}
                script: |
                  cd /path/to/remote/app
                  git pull origin main
                  npm install
                  npm run build
                  pm2 restart all
      ```

    **Explanation**:

    - **Checkout code**: This step fetches your project's latest code from GitHub.
    - **Set up Node.js**: Configures the Node.js environment in the GitHub Action runner.
    - **Install dependencies**: Installs the necessary NPM packages.
    - **Build Next.js app**: Compiles your Next.js application.
    - **Deploy to EC2**: Uses `ssh-action` to SSH into your EC2 instance, pull the latest code, install dependencies, build the application, and restart it.

5.  **Store Secrets in GitHub**:

    - Store the `AWS_EC2_HOST`, `AWS_EC2_USER`, and `AWS_EC2_KEY` in your GitHub repository's secrets:
      - Go to your repository on GitHub.
      - Navigate to `Settings` > `Secrets` > `Actions`.
      - Add `AWS_EC2_HOST` (the public IP or DNS of your EC2 instance).
      - Add `AWS_EC2_USER` (usually `ec2-user` for Amazon Linux AMI or `ubuntu` for Ubuntu).
      - Add `AWS_EC2_KEY` (your private SSH key).

6.  **Test the Deployment**:
    - Push changes to the main branch of your GitHub repository.
    - The GitHub Actions pipeline should trigger automatically, build the application, and deploy it to your EC2 instance.

### Additional Tips:

- **Security**: Ensure your EC2 instance's security group only allows incoming connections from trusted IP addresses.
- **Cost Management**: Monitor your AWS usage to avoid unexpected costs.
- **Logging & Monitoring**: Implement logging and monitoring to keep track of your application's health.

By following these steps, you can establish a robust CI/CD pipeline that automatically deploys your Next.js application to AWS whenever you push changes to your GitHub repository.

THIS is a minor change to test the pipe...
