import json

with open('ticketsdata.json',encoding="utf8") as f:
    data= json.load(f)
idnum = 0 
for i in data:
    
    i["id"]= idnum
    idnum +=1
data_j= json.dumps (data)
with open('ticketsdata.json',"w") as f:
   f.write(data_j)
