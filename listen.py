import RPi.GPIO as GPIO
import sys, json, time
from decimal import *

print("Starting Sensor")
 

def listener() :

    sensor = 4

    GPIO.setmode(GPIO.BCM)
    GPIO.setup(sensor, GPIO.IN, GPIO.PUD_DOWN)

    previous_state = False
    current_state = False
    
    start = None

    while True:
        time.sleep(0.01)
        previous_state = current_state
        current_state = GPIO.input(sensor)
        # start timer
        if not current_state and previous_state == current_state:
            start = time.time()
        # if sensor was triggered by not anymore
        if not previous_state and current_state:
            end = time.time()
            if start is not None
                duration = end - start
                print("Team : %s : %s" % (sensor, duration)) 

if __name__ =='__main__' :
    listener = listener()
