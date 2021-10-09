<?php
function slug_generator($string)
{
    if (!$string) {
        return "String not found";
    }
    return strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $string)));
}

echo slug_generator("lorem ipsum");
