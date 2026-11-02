const DATA = {
 profile:"/content/profile.json", about:"/content/about.json", skills:"/content/skills.json",
 projects:"/content/projects.json", experience:"/content/experience.json", education:"/content/education.json",
 achievements:"/content/achievements.json", services:"/content/services.json", gallery:"/content/gallery.json",
 blog:"/content/blog.json", sections:"/content/sections.json"
};
async function getJSON(path){try{const r=await fetch(path,{cache:"no-store"});if(!r.ok)throw Error(r.status);return await r.json()}catch(e){return null}}
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const arr=x=>Array.isArray(x)?x:[];
function cards(items,cls,kind){if(!items.length)return '<div class="empty-note">This section is ready for your content. Add items from the Admin Dashboard.</div>';return items.map(x=>`<article class="${cls}">${x.image?`<img src="${esc(x.image)}" alt="${esc(x.title||"")}" loading="lazy">`:""}<div class="card-copy">${x.category?`<small>${esc(x.category)}</small>`:""}<h3>${esc(x.title||x.name||"")}</h3><p>${esc(x.description||x.body||"")}</p>${x.url?`<a class="text-link" href="${esc(x.url)}" target="_blank" rel="noopener">View details ↗</a>`:""}</div></article>`).join("")}
function timeline(items){if(!items.length)return '<div class="empty-note">Add your details from the Admin Dashboard.</div>';return items.map(x=>`<div class="timeline-item"><div class="timeline-date">${esc(x.date||x.period||"")}</div><div><h3>${esc(x.title||x.degree||x.role||"")}</h3><p>${esc(x.organization||x.institution||x.company||"")}</p><p>${esc(x.description||"")}</p></div></div>`).join("")}
function renderCustomSections(sections){const root=document.querySelector("#dynamic-sections");const items=arr(sections).filter(x=>x.enabled!==false).sort((a,b)=>(a.order||0)-(b.order||0));root.innerHTML=items.map(x=>`<section class="section-wrap custom-section" id="${esc(x.id||"custom")}"><p class="eyebrow">${esc(x.eyebrow||"MORE")}</p><h2>${esc(x.title||"")}</h2><p>${esc(x.text||"")}</p>${x.image?`<img src="${esc(x.image)}" alt="" style="max-width:100%;max-height:420px;border-radius:12px">`:""}</section>`).join("")}
function setSectionVisibility(sections){const ids=["about","skills","projects","experience","education","achievements","services","gallery","blog","contact"];const config=Object.fromEntries(arr(sections).map(x=>[x.id,x.enabled!==false]));ids.forEach(id=>{const el=document.getElementById(id);if(el&&config[id]===false)el.hidden=true})}
async function init(){
 const keys=Object.keys(DATA), values=await Promise.all(keys.map(k=>getJSON(DATA[k]))), d=Object.fromEntries(keys.map((k,i)=>[k,values[i]||{}]));
 const p=d.profile||{}; document.title=(p.name||"Mahamud")+" — "+(p.siteTitle||"Personal Portfolio");
 document.querySelector("#brand-name").innerHTML=esc(p.brand||p.name||"MAHAMUD")+"<span>.</span>";
 document.querySelector("#hero-name").innerHTML=esc(p.name||"Mahamud")+"<span>.</span>";
 document.querySelector("#hero-role").textContent=p.headline||"Your professional headline goes here";
 document.querySelector("#hero-intro").textContent=p.intro||"A short introduction about yourself. Update this from your admin dashboard.";
 document.querySelector("#hero-eyebrow").textContent=p.eyebrow||"HELLO, I'M";
 document.querySelector("#availability").textContent=p.availability||"Available for opportunities";
 if(p.photo)document.querySelector("#profile-image").src=p.photo;
 if(p.cv){const a=document.querySelector("#cv-link");a.href=p.cv;a.hidden=false}
 const socials=arr(p.socials).filter(x=>x.label&&x.url).map(x=>`<a href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.label)} ↗</a>`).join("");
 document.querySelector("#hero-social").innerHTML=socials;
 document.querySelector("#about-summary").textContent=d.about.summary||"Write a short personal introduction here.";
 document.querySelector("#about-details").textContent=d.about.details||"Share your story, interests and professional journey.";
 document.querySelector("#skills-list").innerHTML=arr(d.skills).length?arr(d.skills).map(x=>`<div class="skill-card"><strong>${esc(x.name)}</strong><span>${esc(x.level||x.category||"")}</span></div>`).join(""):'<div class="empty-note">Add your skills from the Admin Dashboard.</div>';
 document.querySelector("#projects-list").innerHTML=cards(arr(d.projects).slice(0,4),"project-card","project");
 document.querySelector("#experience-list").innerHTML=timeline(arr(d.experience));
 document.querySelector("#education-list").innerHTML=timeline(arr(d.education));
 document.querySelector("#achievements-list").innerHTML=cards(arr(d.achievements),"achievement-card","achievement");
 document.querySelector("#services-list").innerHTML=cards(arr(d.services),"service-card","service");
 document.querySelector("#gallery-list").innerHTML=arr(d.gallery).length?arr(d.gallery).map(x=>`<img src="${esc(x.image||x.url)}" alt="${esc(x.caption||"Gallery image")}" loading="lazy">`).join(""):'<div class="empty-note">Add photos from the Admin Dashboard.</div>';
 document.querySelector("#blog-list").innerHTML=cards(arr(d.blog).slice(0,3),"blog-card","blog");
 document.querySelector("#contact-copy").textContent=d.profile.contactText||"I would love to hear from you.";
 const email=d.profile.email||"";const ce=document.querySelector("#contact-email");if(email){ce.href="mailto:"+email;ce.textContent=email}else{ce.hidden=true}
 document.querySelector("#contact-location").textContent=d.profile.location||"";
 document.querySelector("#contact-social").innerHTML=socials;
 document.querySelector("#footer-name").textContent=(p.name||"MAHAMUD").toUpperCase();
 document.querySelector("#year").textContent=new Date().getFullYear();
 renderCustomSections(d.sections);setSectionVisibility(d.sections);
 const toggle=document.querySelector("#menu-toggle"),nav=document.querySelector("#main-nav");toggle.addEventListener("click",()=>{nav.classList.toggle("open");toggle.setAttribute("aria-expanded",nav.classList.contains("open"))});nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));
}
init();
