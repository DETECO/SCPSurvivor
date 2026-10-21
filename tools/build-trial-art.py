"""Generate editable native SVG atlases; originals in assets/actors stay untouched."""
from pathlib import Path
import json, hashlib

ROOT=Path(__file__).resolve().parents[1]
DEST=ROOT/'assets/actors-demo-v1'
INK='#12171d';DARK='#242e35';MID='#43505a';LIGHT='#79878d';IVORY='#d4d7c9';RED='#c93c4a';GOLD='#eabf69'
def rect(x,y,w,h,c):return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{c}"/>'
def poly(points,c):return f'<polygon points="{points}" fill="{c}"/>'
def soldier(kind,row,frame):
    back=row in [3,4,5];side=row in [2,6];diag=row in [1,3,5,7]
    step=[0,2,0,-2][frame];s=[]
    def r(x,y,w,h,c):s.append(rect(x,y,w,h,c))
    def p(points,c):s.append(poly(points,c))
    armor='#677566' if kind=='guard01' else '#c5c9bc';lit='#97a18a' if kind=='guard01' else '#ecebda'
    # Articulated silhouette: two separate gait poses, boots and knee armor.
    r(15,39+step,8,12,INK);r(26,39-step,8,12,INK)
    r(16,40+step,6,8,MID);r(27,40-step,6,8,DARK)
    r(15,42+step,7,3,armor);r(27,42-step,7,3,armor)
    r(14,49+step,10,4,INK);r(26,49-step,10,4,INK)
    r(15,50+step,7,1,LIGHT);r(27,50-step,7,1,MID)
    p('14,22 34,22 36,28 33,40 15,40 12,28',INK)
    p('16,23 31,23 33,30 30,39 17,39 14,29',armor)
    r(18,25,12,10,DARK);r(19,26,10,4,MID);r(19,26,9,1,LIGHT)
    r(17,30,3,7,INK);r(29,30,3,7,INK)
    r(18,32,5,5,armor);r(25,32,5,5,armor);r(18,32,5,1,lit);r(25,32,5,1,lit)
    r(16,38,16,3,INK);r(22,38,4,2,LIGHT)
    # Shoulders, bent forearms and gloved hands instead of rectangular body blocks.
    p('12,23 16,24 16,31 13,36 9,35 8,30 9,25',INK)
    p('33,24 37,23 40,28 39,35 35,37 32,33',INK)
    r(10,25,5,5,armor);r(34,25,5,5,armor);r(10,25,5,1,lit);r(34,25,5,1,lit)
    r(10,31+step//2,4,5,MID);r(34,31-step//2,4,5,MID)
    r(10,35+step//2,5,4,INK);r(33,35-step//2,5,4,INK)
    r(11,35+step//2,2,1,LIGHT);r(34,35-step//2,2,1,LIGHT)
    if kind=='medic01':r(10,26,4,3,RED);r(11,25,2,5,RED)
    else:r(34,26,4,2,RED);r(34,28,2,1,IVORY)
    # Helmet has bevels, ear cups, visor, breathing mask and rear harness.
    p('17,3 29,3 34,7 36,17 32,22 16,22 12,17 13,8',INK)
    p('17,4 29,4 33,8 34,15 30,19 16,18 14,13 15,8',armor)
    p('18,5 28,5 31,8 31,10 16,10 16,8',lit)
    r(21,5,4,4,armor);r(15,11,19,2,INK)
    r(12,12,3,7,DARK);r(33,12,3,7,DARK);r(12,12,2,2,LIGHT)
    if back:
        r(16,12,16,7,armor);r(17,13,14,2,lit);r(20,17,8,3,DARK)
        r(18,25,12,12,INK);r(19,26,10,9,MID);r(21,27,6,5,armor);r(19,34,10,2,DARK)
        r(16,24,2,11,LIGHT);r(31,24,2,11,LIGHT)
    else:
        shift=3 if side else 1 if diag else 0
        p(f'{15+shift},13 32,13 32,17 28,19 18,19 {15+shift},17',INK)
        r(16+shift,13,15-shift,4,GOLD if kind=='guard01' else '#a4c4c2')
        r(17+shift,13,11-shift,1,'#fff0bb' if kind=='guard01' else '#e5f0e5')
        r(17+shift,14,2,2,IVORY);r(28,15,3,2,'#a26b35' if kind=='guard01' else '#608a91')
        p('19,18 28,18 30,22 27,24 20,24 17,21',INK)
        r(21,19,5,3,MID);r(22,19,4,1,LIGHT)
        if side:r(15,12,4,7,armor);r(15,13,3,2,lit)
    if row>=5:return '<g transform="translate(48 0) scale(-1 1)">'+''.join(s)+'</g>'
    return ''.join(s)

def pursuer(row,frame):
    back=row in [3,4,5];step=[0,2,0,-2][frame];s=[]
    def r(x,y,w,h,c):s.append(rect(x,y,w,h,c))
    def p(points,c):s.append(poly(points,c))
    skin='#b2ada0';shade='#706d69';cloth='#606d6c'
    p(f'17,38 23,38 22,{49+step} 15,{53+step} 12,{51+step} 16,46',INK)
    p(f'26,38 32,37 34,{47-step} 38,{51-step} 35,{53-step} 29,49',INK)
    r(18,40,4,7,shade);r(28,40,4,7,shade)
    p('16,19 28,17 34,24 33,39 27,43 17,39 13,28',INK)
    p('17,21 27,19 31,24 30,38 25,39 18,36 16,28',cloth)
    p('18,23 24,21 26,28 23,37 18,35',skin)
    r(20,25,5,1,IVORY);r(21,28,4,1,shade);r(20,31,4,1,shade)
    p('14,23 17,25 12,35 10,43 6,45 4,42 8,31 9,26',INK)
    p('10,29 13,26 14,29 10,37 9,42 6,43 8,35',skin)
    p('31,23 36,24 39,32 39,42 44,45 43,48 37,46 34,35',INK)
    p('35,27 37,32 37,41 41,44 40,45 36,43 33,32',skin)
    r(5,43,1,4,IVORY);r(8,43,1,4,IVORY);r(41,45,1,3,IVORY)
    p('19,4 29,6 32,12 29,21 21,23 15,18 14,10',INK)
    p('19,5 27,7 30,12 27,20 21,21 17,17 16,10',skin)
    r(18,7,3,3,IVORY);r(16,12,3,4,shade);r(27,14,3,3,shade)
    if not back:
        r(19,12,3,3,INK);r(26,13,3,3,INK);r(20,13,1,1,RED);r(27,14,1,1,RED)
        r(22,17,5,3,INK);r(23,18,3,1,IVORY)
    else:r(19,9,9,5,shade);r(18,24,9,11,shade);r(20,27,5,1,skin)
    if row>=5:return '<g transform="translate(48 0) scale(-1 1)">'+''.join(s)+'</g>'
    return ''.join(s)

def anomaly(kind,row,frame):
    s=[];step=[0,2,0,-2][frame];back=row in [3,4,5]
    def r(x,y,w,h,c):s.append(rect(x,y,w,h,c))
    def p(points,c):s.append(poly(points,c))
    if kind=='biological01':
        p(f'40,83 51,89 47,{112+step} 37,{119+step} 24,{119+step} 27,111 35,106',INK)
        p(f'75,87 90,82 94,102 105,{113-step} 103,{120-step} 87,119 79,107',INK)
        p('32,43 39,29 54,21 75,23 91,33 97,49 104,72 95,88 80,98 53,99 31,85 25,65',INK)
        p('38,43 43,32 56,26 74,28 87,37 89,53 98,70 89,84 77,91 56,94 37,81 31,64', '#384c4b')
        p('44,37 59,31 76,36 82,49 78,62 86,74 74,88 55,86 42,72 38,54','#708379')
        p('49,40 63,35 74,40 78,51 70,65 56,67 45,58','#afbaa0')
        p('29,48 21,52 10,67 16,76 30,67 38,57',INK)
        p('27,53 21,59 16,68 19,69 32,60','#677b70')
        p('96,46 109,53 120,70 114,81 101,74 90,60',INK)
        p('100,54 110,59 115,70 112,73 100,66','#677b70')
        r(37,107,9,8,'#53645f');r(87,108,9,8,'#53645f')
        p('42,78 52,83 57,91 45,88','#b4bba2');p('82,69 89,77 86,83 78,82','#a3ad97')
        if not back:
            p('51,48 57,43 72,44 79,51 73,58 58,58',INK)
            p('55,48 61,46 70,47 74,51 69,55 60,54',GOLD)
            r(64,46,4,9,INK);r(64,47,2,2,IVORY)
            p('52,70 73,69 76,74 70,81 55,79 50,75',INK)
            for x in [55,61,67]:r(x,71,3,4,IVORY)
        else:p('48,40 70,34 79,47 68,73 55,83 46,66','#465b54')
        r(84,35,3,5,RED);r(34,71,3,4,'#91a38a')
    else:
        p(f'40,90 57,89 55,{116+step} 50,{122+step} 29,{122+step} 28,{117+step} 36,112',INK)
        p(f'72,89 88,90 92,{112-step} 102,{117-step} 100,{123-step} 77,{123-step} 73,116',INK)
        r(39,94,14,17,MID);r(75,94,13,17,DARK);r(37,103,17,5,LIGHT);r(75,103,16,5,MID)
        p('33,29 49,22 80,23 96,33 94,56 88,89 76,100 47,99 33,85 29,57',INK)
        p('37,33 51,27 77,28 91,37 86,59 83,86 72,94 50,93 39,82 34,58',MID)
        p('41,35 52,30 76,31 84,37 79,51 48,52',LIGHT)
        r(43,36,36,4,'#a4a99e');r(47,51,33,5,INK)
        r(43,59,9,23,DARK);r(76,59,8,22,DARK)
        p('23,29 36,31 38,47 27,54 14,49 13,35',INK)
        p('18,35 31,33 33,44 25,49 17,45',LIGHT)
        p('92,30 104,29 115,36 115,50 103,56 91,46',INK)
        p('97,34 105,34 111,39 110,46 102,50 96,44',MID)
        r(17,53,13,31,INK);r(19,54,8,23,MID);r(17,76,14,13,DARK);r(19,80,3,7,LIGHT)
        r(98,54,14,30,INK);r(101,55,8,22,MID);r(98,76,14,14,DARK);r(104,80,3,8,LIGHT)
        p('49,8 74,8 83,17 82,32 72,40 52,39 43,29 43,17',INK)
        p('50,12 71,12 77,18 76,28 69,34 55,33 48,27 48,19',LIGHT)
        r(52,13,20,4,IVORY);r(52,20,21,8,INK)
        if not back:
            r(54,22,6,3,RED);r(65,22,6,3,RED);r(60,30,6,6,DARK)
            p('55,59 70,59 76,68 70,82 55,82 49,70',INK)
            p('58,63 68,63 71,70 66,78 58,77 54,70',RED)
            r(59,65,5,8,'#f18e79');r(60,66,3,4,'#f5d8aa')
        else:
            r(50,50,27,35,INK);r(53,53,21,29,DARK);r(57,55,13,20,LIGHT)
            for y in [57,63,69]:r(59,y,9,2,INK)
        for y in [57,65,73,81]:r(34,y,4,5,'#a1a59b');r(87,y,4,5,'#7e898a')
        r(20,37,5,6,RED);r(101,38,5,5,RED)
    if row>=5:return '<g transform="translate(128 0) scale(-1 1)">'+''.join(s)+'</g>'
    return ''.join(s)

def main():
    manifest={'status':'provisional_native_vector_art','notApprovedFinalCatalog':True,'sample':2,'actors':[]}
    for kind in ['guard01','medic01','pursuer01','biological01','warden01']:
        w,h=(48,56)if kind in ['guard01','medic01','pursuer01']else(128,128)
        files=[]
        for name,n in [('Idle',1),('Walk',4)]:
            cells=[]
            for row in range(8):
                for frame in range(n):
                    art=soldier(kind,row,frame)if kind in ['guard01','medic01']else pursuer(row,frame)if kind=='pursuer01'else anomaly(kind,row,frame)
                    cells.append(f'<g transform="translate({frame*w} {row*h})">{art}</g>')
            data=f'<svg xmlns="http://www.w3.org/2000/svg" width="{w*n}" height="{h*8}" viewBox="0 0 {w*n} {h*8}" shape-rendering="crispEdges">'+''.join(cells)+'</svg>\n'
            path=DEST/kind/(name+'.svg');path.parent.mkdir(parents=True,exist_ok=True);path.write_text(data,encoding='utf-8',newline='\n')
            files.append({'file':path.relative_to(ROOT).as_posix(),'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'width':w*n,'height':h*8,'frames':n,'directions':8})
        manifest['actors'].append({'id':kind,'files':files})
    (DEST/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n',encoding='utf-8')
    print('Generated 10 SVG atlases, 5 actors, original geometry preserved; originals untouched.')
if __name__=='__main__':main()
