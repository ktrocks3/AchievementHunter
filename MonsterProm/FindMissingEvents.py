import os

import pandas as pd

filepath = 'C:\\Users\\Kishan\\Documents\\Personal\\mplog'

df = pd.read_excel('Outcomes.xls')


def read_logs():
    global filepath
    for file in os.listdir(filepath):
        file = f"{filepath}\\{file}"
        lines = [l.strip() for l in open(file).readlines()]
        for line in lines:
            print(line)

read_logs()
print(df.keys())