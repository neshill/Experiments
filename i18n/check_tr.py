# usage: python3 check_tr.py bs   -> checks '+D+'/bs.json against en_keys.json
import json,re,sys,os
D=os.path.dirname(os.path.abspath(__file__))
lang=sys.argv[1]
E=json.load(open(''+D+'/en_keys.json'))
keys=[k for k,_ in E['ui']]+[k for k,_ in E['data']]
T=json.load(open(f'{D}/{lang}.json'))
bad=[]
missing=[k for k in keys if k not in T or not str(T[k]).strip()]
extra=[k for k in T if k not in keys]
ph=lambda s:sorted(re.findall(r'\{\d+\}',s))
tags=lambda s:sorted(re.findall(r'</?\w+>|<br>',s))
for k in keys:
    if k not in T: continue
    v=T[k]
    if ph(k)!=ph(v): bad.append(('placeholders',k,v))
    if tags(k)!=tags(v): bad.append(('html tags',k,v))
    for m in re.finditer(r'\[\[([^\]]*)\]\]',v):
        inner=m.group(1)
        if re.match(r'^\d+:',inner):
            i=int(inner.split(':')[0])
            if '{%d}'%i not in v and '{%d}'%i not in k: bad.append(('plural refers to a value that is not in the sentence',k,v))
            if '|' not in inner: bad.append(('plural needs | between forms',k,v))
        elif inner.count('|')!=1: bad.append(('gender switch must be [[male|female]]',k,v))
    if lang=='sr' and re.search(r'[Ѐ-ӿ]',v): bad.append(('Serbian must be written in LATIN script (it is converted to Cyrillic on screen)',k,v))
    if lang=='sr' and re.search(r'[qwxyQWXY]',re.sub(r'\{\d+\}|<[^>]+>','',v)): bad.append(('letters q/w/x/y cannot be converted to Cyrillic; respell',k,v))
print(f'{lang}: {len(keys)} keys, {len(missing)} missing, {len(extra)} extra (ignored), {len(bad)} problems')
for m in missing[:40]: print('MISSING:',m)
for b in bad[:60]: print('PROBLEM:',b[0],'|',b[1][:80],'=>',b[2][:80])
