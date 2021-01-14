#-*- encoding:utf-8 -*-
from __future__ import print_function

import sys
try:
    reload(sys)
    sys.setdefaultencoding('utf-8')
except:
    pass

import codecs
from textrank4zh import TextRank4Sentence

text = codecs.open('./doc/03.txt', 'r', 'utf-8').read()
text = "气体产生酶新型抑制剂的发现及其作用机制的初步研究"
tr4s = TextRank4Sentence()
tr4s.analyze(text=text, lower=True, source = 'all_filters')

for st in tr4s.sentences:
    print(type(st), st)

print(20*'*')
for item in tr4s.get_key_sentences(num=4):
    print(item.weight, item.sentence, type(item.sentence))