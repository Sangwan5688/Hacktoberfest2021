<?php
	$host = "localhost";
	$dbUsername = "id12163760_royalcar";
	$dbPassword = "0718166005";
	$dbName = "id12163760_royal_car_rental";

	//Create connection
	$conn = mysqli_connect($host, $dbUsername, $dbPassword, $dbName);

	if (isset($_POST['search'])) {

		$SelectedVehicle = $_POST['SelectedVehicle'];
		
		$sql_checked1 = "SELECT * FROM bookedvehicles WHERE SelectedVehicle = '$SelectedVehicle';";
		
		$result1 = mysqli_query($conn,$sql_checked1);
		$count1 = mysqli_num_rows($result1);

		if ($count1>0) {
			echo '<script>alert("Sorry! Someone already booked this vehicle. Please search another vehicle.")</script>';
		}
		
		else{
			echo '<script>alert("This vehicle is available.Please fill the below form to book your vehicle.")</script>';
			if($SelectedVehicle == "Alto"){
				echo "<html>";
					echo"<head>";
					
					echo"</head>";
					echo"<body>";
						echo "price per hour = Rs.1000.00";
					echo"</body>";
				echo"</html>";
			}

			exit();
		}

	}
	
	if (isset($_POST['submit'])) {
	
		$FirstName = $_POST['FirstName'];
		$LastName = $_POST['LastName'];
		$NICOrPassportNumber = $_POST['NICOrPassportNumber'];
		$Contact1 = $_POST['Contact1'];
		$Contact2 = $_POST['Contact2'];
		$Date = $_POST['Date'];
		$NoOfHours = $_POST['NoOfHours'];
		$Email = $_POST['Email'];
		$Address = $_POST['Address'];
		$SelectedVehicle = $_POST['SelectedVehicle'];

		$sql_checked = "SELECT * FROM customers WHERE NICOrPassportNumber = '$NICOrPassportNumber';";

		$result3 = mysqli_query($conn,$sql_checked);
		$count = mysqli_num_rows($result3);

		if(empty($FirstName)){
			echo '<script>alert(" Firstname is required")</script>';
		}	
		if(empty($LastName)){
			echo '<script>alert(" Lastname is required")</script>';
		}
		if(empty($NICOrPassportNumber)){
			echo '<script>alert(" NIC Or Passport Number is required")</script>';
		}		
		if(empty($Contact1)){
			echo '<script>alert(" Contact1 is required")</script>';
		}		
		if(empty($Contact2)){
			echo '<script>alert(" Contact number-2 is required. if you do not have another contact number enter the previous contact number.")</script>';
		}		
		if(empty($Date )){
			echo '<script>alert(" Date is required")</script>';
		}		
		if(empty($NoOfHours)){
			echo '<script>alert(" No Of Hours is required")</script>';
		}		
		if(empty($Email)){
			echo '<script>alert(" Email is required")</script>';
		}		
		if(empty($SelectedVehicle)){
			echo '<script>alert(" Selected Vehicle is required")</script>';
		}					
		
		else{
			if ($count>0) {
			echo '<script>alert("You have already booked a vehicle by this NIC.")</script>';
			}
			elseif(!empty($FirstName) && !empty($LastName) && !empty($NICOrPassportNumber) && !empty($Contact1) && !empty($Contact2) && !empty($Date) && !empty($NoOfHours) && !empty($Email) && !empty($SelectedVehicle)){
				$sql = "INSERT INTO customers (FirstName, LastName, NICOrPassportNumber, Contact1, Contact2, Date, NoOfHours, Email, Address) VALUES ('$FirstName', '$LastName', '$NICOrPassportNumber', '$Contact1', '$Contact2', '$Date', '$NoOfHours', '$Email', '$Address');";
				$result4 = mysqli_query($conn,$sql);

				$sql1 = "INSERT INTO bookedvehicles (SelectedVehicle) VALUES ('$SelectedVehicle');";
				$result2 = mysqli_query($conn,$sql1);

				$to      = $email; // Send email to our user
				$subject = "Royal Car Rental - Vehicle booking notification."; // Give the email a subject 
				$message = "Thanks for rent a vehicle from Royal car Rental! Have a safe journey.";                     
				$headers = "Royal Car Rental" . "\r\n"; // Set from headers
				mail($to, $subject, $message, $headers);

				echo '<script>alert("Your booking is successful.")</script>';

				exit();
			}

		}
	}
?>	
