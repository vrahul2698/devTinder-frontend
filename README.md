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


