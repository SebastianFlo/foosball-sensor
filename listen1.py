import RPi.GPIO as GPIO
import sys, json, time
from decimal import *

print("Starting Sensor 1")
 
# sensors
sensor1 = {
    'id' : 1,
    'pin' : 4,
    'active' : False,
    'previous' : False
}

def listener() :

        # asign pin to sensor object
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(sensor1['pin'], GPIO.IN, GPIO.PUD_DOWN)

    start = None

    while True:
        time.sleep(0.01)
        
        # set previous state
        sensor1['previous'] = sensor1['active']
        sensor1['active'] = GPIO.input(sensor1['pin'])

       # start timer
        if not sensor1['active'] and sensor1['previous']:
            start = time.time()
        # if sensor was triggered by not anymore
        if not sensor1['previous'] and sensor1['active']:
            end = time.time()
            if start is not None:
                duration = round(end - start, 3)
                # Ball diameter is 35mm
                speed = round(0.035 / duration, 3)
                print("%s : %s " % (sensor1['id'], speed)) 
                
if __name__ =='__main__' :
    listener = listener()

