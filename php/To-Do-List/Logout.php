<?php
    session_destroy();
    session_unset();
    header("location: Login.php");
?>