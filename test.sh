#!bin/bash

fails=''

inspect() {
    if [ $1 -ne 0 ]; then
        fails="${fails} $2"
    fi
}

docker-composer -f docker-compose-stage.yml run users python manage.py test
inspect $? users

if [ -n "${fails}" ]; then
    echo 'Tests failed: ${fails}'
    exit 1
else
    echo 'Tests passed!'
    exit 0
fi

