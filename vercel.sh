#!/bin/bash

echo "Running the build!"

cd packages/webawesome && npm install && npm run build
