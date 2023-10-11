#!/usr/bin/env/python

""" 
fakename.py :
A python script to generate fake names in multiple languages
"""

__author__ = "Mohit Kumar"
__credits__ = ["Mohit Kumar"]
__version__ = "1.0.0"
__status__ = "Production"

import os
import sys
from datetime import datetime as dt

from faker import Faker

def get_file_name():
    return f"FakeName_{dt.now().strftime('%Y%m%d%H%M%S%f')}.txt"

def print_usage():
    print(
        """
        Syntax of command is incorrect.
        Correct syntax :
            python fakename.py <no_of_entries> <locale>
        Locale :
            en_US : For US Names
            en_IN : For Indian Names
            pt_BR : For Brazilian Names
            ja_JP : For Japanese Names

            More can be found here : https://faker.readthedocs.io/en/master/locales.html
        """
    )

if __name__ == "__main__":

    if len(sys.argv) not in [2,3]:
        print_usage()
    else:
        locale = "en_US" if ( len(sys.argv) == 2 ) else sys.argv[2]
        fake = Faker(locale)
        total_names = int(sys.argv[1])
        output_file_name = get_file_name()
        print(f"Generating output file : {output_file_name} containing {total_names} name(s)\n")
        with open(output_file_name, 'w') as fobj:
            for i in range( total_names ):
                fobj.write(fake.name())
                if i != total_names-1:
                    fobj.write('\n')
        print(f"Done.")
