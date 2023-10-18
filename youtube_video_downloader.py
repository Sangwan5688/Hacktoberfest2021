from pytube import YouTube
import os

url = input("Enter a link : ")

yt = YouTube(url)

stream = yt.streams.get_highest_resolution()

print("Downloading....")

filename = input("Enter the name with which you want to save the video, without file extension : ")
stream.download(filename="f{filename}.mp4")
print("Download completed")
os.system("vlc video1.mp4")
