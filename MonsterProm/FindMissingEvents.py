import json
import os
import re

import pandas as pd

filepath = 'C:\\Users\\Kishan\\Documents\\Personal\\mplog'


def read_logs():
    global filepath, seen_logs
    for file in os.listdir(filepath):
        if file in seen_logs:
            continue
        seen_logs.append(file)
        file = f"{filepath}\\{file}"
        lines = [l.strip() for l in open(file).readlines()]
        for line in lines:
            if 'Output chosen' in line:
                match = re.search(pattern, line)
                if match:
                    option, number = match.group(1), match.group(3)
                    option = option[0] + option[6:8]
                    number = int(number)
                    df.loc[df['N'] == number, option] = True


def create_output():
    df['O1S'] = False
    df['O1F'] = False
    df['O2S'] = False
    df['O2F'] = False
    df.to_excel('local.xlsx')


pattern = r"Output chosen: (Option[12](Success|Failure)) for (\d+):"

if os.path.isfile('local.xls'):
    df = pd.read_excel('local.xlsx')
else:
    df = pd.read_excel('Outcomes.xls')
    create_output()

if os.path.isfile('readlogs.txt'):
    with open('readlogs.txt', 'r') as f:
        seen_logs = json.load(f)  # Load the list correctly
else:
    seen_logs = []

read_logs()
with open('readlogs.txt', 'w') as f:
    json.dump(seen_logs, f)  # Save the list properly
df.to_excel('local.xlsx')
