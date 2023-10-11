<?php
	if (isset($_POST['submit'])) {
	
		$Firstname = $_POST['Firstname'];
		$Email = $_POST['E-mail'];
		$Message = $_POST['Message'];

		if(empty($Firstname)){
			echo '<script>alert(" Firstname is required")</script>';
		}	
		if(empty($Email)){
			echo '<script>alert(" Email is required")</script>';
		}
		if(empty($Message)){
			echo '<script>alert(" Message is required")</script>';
		}
		
		if(!empty($Firstname) && !empty($Email) && !empty($Message)){
			$to      = "tashiniav@gmail.com"; 
			$message = $Message;                     
			$headers = "From:". $Email; // Set from headers
			mail($to,$message,$headers);

			echo '<script>alert("Your message has been sent.")</script>';

			exit();
		}
	}		
?>