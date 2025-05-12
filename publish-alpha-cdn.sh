#!/bin/bash

version=$1

# Check for a version number
if [ -z "$version" ]; then
  echo "A version number must be provided as the first and only argument."
  echo
  exit 2
fi

echo "This command will build Web Awesome $version and publish it to the the CDN."
echo
read -p "🔥 Are you sure you want to do this? (y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
    # do dangerous stuff
    echo
    echo "🚀 OK, blasting off..."

    # build it
    npm run build

    # copy dist-cdn to the CDN
    aws --profile early-webawesome-com --endpoint-url https://c0c64e1b38a89d8ae060d40170ceef46.r2.cloudflarestorage.com s3 cp ./dist-cdn s3://early-webawesome-com/webawesome@$version/dist --recursive

    echo
    echo "✅ All done. Now go make something awesome!"
    echo
fi
