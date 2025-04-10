#!/bin/bash

# Usage: scripts/create-test.sh <input_file>
# It must be executed from the root directory of the project.
#
# Copies the input file to test/examples-data/input,
# transpiles it, saves the output to test/examples-data/expectedjs,
# runs the output, and saves the result to test/examples-data/correct-out.

set -e  # Exit immediately if a command exits with a non-zero status.

input_file="$1"
base_name=$(basename "$input_file" | sed 's/\.calc$//')  # Remove .calc extension
output_js="test/hard/expected-js/expected-${base_name}.js"
output_txt="test/hard/correct-out/correct-out-${base_name}.txt"
input_test="test/hard/input/${base_name}.calc"

# Create directories if they don't exist
mkdir -p test/hard/input
mkdir -p test/hard/output
mkdir -p test/hard/expected-js
mkdir -p test/hard/correct-out

# Copy the input file
# cp "$input_file" "$input_test"

# Transpile the code
bin/calc2js.mjs "$input_test" -o "$output_js"

# Run the generated JavaScript and save the output
bin/calc2js.mjs -S "$input_test" > "$output_txt"

