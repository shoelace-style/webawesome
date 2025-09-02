#!/bin/bash

echo "Running the build!"

if [[ "$CLONE_PRO" != "false" ]]; then
  git clone "https://konnorrogers:$GITHUB_ACCESS_TOKEN@github.com/shoelace-style/webawesome-pro" packages/webawesome-pro
fi

cd packages/webawesome-pro && npm run build
