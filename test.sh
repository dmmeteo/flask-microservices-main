#!/bin/bash

fails=''

inspect() {
    if [ $1 -ne 0 ]; then
        fails="${fails} $2"
    fi
}

export COMPOSE_FILE=docker-compose-ci.yml

docker-compose run users python manage.py test
inspect $? users

docker-compose run eval python manage.py test
inspect $? eval

testcafe chrome e2e
inspect $? e2e

if [ -n "${fails}" ]; then
    echo "Tests failed: ${fails}"
    exit 1
else
    echo "Tests passed!"
    exit 0
fi

