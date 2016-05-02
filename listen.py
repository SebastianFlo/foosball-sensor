import RPi.GPIO as GPIO
import sys, json, time

print("Starting Sensor")
 

def listener() :

    sensor = 4

    GPIO.setmode(GPIO.BCM)
    GPIO.setup(sensor, GPIO.IN, GPIO.PUD_DOWN)

    previous_state = False
    current_state = False

    while True:
        time.sleep(0.1)
        previous_state = current_state
        current_state = GPIO.input(sensor)
        if not current_state:
            print("Team : %s" % (sensor)) 
        else: 
            print("Clear")

if __name__ =='__main__' :
    listener = listener()
