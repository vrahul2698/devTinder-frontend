# Dev Tinder

- create a VITE + React application
- Remove Unneccessary code and create an Hello world app
- Install Tailwind Css
- Install Daisy UI
- Add NavBar Component to APP.jsx
- Create an Navbar.jsx separate component file
- Install React Router dom
- Create Browserrouter > routes > route = /Body > RouteChildren
- Create an outlet in an Body Component
  -Create an Footer in an Body Component
- create an login Component
- created edit profile
- created home page to gie requests to people
- created an connection page
- added review requests

Body
Navbar
Route =/ => Feed
Route/sigin =/ => Login
Route/Connections =/ => Connections
Route/profile =/ => Profile

    #Deployment

    - signin on AWS EC2
    - launch instance
    - create keyvalue pair chmod 400 <secret>.pem
    - ssh -i "devTinder-secret.pem" ubuntu@ec2-13-60-24-137.eu-north-1.compute.amazonaws.com -(LOgged into my machine)
    - install the node version v22.18.0
    - clone the frontend and backend from github https to the EC2
    - Frontend
        - npm install -> dependencies install
        - npm run build
        - sudo apt update
        - sudo apt install nginx
        - sudo systemctl start nginx
        - sudo systemctl enable nginx
        - copy code frm dist(build files) folder to /var/www/html/
        - sudo scp -r dist/* /var/www/html
        - enable port 80 of your instance

    - BAckend
        -   updated Db password if altlas
        - allowed ec2 instance public Ip on mongo server 3000
        - installed pm2 -> npm install pm2 -g
        - pm2 start npm -- start
        - to see logs -> pm2 logs
        - pm2 list , pm2 flush <name> , pm2 stop <name> , pm2 delete <name>
        - pm2 start npm --name "<name>" -- start
        - config ngnix /etc/nginx/sites-available/default
        - restart nginx sudo systemctl restart nginx
        - modify the frontend BASEURL in frnted project to "/api"


forntend = 13.60.24.137
backend = http://13.60.24.137:3000/

if domain name
forntend = devtinder.com
backend = devtinder.com/:3000 => devtinder.com/api

        nginx config:



                server_name 13.60.24.137;

        location /api/ {
                proxy_pass http://localhost:3000/;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }

  # Adding  a custom domain name

        - purchased domain name from godaddy
        - signup on cloudflare & add a new domain name
        - change the nameservers on godaddy and point it to cloudflare
        - wait for smetime till your nameservers are updated


#Sending Emails via SES

        - create an IAM user
        - GIve access to AmazonSESFullAccess
        - Amazon SES: Create an Identity
        - VErify your domain name
        - Verify an email address
        - Install AWS SDK - V3
        - code Example = https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/ses#code-examples


# scheduling cron jobs in NodeJS
        - installing node-cron
        - learning about cron expressions syntax = crontab guru
        - schedule a job
        - date -fns
        - Find all the unique email id who got connection request in previous day
        - Send EMail 
        - Explore queue mechanism to send buld email
        - Amazon ses bulk email
        - Make SendEMail Function dynamic