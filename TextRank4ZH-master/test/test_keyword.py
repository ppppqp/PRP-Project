# -*- encoding:utf-8 -*-
from __future__ import print_function

import sys
try:
    reload(sys)
    sys.setdefaultencoding('utf-8')
except:
    pass

import codecs
import pandas as pd
from textrank4zh import TextRank4Keyword

file = "./data_brief.csv"

topicRange = []
data = pd.read_csv(file)
for i in range(len(data)):
    if not(data["school"][i] in topicRange) and data["school"][i] != "(096)科学史与科学文化研究院":
        topicRange.append(data["school"][i])
exportKeys = []
for topic in topicRange:
    #filtered = data.loc[(data['school'] == topic) & (data['year'] == 2019)]
    keywords = ""
    extracted = []
    for i in range(len(data)):
        if data['school'][i] == topic and data['year'][i] == 2019:
            keywords += data['keyword'][i]
            keywords += '\n'
    text = keywords
    tr4w = TextRank4Keyword()
    tr4w.analyze(text=text, lower=True, window=3,
                 pagerank_config={'alpha': 0.85})
    for item in tr4w.get_keywords(100, word_min_len=3):
        if item.word[0] < 'a' or item.word[0] > 'z':
            extracted.append(item.word)
    # print(extracted)
    print(len(extracted))
    exportKeys.append(extracted)
    # text = codecs.open('./doc/-1.txt', 'r', 'utf-8').read()
    # text = "世界的美好。世界美国英国。 世界和平。"
exportKeysT = []
for i in range(50):
    row = []
    for j in range(len(topicRange)):
        row.append("x")
    exportKeysT.append(row)

for i in range(50):
    for j in range(len(topicRange)):
        if len(exportKeys[j]) > i:
            exportKeysT[i][j] = exportKeys[j][i]

# exportKeysT = [[row[min(i, len(row)-1)] for row in exportKeys]
#                for i in range(50)]
print(exportKeysT)
output = pd.DataFrame(exportKeysT, columns=topicRange)
output.to_csv("Keys.csv", index=False, header=True)
print(topicRange)
print(len(topicRange))
# tr4w = TextRank4Keyword()
# tr4w.analyze(text=text, lower=True, window=3, pagerank_config={'alpha': 0.85})

# for item in tr4w.get_keywords(100, word_min_len=3):
#     print(item.word)

# print('--phrase--')

# for phrase in tr4w.get_keyphrases(keywords_num=20, min_occur_num=0):
#     print(phrase)
