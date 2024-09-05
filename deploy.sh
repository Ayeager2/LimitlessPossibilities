#!/bin/bash

# Build the project
npm run build

# Switch to the deploy branch
git checkout deploy

# Remove all files except the dist folder
git rm -r --cached .
git clean -fdx
git add dist
git commit -m "Update dist folder for deployment"

# Push the changes to the deploy branch
git push origin deploy

# Switch back to the main branch
git checkout main