<!doctype html>
<!-- Sign Up Script -->
<html lang="en">
  <head>
   
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">

    <title>SignUp To P_Notes</title>
    <link rel="shortcut icon" href="Site.png" type="image/x-icon">
  </head>
  <body>

    <ul class="nav justify-content-center bg-dark text-light">
        <li class="nav-item">
            <a href="Login.php">
                <button class="btn btn-outline-danger mx-2 my-2">Login</button>
            </a>
        </li>
        <li class="nav-item">
            <a href="Signup.php">
            <button class="btn btn-outline-danger mx-2 my-2">Signup</button>
            </a>
        </li>
        
      </ul>

    <br>
    <h1 id="header">P_Notes - Your Personal To-Do List Taker</h1>
    <br>
    <br>
    <h2 id="Login" >SignUp To Get Started</h2>
    <br>
    <div class="container">
    <form action="Signup.php" method="post">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp">
          <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" name="password" class="form-control" id="exampleInputPassword1">
        </div>
        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
            <input type="password" name="cpass" class="form-control" id="exampleInputPassword1">
          </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ" crossorigin="anonymous"></script>
  </body>
</html>
<!-- Php Sign Up Script Starts -->
<?php
    if($_SERVER['REQUEST_METHOD']=="POST"){
        $server="localhost";
        $user="root";
        $pass="";
        $db="to_do";
        $connect=mysqli_connect($server, $user, $pass, $db);
        if(!$connect){
            echo mysqli_connect_error();
        }

        $email=$_POST['email'];
        $password=$_POST['password'];
        $cpass=$_POST['cpass'];

                // Inserting data in The Database
                if(empty($email) || empty($password) || empty($cpass)){
                    // checking if all the fields are properly filled or not
                    echo"<br>";
                    echo '<div class=" my-1 alert alert-primary alert-dismissible fade show" role="alert">
                    <strong>Wait!</strong> Please Fill all The Fields
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>';
                }

                else{
                        $select="SELECT * FROM `sign up table`";
                        $comparing=mysqli_query($connect, $select);
                        $row=mysqli_num_rows($comparing);
                        $showalert=false;
                        // echo "Rows ===  ".$row;
                        if($row>0){
                           while($rows=mysqli_fetch_assoc($comparing)){
                                if($rows['email']==$email){
                                    $showalert=true;
                                }
                            }
                           
                                if($showalert==true){
                                echo"<br>";
                                    echo '<div class=" my-1 alert alert-danger alert-dismissible fade show" role="alert">
                                    <strong>Sorry!</strong>Similar User Exits
                                    Please Go To Login
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>';
                                }
                            }
                  
                    // Comparing Both The Passwords 
                    // pass and Confirm Pass
                        if($password==$cpass && $showalert==false){

                                    $phash=password_hash($password, PASSWORD_DEFAULT);
                                    $cphash=password_hash($cpass, PASSWORD_DEFAULT);
                                        $insert_query="INSERT INTO `sign up table` (`sr no.`, `email`, `Password`, `ConfirmPass`) VALUES (NULL, '$email', '$phash', '$cphash')";

                                        $insert_data=mysqli_query($connect, $insert_query);
                                        
                                        // inserting data
                                        if($insert_data)
                                        {
                                                    echo"<br>";
                                                    echo '<div class=" my-1 alert alert-success alert-dismissible fade show" role="alert">
                                                    <strong>Congrats</strong>You Have Been Registered Successfully Now Go Back To The Login Page
                                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                </div>';
                                        }
                                        else{
                                            echo"<br>";
                                            echo '<div class=" my-1 alert alert-danger alert-dismissible fade show" role="alert">
                                            <strong>Wait!</strong>The Passwords do not match
                                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                        </div>';
                                        }
// comparing that if the similar user exits or not                                   
                          }
                         
                 }
        }                   
?>