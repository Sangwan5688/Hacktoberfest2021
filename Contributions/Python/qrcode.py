import qrcode

# Define the data you want to encode in the QR code
data = "https://www.example.com"

# Create a QR code instance
qr = qrcode.QRCode(
    version=1,  # QR code version (adjust as needed)
    error_correction=qrcode.constants.ERROR_CORRECT_L,  # Error correction level
    box_size=10,  # Size of each QR code module
    border=4,  # Border around the QR code
)

# Add the data to the QR code
qr.add_data(data)
qr.make(fit=True)

# Create an image of the QR code
img = qr.make_image(fill_color="black", back_color="white")

# Save the QR code as an image
img.save("example.png")
