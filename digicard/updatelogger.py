import datetime

changes = input('Changes made: ')
time = datetime.datetime.now()

with open('updatelog.txt', 'a') as f:
    f.write(f"{time, changes}")
