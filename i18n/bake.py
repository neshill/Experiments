# Copies the translation tables from i18n/*.json into ../index.html (the lines that start with "I18N.xx=").
# Usage, from the repo root:  python3 i18n/bake.py
import json,os,re
D=os.path.dirname(os.path.abspath(__file__));page=os.path.join(D,'..','index.html')
keys=json.load(open(D+'/en_keys.json'));known=set(k for k,_ in keys['ui'])|set(k for k,_ in keys['data'])
h=open(page,encoding='utf-8').read()
for lang in ['bs','sr','de','es','fr']:
    T={k:v for k,v in json.load(open(f'{D}/{lang}.json',encoding='utf-8')).items() if k in known}
    line=f'I18N.{lang}='+json.dumps(T,ensure_ascii=False,separators=(',',':')).replace('</','<\\/')+';'
    h,n=re.subn(r'^I18N\.'+lang+r'=.*;$',lambda m:line,h,count=1,flags=re.M)
    assert n==1,'no I18N.'+lang+' line in index.html'
open(page,'w',encoding='utf-8').write(h);print('baked into index.html')
