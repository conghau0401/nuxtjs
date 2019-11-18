#!/bin/bash

set -eux
cd `dirname $0`

#source ./config

cd ../

npm run generate
aws s3 sync dist s3://console.dev-airticket.seec-oki.com
