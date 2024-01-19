#!/bin/sh

# https://github.com/ds300/patch-package/issues/326#issuecomment-1676204753
# For each file in the format <dependency_name>+<version>.patch
for PATCH_FILE in ./patches/*+*.patch; do
    # Check if file exists to avoid issues with the wildcard in case no files match
    if [[ -f "$PATCH_FILE" ]]; then
        # Extract dependency name
        DEP_NAME=$(basename "$PATCH_FILE" | cut -d'+' -f1)

        # Delete the dependency from node_modules
        if [[ -d "node_modules/$DEP_NAME" ]]; then
            echo "Deleting node_modules/$DEP_NAME ..."
            rm -rf "node_modules/$DEP_NAME"
        else
            echo "$DEP_NAME not found in node_modules!"
        fi
    fi
done
