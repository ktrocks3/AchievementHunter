import argparse
import json
import os
import re
import pandas as pd

# File paths
log_state_file = 'backend/python/readlogs.txt'
output_file = 'backend/python/local.xlsx'
input_file = 'backend/python/Outcomes.xls'

# Regex pattern
pattern = r"Output chosen: (Option[12](Success|Failure)) for (\d+):"

def load_or_initialize_dataframe():
    """Load the existing DataFrame or create a new one with added columns."""
    if os.path.isfile(output_file):
        df = pd.read_excel(output_file)
    else:
        if not os.path.isfile(input_file):
            raise FileNotFoundError(f"Input file '{input_file}' not found.")
        df = pd.read_excel(input_file)
        create_output(df)
    return df

def create_output(df):
    """Add boolean columns to the DataFrame and save it."""
    for col in ['O1S', 'O1F', 'O2S', 'O2F']:
        df[col] = False
    df.to_excel(output_file, index=False)

def load_seen_logs():
    """Load the list of processed log files."""
    if os.path.isfile(log_state_file):
        with open(log_state_file, 'r') as f:
            return json.load(f)
    return []

def save_logs_state(seen_logs):
    """Save the updated list of processed log files."""
    with open(log_state_file, 'w') as f:
        json.dump(seen_logs, f)

def read_logs(df, filepath, seen_logs):
    """Read and process logs from the specified folder."""
    for file in os.listdir(filepath):
        if file in seen_logs:
            continue
        seen_logs.append(file)
        full_path = os.path.join(filepath, file)
        with open(full_path, 'r') as f:
            lines = [line.strip() for line in f.readlines()]
        for line in lines:
            if 'Output chosen' in line:
                match = re.search(pattern, line)
                if match:
                    option, number = match.group(1), match.group(3)
                    option = option[0] + option[6:8]  # Format Option1Success to O1S
                    number = int(number)
                    df.loc[df['N'] == number, option] = True
    return df

if __name__ == "__main__":
    # Set up argument parser
    parser = argparse.ArgumentParser(description="Process log files and update the DataFrame.")
    parser.add_argument(
        '-l', '--log_folder',
        type=str,
        required=True,
        help='Path to the folder containing log files.'
    )
    args = parser.parse_args()
    log_folder = args.log_folder

    # Verify that the provided log folder exists
    if not os.path.isdir(log_folder):
        raise FileNotFoundError(f"The folder '{log_folder}' does not exist.")

    # Load or initialize data
    df = load_or_initialize_dataframe()

    # Load seen logs
    seen_logs = load_seen_logs()

    # Process logs and update the DataFrame
    df = read_logs(df, log_folder, seen_logs)

    # Save updated state
    save_logs_state(seen_logs)
    df.to_excel(output_file, index=False)
