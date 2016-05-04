import RPi.GPIO as GPIO
import sys, json, time
from decimal import *

print("Starting Sensors")
 
# sensors
sensor1 = {
    'id' : 1,
    'pin' : 4
}

sensor2 = {
    'id' : 2,
    'pin' : 14
}

sensorList = [
    sensor1,
    sensor2
]

def findTeam(sensorList, triggeredPin):
    for each in sensorList:
        if each.pin != triggeredPin:
            continue
        return each.id


def listener() :

    sensor = 4

    GPIO.setmode(GPIO.BCM)
    GPIO.setup(sensor1['pin'], GPIO.IN, GPIO.PUD_DOWN)
    GPIO.setup(sensor2['pin'], GPIO.IN, GPIO.PUD_DOWN)

    previous_state = False
    current_state = False
    
    start = None

    while True:
        time.sleep(0.01)
        previous_state1 = current_state1
        current_state1 = GPIO.input(sensor1.pin)
        previous_state2 = current_state1
        current_state2 = GPIO.input(sensor2.pin)
        # start timer
        if (not current_state1 and previous_state1) or (not current_state2 and previous_state2):
            start = time.time()
        # if sensor was triggered by not anymore
        if (not previous_state1 and current_state1) or (not current_state2 and previous_state2):
            end = time.time()
            if start is not None:
                duration = round(end - start, 3)
                # Ball diameter is 35mm
                speed = round(0.035 / duration, 3)
                if current_state1:
                    pin = sensor1.pin
                else:
                    pin = sensor2.pin
                printData = findTeam(sensorList, pin);
                print("%s : %s " % (sensor, speed)) 

if __name__ =='__main__' :
    listener = listener()

