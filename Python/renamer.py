#!/usr/bin/env/python

""" 
renamer.py :
A python script to rename all the files in current directory with random names
"""

__author__ = "Mohit Kumar"
__credits__ = ["Mohit Kumar"]
__version__ = "1.0.0"
__status__ = "Production"

import os
import string
import random

def random_name():
    return ''.join( random.choices( string.ascii_lowercase + string.digits, k=20 ) )

file_names = os.listdir()
for _ in file_names:
    if _ == "renamer.py":
        continue
    ext = _.split('.')[-1]
    os.rename( _, random_name()+'.'+ext )
