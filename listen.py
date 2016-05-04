import RPi.GPIO as GPIO
import sys, json, time
from decimal import *

print("Starting Sensors")
 
# sensors
sensor1 = {
    'id' : 1,
    'sensor' : 4
}

sensor2 = {
    'id' : 2,
    'sensor' : 14
}

sensorList = [
    sensor1,
    sensor2
]

def findTeam(sensorList, triggeredSensor):
    for each in sensorList:
        if each['sensor'] != triggeredSensor:
            continue
        return each


# correct_value = something(vs, last_name)


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
        if not current_state and previous_state:
            start = time.time()
        # if sensor was triggered by not anymore
        if not previous_state and current_state:
            end = time.time()
            if start is not None:
                duration = round(end - start, 3)
                # Ball diameter is 35mm
                speed = round(0.035 / duration, 3)
                print("%s : %s " % (sensor, speed)) 

if __name__ =='__main__' :
    listener = listener()

