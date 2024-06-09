# DeMask

A pricing tool for professional painters & decorators.

# Deploy a Next.js app to AWS with a CI/CD pipeline using GitHub Actions.

## Log into AWS console and create a new EC2 instance.

```markdown
- Choose region.
- Name your server.
- Assign application and OS image - I used Ubuntu.
- kept defaults 64-bit (x86) architecture, t2.micro free tier.
- Created a new key pair. Save the file for later use.
- Selected allow SSH traffic from my IP and GitHub Actions IP range.
- Allow HTTPS and HTTP.
- Click edit to rename security group and change description to something else.
- Click launch instance
```

## How to connect to EC2 instance with SSL from command line.

Move the .pem key pair encryption file you saved earlier to a .ssh file in you repository and add it to the .gitignore folder.

1. Click into the EC2 instance you just created and click the connect button.
2. Run the command `chmod 400 ".ssl/name-key-pair.pem”`
3. Click the SSH tab and run the 'Example'command' and edit the file path for the .pem file.
   `ssh -i ".ssl/name-key-pair.pem" ubuntu@ec2-46-3-eu-west1.compute.amazonaws.com`
4. You should see the terminal prompt change to ubuntu-<ip-address>

---

## Install node, npm, pm2 process manager and git on the EC2 instance.

Setup the EC2 instance

```bash
sudo apt update
sudo apt upgrade
```

Install Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Test Node install with command `node --version`

`npm` will be installed alongside Node

Install Git

```bash
sudo apt install git
```

Install pm2

```bash
sudo npm install pm2 -g
```

Now cd into the repo main directory and install dependencies, build and start app

```bash
cd <main dir>
npm install
npm run build
pm2 start "npm start"
```

---

## Setting up GitHub Actions to deploy to EC2 instance

1. Create a **`.github/workflows` directory in your Next.js project.**
2. Add a workflow file `deploy.yml` to the directory.

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
        uses: actions/checkout@v4

      - name: Set up Node.js environment
        uses: actions/setup-node@v4
        with:
          node-version: "20"

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
            cd </path/to/remote/app>
            git pull origin main
            npm install
            npm run build
            pm2 restart all
```

1. Store the secrets on your GitHub repository’s secrets
   • Go to your repository on GitHub.
   • Navigate to `Settings` > `Secrets` > `Actions`.
   • Add `AWS_EC2_HOST` (the public IP or DNS of your EC2 instance).
   • Add `AWS_EC2_USER` (usually `ec2-user` for Amazon Linux AMI or `ubuntu` for Ubuntu).
   • Add `AWS_EC2_KEY` (your private SSH key). (include footer and header)
2. Add security group on AWS
   • Go back to the AWS console > EC2 and click into your instance.
   • Click security tab and select the security group.
   • Edit inbound rules
   • Add `custom TCP` rule for `port 3000` source anywhere.
   • Add new `SSH` rule for source anywhere `0.0.0.0/0` or GitHub Actions IP range need to dynamically add this in the YML file.
3. Test the deployment.
   • Push a change to the main branch of your GitHub repo
   • The new pipeline should trigger automatically, build the application and deploy the the EC2 instance.
   • Use your IP address for the instance followed by :3000 `<ip-address>:3000`

Congratulations! You now have a fully functioning CI/CD pipeline to your EC2 instance

<aside>
💡 TODO the SSL is not as secure as it could be. Restricting access to the SSH port to only known IP addresses reduces the attack surface significantly. Whatever issue might arise (private key leaks, 0-day in SSH, etc.), it can only be exploited by an attacker coming from those specific IP addresses. Otherwise the attacker can access the port from anywhere, which is especially bad in case of an unpatched SSH vulnerability with an exploit available in the wild. `UPDATE the YML file`  to dynamically add the GitHub Actions IP address to the security gorup

</aside>

### Additional Tips:

- **Security**: Ensure your EC2 instance's security group only allows incoming connections from trusted IP addresses.
- **Cost Management**: Monitor your AWS usage to avoid unexpected costs.
- **Logging & Monitoring**: Implement logging and monitoring to keep track of your application's health.

By following these steps, you can establish a robust CI/CD pipeline that automatically deploys your Next.js application to AWS whenever you push changes to your GitHub repository.

THIS is a minor change to test the pipe.....
