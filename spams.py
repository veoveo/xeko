se = "11125735"
import websocket
import random
import string
from threading import Thread

def generate_random_string(length):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))

def on_message(ws, message):
    message_str = str(message.decode('latin-1'))
    #print("Message received = " + message_str)

def on_error(ws, error):
    print("Error: " + str(error))
    ws = websocket.WebSocketApp('wss://live.shopee.vn/im/v1/comet?conn_ts=1710750059648&device_id=0bb7d3d2-af01-4894-9c9c-'+generate_random_string(12)+'&session_id=11115601&usersig=saXk5vlEZZMuf58vO7JZXs_g6Ub2z_z8VHX14-07GsTL9hEYnREXjrnNRXzy5H5wpPio5smyhCFtAUFZMyujRlgmVfT9gaiHKTuBOKff4mQAh_U7AB7I&version=v2',
                              on_message = on_message,
                              on_error = on_error,
                              on_close = on_close)
    ws.on_open = on_open
    ws.run_forever()

def on_close(ws):
    print("Connection closed...")

def on_open(ws):
    pass

def run():
    ws = websocket.WebSocketApp('wss://live.shopee.vn/im/v1/comet?conn_ts=1710750059648&device_id=0bb7d3d2-af01-4894-9c9c-'+generate_random_string(12)+'&session_id=11115601&usersig=saXk5vlEZZMuf58vO7JZXs_g6Ub2z_z8VHX14-07GsTL9hEYnREXjrnNRXzy5H5wpPio5smyhCFtAUFZMyujRlgmVfT9gaiHKTuBOKff4mQAh_U7AB7I&version=v2',
                              on_message = on_message,
                              on_error = on_error,
                              on_close = on_close)
    ws.on_open = on_open
    ws.run_forever()

for i in range(800):
  Thread(target=run, args=()).start()
