#!/bin/bash

ACTION=$1 #create or delete
COUNT=$2 #amount of stacks

echo "Calling kubectl $ACTION with $COUNT Deployments"
echo ""

for (( c=1; c<=$COUNT; c++ ))
do
  FILENAME=hack-stack-$c
  echo "Deploying "$FILENAME
  sed "s/hack-stack/$FILENAME/g" hack-stack.yaml | kubectl $ACTION -f -
  sleep 2
  echo ""
done
