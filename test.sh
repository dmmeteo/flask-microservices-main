#!/bin/bash

fails=''

inspect() {
    if [ $1 -ne 0 ]; then
        fails="${fails} $2"
    fi
}

docker-compose -f docker-compose-stage.yml run users python manage.py test
inspect $? users

docker-compose -f docker-compose-stage.yml run eval python manage.py test
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

