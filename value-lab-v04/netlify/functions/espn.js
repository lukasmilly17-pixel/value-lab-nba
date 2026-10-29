exports.handler=async(event)=>{
 const path=event.queryStringParameters?.path||'';
 if(!/^\/apis\/(?:site\/v2|v2)\/sports\/basketball\/nba\/(?:scoreboard|summary|standings|injuries|teams\/\d+\/schedule)(?:\?|$)/.test(path))return {statusCode:400,body:JSON.stringify({error:'Route ESPN non autorisée'})};
 try{const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),12000);
 const response=await fetch('https://site.api.espn.com'+path,{signal:controller.signal,headers:{Accept:'application/json','User-Agent':'Mozilla/5.0'}});clearTimeout(timer);
 return {statusCode:response.status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'public, max-age=120'},body:await response.text()};
 }catch(e){return {statusCode:502,headers:{'Content-Type':'application/json'},body:JSON.stringify({error:'Connexion ESPN impossible : '+e.message})}}
};
