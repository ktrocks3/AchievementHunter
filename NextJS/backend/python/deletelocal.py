import os


def delete_file(file_path):
	# Check if the file exists before attempting to delete
	if os.path.exists(file_path):
		os.remove(file_path)
		print(f"{file_path} has been deleted.")
	else:
		print(f"{file_path} does not exist.")


delete_file('backend/python/local.xlsx')
delete_file('backend/python/readlogs.txt')
