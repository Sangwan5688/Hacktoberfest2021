#!/bin/bash
file='book.txt'
while read line; do
echo $line
done < $file
