# Turns the translation tables in i18n/*.json into i18n/*.js, which index.html loads.
# (Browsers can't read .json files next to a page opened straight from disk, but they can load .js files.)
# Usage, from the repo root:  python3 i18n/bake.py
import json,os
D=os.path.dirname(os.path.abspath(__file__))
keys=json.load(open(D+'/en_keys.json'));known=set(k for k,_ in keys['ui'])|set(k for k,_ in keys['data'])
for lang in ['bs','sr','de','es','fr']:
    T={k:v for k,v in json.load(open(f'{D}/{lang}.json',encoding='utf-8')).items() if k in known}
    line=f'I18N.{lang}='+json.dumps(T,ensure_ascii=False,separators=(',',':')).replace('</','<\\/')+';'
    open(f'{D}/{lang}.js','w',encoding='utf-8').write(f'// Made by i18n/bake.py from i18n/{lang}.json. Do not edit by hand.\n{line}\n')
print('baked i18n/*.js')
