#!/bin/bash

# Define the source and archive directories
source_dir="/path/to/source_directory"
archive_dir="/path/to/archive_directory"

# Define the number of days to keep files
days_to_keep=30

# Create the archive directory if it doesn't exist
mkdir -p "$archive_dir"

# Find and move old files to the archive directory
find "$source_dir" -type f -mtime +$days_to_keep -exec mv {} "$archive_dir" \;

echo "Files older than $days_to_keep days have been moved to the archive directory."
