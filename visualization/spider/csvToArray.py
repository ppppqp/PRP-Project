import csv
with open('Keys.csv', 'r') as f:
  reader = csv.reader(f)
  print(type(reader))
  
  for row in reader:
    print(row)