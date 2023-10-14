# !/bin/bash

# A simple bash script to move up to desired directory level directly

function jump()
{
	# original value of Internal Field Separator
	OLDIFS=$IFS

	# setting field separator to "/"
	IFS=/

	# converting working path into array of directories in path
	# eg. /my/path/is/like/this
	# into [, my, path, is, like, this]
	path_arr=($PWD)

	# setting IFS to original value
	IFS=$OLDIFS

	local pos=-1

	# ${path_arr[@]} gives all the values in path_arr
	for dir in "${path_arr[@]}"
	do
		# find the number of directories to move up to
		# reach at target directory
		pos=$[$pos+1]
		if [ "$1" = "$dir" ];then

			# length of the path_arr
			dir_in_path=${#path_arr[@]}

			#current working directory
			cwd=$PWD
			limit=$[$dir_in_path-$pos-1]
			for ((i=0; i<limit; i++))
			do
				cwd=$cwd/..
			done
			cd $cwd
			break
		fi
	done
}

