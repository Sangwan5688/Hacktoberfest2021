/*
    TODO: Bit for Tries
    ? 
*/

Table
    1 ^ 1 = 0
    0 ^ 0 = 0

    0 ^ 1 = 1
    1 ^ 0 = 1

    even number of 1's -> 0
    odd number of 1's -> 1

check bit
    no & ( 1 << k )
    (no >> k) & 1

set a bit
    no | ( 1 << k)