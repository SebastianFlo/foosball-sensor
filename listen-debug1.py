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

    start = None
    i = 0
    while True:
        time.sleep(0.1)
        i = i + 1
        # set previous state
        sensor1['previous'] = sensor1['active']
        
        sensor1['active'] = True if i > 12 else False
        sensor1['active'] = False if i > 24 else True
        if i > 24:
            i = 0

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

