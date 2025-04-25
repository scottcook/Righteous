#!/bin/bash

# Add all changes
git add .

# Get the current timestamp
timestamp=$(date +"%Y-%m-%d %H:%M:%S")

# Commit with timestamp
git commit -m "Update site - $timestamp"

# Force push to main branch
git push -f origin main

# Get the latest commit hash
commit_hash=$(git rev-parse HEAD)

# Print the new CDN URLs to use
echo "\nUpdate your Webflow with these URLs:"
echo "----------------------------------------"
echo "SplitText:"
echo "https://cdn.jsdelivr.net/gh/scottcook/Righteous@$commit_hash/lib/gsap-premium/minified/SplitText.min.js"
echo "\nAnimation code:"
echo "https://cdn.jsdelivr.net/gh/scottcook/Righteous@$commit_hash/index.js"
echo "----------------------------------------" 