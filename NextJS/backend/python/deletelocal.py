import os

file_path = 'backend/python/local.xlsx'

# Check if the file exists before attempting to delete
print(os.getcwd())
if os.path.exists(file_path):
    os.remove(file_path)
    print(f"{file_path} has been deleted.")
else:
    print(f"{file_path} does not exist.")
