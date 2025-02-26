#!/bin/bash

# Usage: scripts/create-err-test.sh <error_file>
# It must be executed from the root directory of the project.
#
# Copies the error file to test/examples-data/syntax-error,
# runs the transpiler, captures the error message,
# and saves the error message to test/examples-data/correct-out.

set -e

error_file="$1"
base_name=$(basename "$error_file" | sed 's/\.calc$//')
output_txt="test/examples-data/correct-out/correct-out-${base_name}.txt"
syntax_error_file="test/examples-data/syntax-error/${base_name}.calc"

# Create directories if they don't exist
mkdir -p test/examples-data/syntax-error
mkdir -p test/examples-data/correct-out

# Copy the error file
cp "$error_file" "$syntax_error_file"

# Run the transpiler and capture the error message
bin/calc2js.mjs transpile -v "$syntax_error_file" 2> "$output_txt"
