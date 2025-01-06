#!/bin/bash

# if [[ $VERCEL_GIT_COMMIT_REF == "alpha"  ]] ; then
  echo "Running the alpha build!"
  npm run build:alpha
# else
#   npm run build
# fi
