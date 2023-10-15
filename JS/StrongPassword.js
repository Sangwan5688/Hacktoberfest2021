function generateStrongPassword(length) {
    // Define character sets
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numericChars = '0123456789';
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
    // Combine all character sets
    const allChars = uppercaseChars + lowercaseChars + numericChars + specialChars;
  
    if (length < 8) {
      throw new Error('Password length must be at least 8 characters');
    }
  
    let password = '';
  
    // Generate the password
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      password += allChars.charAt(randomIndex);
    }
  
    return password;
  }
  
  // Example usage to generate a strong password of length 12
  const strongPassword = generateStrongPassword(12);
  console.log(strongPassword);
  