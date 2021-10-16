import speedtest
s=speedtest.Speedtest()

print("Checking...")

#converting from byte to mb 
d_speed=(s.download())/1000000
u_speed=(s.upload())/1000000

print("Download speed -->",round(d_speed,2),"mb/s")
print("Upload speed -->",round(u_speed,2),"mb/s")