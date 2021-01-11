# Weatherapp (Eficode)

This is my solution to Eficode's Weatherapp challenge. The application is deployed to Heroku and can be viewed in [What's the Weather?](https://vipotin-weatherapp-client.herokuapp.com) site. Below is the documentation on how to run the application locally or in Docker. In addition, there is a checklist of tasks that are covered in this solution.

## Documentation

Instructions for running the app locally and in Docker and testing the app in Docker. 
### Prerequisites

* An [openweathermap](http://openweathermap.org/) API key.
* [Docker](https://www.docker.com) and [Docker Compose](https://docs.docker.com/compose/) installed.
* Download source files from this repository

### Running app

#### Locally with npm
Start client (frontend) and server (backend) apps in different terminals using `npm i && npm start`

#### In Docker
You can run client and server by using `docker-compose up client server`. Navigate to `localhost:8000` in a browser to interact with the app.

### Testing app
Robot Framework test are run in Chrome with `docker-compose up client data hub chrome` and `docker-compose run test-chrome` (in other terminal).

You can stop all the containers with `docker-compose down`.

## Exercises

Here are some things in different categories that you can do to make the app better. Before starting you need to get yourself an API key to make queries in the [openweathermap](http://openweathermap.org/). You can run the app locally using `npm i && npm start`.

### Docker

*Docker containers are central to any modern development initiative. By knowing how to set up your application into containers and make them interact with each other, you have learned a highly useful skill.*

- [x] Add **Dockerfile**'s in the *frontend* and the *backend* directories to run them virtually on any environment having [docker](https://www.docker.com/) installed. It should work by saying e.g. `docker build -t weatherapp_backend . && docker run --rm -i -p 9000:9000 --name weatherapp_backend -t weatherapp_backend`. If it doesn't, remember to check your api key first.

- [x] Add a **docker-compose.yml** -file connecting the frontend and the backend, enabling running the app in a connected set of containers.

- [x] The developers are still keen to run the app and its pipeline on their own computers. Share the development files for the container by using volumes, and make sure the containers are started with a command enabling hot reload.

### Node and React development

*Node and React applications are highly popular technologies. Understanding them will give you an advantage in front- and back-end development projects.*

- [x] The application now only reports the current weather. It should probably report the forecast e.g. a few hours from now. (tip: [openweathermap api](https://openweathermap.org/forecast5))

- [x] There are [eslint](http://eslint.org/) errors. Sloppy coding it seems. Please help.

- [x] The app currently reports the weather only for location defined in the *backend*. Shouldn't it check the browser location and use that as the reference for making a forecast? (tip: [geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation))

### Testing

*Test automation is key in developing good quality applications. Finding bugs in early stages of development is valuable in any software development project. With Robot Framework you can create integration tests that also serve as feature descriptions, making them exceptionally useful.*

- [x] Create automated tests for the application. (tip: [mocha](https://mochajs.org/)) (only backend)

- [x] Create [Robot Framework](http://robotframework.org/) integration tests. Hint: Start by creating a third container that gives expected weather data and direct the backend queries there by redefining the **MAP_ENDPOINT**.

### Cloud

*The biggest trend of recent times is developing, deploying and hosting your applications in cloud. Knowing cloud -related technologies is essential for modern IT specialists.*

- [x] Set up the weather service in a free cloud hosting service, e.g. [AWS](https://aws.amazon.com/free/) or [Google Cloud](https://cloud.google.com/free/).

### Ansible

*Automating deployment processes saves a lot of valuable time and reduces chances of costly errors. Infrastructure as Code removes manual steps and allows people to concentrate on core activities.*

- [ ] Write [ansible](http://docs.ansible.com/ansible/intro.html) playbooks for installing [docker](https://www.docker.com/) and the app itself.

### Documentation

*Good documentation benefits everyone.*

- [x] Remember to update the README

- [x] Use descriptive names and add comments in the code when necessary
