import struct
from os import urandom
from util import transform

def read_random_bits(nbits: int) -> bytes:
    """
    Reads 'nbits' random bits.
    """

    nbytes, rbits = divmod(nbits, 8)

    randomdata = urandom(nbytes)
    if rbits > 0:
        randomvalue = ord(urandom(1))
        randomvalue >>= 8 - rbits
        randomdata = struct.pack("B", randomvalue) + randomdata

    return randomdata

def read_random_int(nbits: int) -> int:
    """Reads a random integer of approximately nbits bits."""

    randomdata = read_random_bits(nbits)
    value = transform.bytes2int(randomdata)

    value |= 1 << (nbits - 1)

    return value

def read_random_odd_int(nbits: int) -> int:
    value = read_random_int(nbits)
    return value | 1