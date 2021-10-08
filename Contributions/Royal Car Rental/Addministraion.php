
<!doctype html>
<html lang="en-US">
<head>
	<meta charset="utf-8">
	<title>Royal Car Rental</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="homeStyle.css" rel="stylesheet" />	
	<link href="AdministrationStyle.css" rel="stylesheet" />		
	<link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Roboto+Condensed&display=swap" rel="stylesheet">
</head>

<body>
	<div class="bg-image" style="height: 600px;">
		<div id="#home">
			<div class="section-1">
				<table class="nav-table">
					<tr class = "tr1">
						<td width="1500px">
							<div style = "padding-left:80px;">Royal Car Rental
							<div id="google_translate_element" style="border-radius:25px;border:none;"></div>
							</div>

								<script type="text/javascript">
								function googleTranslateElementInit() {
								  new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
								}
								</script>

								<script type="text/javascript" src="f.txt"></script>
						</td>
					</tr>		
					
					<tr class="tr2">
						<td width="1500px">
							<nav>
								<ul>
									<li><a href="index.html">Home</a></li>
									<li><a href="index.html">Booking</a></li>
									<li><a href="index.html">Services</a></li>
									<li><a href="index.html">Location</a></li>
									<li><a href="RentalTerms.html">Rental Terms</a></li>
									<li><a href="Help.html">Help</a></li>
									<li><a href="index.html">Contact</a></li>
								</ul>
							</nav>
						</td>
					</tr>
				</table>
<!-- <!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>Royal Cabs&Tours-Administration</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta content="text/html; charset=iso-8859-2" http-equiv="Content-Type">
		<link rel="stylesheet" type="text/css"href="AdministrationStyle.css">
	
	</head>
	<body>
		<header class="Royal-header-bar Royal-header-card Royal-header-theme">
	  		<h1 class="Royal-header-bar-item"><a  style="text-decoration: none;color: #ffffff;" href="Index.php">Royal Car Rental</a></h1>
		</header> -->
	
		<!--Tab body-->
		
		<!-- <button class="tablink" onclick="openPage('BookingMenu', this, '#777')" id="defaultOpen">Booking Menu</button>
		
		<div id="BookingMenu" class="tabcontent"> -->
			
		
		  <h3>Customer Details</h3>
		  <p>Some Booking Menu this fine day!</p>
		  
		  <table border="1" class="table-vehicle">
		  		<tr>
		  			<th class="th-header">ID</th>
		  			<th class="th-header">First Name</th>
		  			<th class="th-header">Last Name</th>
		  			<th class="th-header">NIC or Passport Number</th>
		  			<th class="th-header">Contact No 1</th>
		  			<th class="th-header">Contact No 2</th>
		  			<th class="th-header">Date</th>
		  			<th class="th-header">No of Hours</th>
		  			<th class="th-header">E-mail</th>
		  			<th class="th-header">Address</th>	
		  		</tr>
		  		<?php
		  			$conn = mysqli_connect("localhost","id12163760_royalcar","0718166005","id12163760_royal_car_rental");
		  			if($conn->connect_error){
						die("Connection failed :".$conn->connect_error);
					}
		  			$sql="SELECT FirstName, LastName, NICOrPassportNumber, Contact1, Contact2, Date, NoOfHours, Email, Address FROM customers ";
		  			$result= $conn->query($sql);
		  			if($result->num_rows>0){
						while($row = $result -> fetch_assoc()) 
		  				{
							echo"
								<tr><td>". $row['FirstName']."</td><td>". $row['LastName']."</td><td>".$row['NICOrPassportNumber']."</td><td>".$row['Contact1']."</td><td>".$row['Contact2']."</td><td>".$row['Date']."</td><td>".$row['NoOfHours']."</td><td>".$row['Email']."</td></tr>";				
						}
						echo("</table>");
					}else{
						echo "0 result";
					}
		  			
					$conn -> close();
		  		?>
			  	</table>   
		</div>
		
		
		<script>
		function openPage(pageName,elmnt,color) {
		  var i, tabcontent, tablinks;
		  tabcontent = document.getElementsByClassName("tabcontent");
		  for (i = 0; i < tabcontent.length; i++) {
		    tabcontent[i].style.display = "none";
		  }
		  tablinks = document.getElementsByClassName("tablink");
		  for (i = 0; i < tablinks.length; i++) {
		    tablinks[i].style.backgroundColor = "";
		  }
		  document.getElementById(pageName).style.display = "block";
		  elmnt.style.backgroundColor = color;
		}

		// Get the element with id="defaultOpen" and click on it
		document.getElementById("defaultOpen").click();
	</script>

	<footer id="contact">
		<p class="para1">Royal Car Rental
			<a href="www.facebook.com"><img class="facebook" src="images/facebook.png"/></a><p>
		</p>
		<pre>84/3, 
N.C school road,
Anuradhapura,
Sri Lanka</pre>

	</footer>
		
</body>	
</html>