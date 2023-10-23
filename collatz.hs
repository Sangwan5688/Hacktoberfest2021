module Collatz where

-- step in the sequence
step :: Integer -> Integer
step x = if even x then down else up
    where down = div x  2
          up = 3 * x + 1


-- counting the number of steps in a sequence
collatz :: Integer -> Integer
collatz 1 = 0
collatz x = 1 + collatz (step x)


longest :: Integer -> Integer
longest upperBound = longest' 0 0 upperBound

longest' :: Integer -> Integer -> Integer -> Integer
longest' number _ 0 = number
longest' number maxlength n = 
    if len > maxlength
    then longest' n len (n - 1)
    else longest' number maxlength (n - 1)
    where len = collatz n
