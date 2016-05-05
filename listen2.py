import RPi.GPIO as GPIO
import sys, json, time
from decimal import *

print("Starting Sensor 2")
 
# sensors
sensor2 = {
    'id' : 2,
    'pin' : 14,
    'active' : False,
    'previous' : False
}

def listener() :

        # asign pin to sensor object
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(sensor2['pin'], GPIO.IN, GPIO.PUD_DOWN)

    start = None

    while True:
        time.sleep(0.01)
        
        # set previous state
        sensor2['previous'] = sensor2['active']
        sensor2['active'] = GPIO.input(sensor2['pin'])

       # start timer
        if not sensor2['active'] and sensor2['previous']:
            start = time.time()
        # if sensor was triggered by not anymore
        if not sensor2['previous'] and sensor2['active']:
            end = time.time()
            if start is not None:
                duration = round(end - start, 3)
                # Ball diameter is 35mm
                speed = round(0.035 / duration, 3)
                print("%s : %s " % (sensor2['id'], speed)) 
                
if __name__ =='__main__' :
    listener = listener()

