import time
import winsound

def set_alarm():
    print("Enter the time for the alarm (HH:MM format):")
    alarm_time = input(": ")

    while True:
        current_time = time.strftime("%H:%M")
        if current_time == alarm_time:
            print("Time to wake up!")
            # Play a sound (you can replace 'sound.wav' with your desired sound file)
            winsound.PlaySound('sound.wav', winsound.SND_FILENAME)
            break
        time.sleep(60)  # Check every minute

if __name__ == "__main__":
    set_alarm()
