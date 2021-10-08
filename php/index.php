<?php


    $categorias = ["infantil", "adolescente","adulto","idoso"];
    $nome = "Eduardo";
    $idade = 14;

    if ($idade >= 6 && $idade <= 8) {
       for ($i = 0; $i <= count($categorias); $i++ ) {
           if ($categorias[$i] == "infantil") {
               echo "O Nadador $nome  compete na categoria $categorias[$i]";
           }

       }

    }
    
    if ($idade >= 9 && $idade <= 13) {
        for ($i = 0; $i <= count($categorias);$i++ ) {
            if ($categorias[$i] == "adolescente") {
                echo "O Nadador $nome  compete na categoria $categorias[$i]";
            }
 
        }
 
     }
     
    if ($idade >= 14) {
        for ($i = 0; $i <= count($categorias);$i++ ) {
            if ($categorias[$i] == "adulto") {
                echo "O Nadador $nome  compete na categoria $categorias[$i]";
            }

        }
 
     }









?>
© 2021 GitHub, Inc.
Terms
P