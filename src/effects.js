// Anatomical adaptations follow the body and disappear with the power.
export function drawAbilityEffects(scene) {
  const g=scene.mutations,d=scene.dino,s=d.scaleX,x=d.x,y=d.y;
  const cy=y-(d.sliding?17:30)*s,t=scene.elapsed;g.clear();
  if(scene.run.upgrades.includes('magnet')) {
    g.lineStyle(1.5,0x9ef5cf,.35);g.beginPath();
    for(let i=0;i<2;i++)g.arc(x,cy,43+i*9,t*1.8+i*3,t*1.8+i*3+1.1,false);
    g.strokePath();
    for(let i=0;i<3;i++){const a=t*2+i*2.1;g.fillStyle(0xc9ffbd,.7);g.fillCircle(x+Math.cos(a)*49,cy+Math.sin(a)*34,2);}
  }
  if(scene.run.upgrades.includes('double')) {
    const flap=Math.sin(t*(d.body.blocked.down?9:16))*10*s;
    g.fillStyle(0x32556b,1);g.fillTriangle(x-8*s,cy+2*s,x-40*s,cy-27*s-flap,x-29*s,cy+10*s);
    g.fillStyle(0x8cd6da,.95);g.fillTriangle(x-9*s,cy,x-37*s,cy-23*s-flap,x-26*s,cy+6*s);
    g.lineStyle(2,0xd2f5e1,.9);g.lineBetween(x-9*s,cy,x-37*s,cy-23*s-flap);
  }
  if(scene.armour){
    g.lineStyle(2,0x695f54,1);g.fillStyle(0xd8cdb0,1);
    for(let i=0;i<3;i++){const px=x-18*s+i*8*s,py=cy-7*s-i*3*s;g.fillRoundedRect(px,py,9*s,7*s,3);g.strokeRoundedRect(px,py,9*s,7*s,3);}
    g.fillEllipse(x-31*s,cy+12*s,17*s,12*s);g.strokeEllipse(x-31*s,cy+12*s,17*s,12*s);
  }
  if(scene.run.upgrades.includes('dash')){
    const stride=d.body.blocked.down?Math.sin(t*18)*4*s:0;
    g.lineStyle(4,0x344957,1);g.lineBetween(x-5*s,y-17*s,x-10*s,y-3*s+stride);g.lineBetween(x+5*s,y-17*s,x+11*s,y-3*s-stride);
    g.lineStyle(2,0x58f2ff,1);g.lineBetween(x-5*s,y-16*s,x-10*s,y-4*s+stride);g.lineBetween(x+5*s,y-16*s,x+11*s,y-4*s-stride);
  }
  if(scene.phoenix){g.fillStyle(0xffb66e,.07+Math.sin(t*3)*.025);g.fillEllipse(x,cy,68*s,65*s);}
  if(scene.run.upgrades.includes('spring')&&d.body.blocked.down){g.lineStyle(2,0xffcf8b,.5);g.strokeEllipse(x,y-2,42+Math.sin(t*5)*5,7);}
  if(t<scene.dashUntil){for(let i=0;i<5;i++){g.fillStyle(0x89e5ff,(1-i/5)*.2);g.fillRoundedRect(x-38-i*16,cy-18,42,32,10);}g.lineStyle(2,0xc3faff,.8);g.lineBetween(x-95,cy,x-25,cy);g.lineBetween(x-70,cy+12,x-24,cy+12);}
  if(t<scene.comebackUntil){
    const age=1.2-(scene.comebackUntil-t);
    g.lineStyle(3,0xffdf9b,.8);g.strokeEllipse(x,cy,75+Math.sin(t*20)*4,72);
    for(let i=0;i<4;i++){g.fillStyle(0xffc878,.18-i*.035);g.fillRoundedRect(x-55-i*22,cy-21,44,39,13);}
    g.lineStyle(2,0xffe8aa,Math.max(0,1-age));g.strokeCircle(x,cy,45+age*110);
  }
  for(const ring of scene.jumpRings){const age=t-ring.at;if(age<.45){g.lineStyle(2,ring.color,(1-age/.45)*.7);g.strokeEllipse(ring.x,ring.y,20+age*125,6+age*26);}}
  scene.jumpRings=scene.jumpRings.filter(r=>t-r.at<.45);
}
