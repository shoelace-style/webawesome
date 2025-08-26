#!/bin/bash

echo "Running the build!"
git clone "https://konnorrogers:$GITHUB_ACCESS_TOKEN@github.com/shoelace-style/webawesome-pro" packages/webawesome-pro
cd packages/webawesome-pro && npm run build
