# flask-microservices-main

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/02cf9ea192b24217b5e12a307b1a0136)](https://app.codacy.com/app/dmmeteo/flask-microservices-main?utm_source=github.com&utm_medium=referral&utm_content=dmmeteo/flask-microservices-main&utm_campaign=badger)
[![Build Status](https://travis-ci.org/dmmeteo/flask-microservices-main.svg?branch=master)](https://travis-ci.org/dmmeteo/flask-microservices-main)


# Environment Variables

## Development:
```bash
$ export REACT_APP_USERS_SERVICE_URL=http://DOCKER_MACHINE_DEV_IP
$ export TEST_URL=http://DOCKER_MACHINE_DEV_IP
```

## Staging:
```bash
$ export REACT_APP_USERS_SERVICE_URL=http://DOCKER_MACHINE_STAGING_IP
$ export SECRET_KEY=SOMETHING_SUPER_SECRET
$ export TEST_URL=http://DOCKER_MACHINE_STAGING_IP
```

## Production:
```bash
$ export REACT_APP_USERS_SERVICE_URL=http://DOCKER_MACHINE_PROD_IP
$ export SECRET_KEY=SOMETHING_SUPER_SECRET
$ export TEST_URL=http://DOCKER_MACHINE_PROD_IP
```