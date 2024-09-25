#!/bin/bash

# Get a list of changed and staged files
changed_files=$(git diff --name-only --cached --relative)

echo "Modified files found:"

# Display the list of files
if [[ -z "$changed_files" ]]; then
  echo "No modified files. Exiting..."
  exit 0
else
  echo "$changed_files"
fi

# Run Prettier for files with certain extensions
echo "Running Prettier for modified files..."
echo "$changed_files" | grep -E '\.(js|ts|tsx|css|md)$' | xargs prettier --write

# Run Next Lint for files with certain extensions
echo "Running Next Lint for modified files..."
echo "$changed_files" | grep -E '\.(js|ts|tsx)$' | xargs next lint --file

echo "Formatting and linting completed."
