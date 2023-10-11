<?php
  session_start();
?>
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-uWxY/CJNBR+1zjPWmfnSnVxwRheevXITnMqoEIeG1LJrdI0GlVs/9cVSyPYXdcSF" crossorigin="anonymous">

    <link rel="stylesheet" href="style2.css">

    <title>Your Notes</title>
    <link rel="site icon" href="Site.png" type="image/x-icon">
  </head>
  <body>


    <div class="container2">
    <?php echo "<h1>Hello ". $_SESSION['username']."</h1>" ?>
    </div>
    <hr>


    <div class="container5">
    <form action="Logout.php" class="d-flex mx-4">
        <button class="btn btn-outline-danger" type="submit">Logout</button>
      </form>
    </div>


    <div class="container3">
      <h2>Add Notes</h2>
    </div>


    <div class="container4">
    <form action="Notes.php" method="POST">
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Enter Title</label>
    <input type="text"  name="title" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Enter Description</label>
    <br>
    <div class="form-floating">
  <textarea class="form-control" name="description" id="floatingTextarea2" style="height: 100px"></textarea>
  <label for="floatingTextarea2"></label>
</div>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>


    </div>
    <br>
  <div class="container6">
    <h2>Your Notes</h2>
  </div>
<br>
  <div class="container7">
  <table class="table">
  <thead>
    <tr>
      <th scope="col">Sr No.</th>
      <th scope="col">Title</th>
      <th scope="col">Description</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-kQtW33rZJAHjgefvhyyzcGF3C5TFyBQBA13V1RKPf4uH+bwyzQxZ6CmMZHmNBEfJ" crossorigin="anonymous"></script>
 <!-- Php Script Starts -->
  <?php  
        if($_SERVER['REQUEST_METHOD']=="POST")
        {
            $server="localhost";
            $user="root";
            $pass="";
            $db="to_do";

            $conn=mysqli_connect($server, $user, $pass, $db);
          
                if(!$conn){
                  echo mysqli_connect_error();
                }

                $title=$_POST['title'];
                $description=$_POST['description'];

                if(empty($title) && empty($description)){
                  echo '<div class="alert alert-primary alert-dismissible fade show" role="alert">
                  <strong>Wait!</strong> Please Fill The Title Atleast.
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>';
                }
                else{
                    $insert="INSERT INTO `user_data` (`sr no.`, `title`, `description`) VALUES (NULL, '$title', '$description')";

                    $insert_query=mysqli_query($conn, $insert);

                        if($insert_query){
                          echo '<div class="alert alert-success alert-dismissible fade show" role="alert">
                          <strong>Congrats!</strong> Your Note Has been Inserted Successfully
                          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>';
                        }
                        else{
                          echo '<div class="alert alert-danger = alert-dismissible fade show" role="alert">
                          <strong>Error!</strong> Some Error Has Occured.
                          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>';
                        }
                  }

                  $select="SELECT * FROM `user_data`";
                  $select_query=mysqli_query($conn, $select);
                  if(!$select_query){
                    echo mysqli_error($conn);
                  }

                  $row=mysqli_num_rows($select_query);

                  if($row>0){
                        while($rows=mysqli_fetch_assoc($select_query))
                        {
                          echo "<tr>
                          <td>".$rows['sr no.']."</td>
                          <td>".$rows['title']."</td>
                          <td>".$rows['description']."</td>
                        </tr>";

                        }
                  }

        }

  ?>

</table>
</div>
 </body>
</html>