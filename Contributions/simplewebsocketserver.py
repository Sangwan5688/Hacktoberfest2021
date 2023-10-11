import asyncio
import websockets


async def hello(websocket, path):
    await websocket.send('Hello, whats your name?')

    name = await websocket.recv()

    greeting = f"Hello {name}!"

    await websocket.send(greeting)

    print(f'{name} said hi!')

    while True:
        await websocket.send('Do you have another name?')

        name = await websocket.recv()

        greeting = f"Hello {name}!"

        print(f'{name} said hi!')


start_server = websockets.serve(hello, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
