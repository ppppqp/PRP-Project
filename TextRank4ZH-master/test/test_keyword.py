#-*- encoding:utf-8 -*-
from __future__ import print_function

import sys
try:
    reload(sys)
    sys.setdefaultencoding('utf-8')
except:
    pass

import codecs
from textrank4zh import TextRank4Keyword

text = codecs.open('./doc/-1.txt', 'r', 'utf-8').read()
# text = "世界的美好。世界美国英国。 世界和平。"

tr4w = TextRank4Keyword()
tr4w.analyze(text=text,lower=True, window=3, pagerank_config={'alpha':0.85})

for item in tr4w.get_keywords(100, word_min_len=3):
    print(item.word)

print('--phrase--')

for phrase in tr4w.get_keyphrases(keywords_num=20, min_occur_num = 0):
    print(phrase)