#!/bin/bash

namespace=cc-z-hack

echo "Building images with $namespace namespace"

cd loyalty/build
docker build . -t "${namespace}/loyalty"

cd -
cd notification/notificationejb/build
docker build . -t "${namespace}/notification"

cd -
cd stock-quote/build
docker build . -t "${namespace}/stock-quote"

cd -
cd trader/build
docker build . -t "${namespace}/trader"

cd -
cd trader-node/
docker build . -t "${namespace}/trader-node"
