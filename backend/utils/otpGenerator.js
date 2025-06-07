const generateOTP = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // Possible characters
  let otp = ''; // Initialize the OTP string

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length); // Get a random index
    otp += characters[randomIndex]; // Append the character at the random index to the OTP
  }

  return otp; // Return the generated OTP
}

module.exports = { generateOTP };