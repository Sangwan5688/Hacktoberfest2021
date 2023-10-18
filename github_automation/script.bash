#!/bin/bash

commit_message="initial commit"
files_to_commit=()  # Array to hold files to commit

while getopts "b:c:i:m:" flag; do
    case "${flag}" in
        b) branch_name="${OPTARG}" ;;
        c) commit_message="${OPTARG}" ;;
        i) files_to_commit+=("${OPTARG}") ;;
        m) files_to_commit+=("${OPTARG}");;
        *) ;;
    esac
done

clear
figlet "Git!"

# Check if .git directory exists
if [ -e '.git' ]; then
    # Git directory exists

    # Display unstaged files
    echo -e '\e[32m[INFO] Here are all the unstaged files...\e[0m'
    git status
    echo ''
    echo ''

    # Pull any changes from the remote repository
    echo -e '\e[32m[INFO] Checking if any files need to be pulled...\e[0m'
    git pull

    # Add specified files or all files for staging
    if [ "${#files_to_commit[@]}" -gt 0 ]; then
        for file in "${files_to_commit[@]}"; do
            echo -e "\e[32m[INFO] Adding file: '$file'\e[0m"
            git add "$file"
        done
    else
        echo -e '\e[32m[INFO] Adding all the files...\e[0m'
        git add .
    fi

    # Commit the staged files with the provided message or default message
    echo -e "\e[32m[INFO] Committing files with message: '$commit_message'\e[0m"
    git commit -m "$commit_message"

    # Switch to the specified branch if provided
    if [ -n "$branch_name" ]; then
        echo -e "\e[32m[INFO] Switching to branch: '$branch_name'\e[0m"
        git checkout "$branch_name"
    fi

    # Push the committed changes to the specified or current branch
    echo -e '\e[32m[INFO] Pushing files...\e[0m'
    git push --force

    # Add a 1-second delay for visual effect
    sleep 1

    # Clear the screen and display "Repo Updated" message
    clear
    figlet "Repo Updated!!"
else
    # Git directory does not exist
    echo -e '\e[31mFatal Error: Git not initialized!'
    echo -e '\e[31m.git file not found!\e[0m'
fi
