const menu=document.getElementById("menu");
const navbar=document.querySelector(".navbar");
menu.addEventListener("click",()=>navbar.classList.toggle("open"));
document.querySelectorAll("nav a").forEach(a=>a.addEventListener("click",()=>navbar.classList.remove("open")));

const sections=document.querySelectorAll("section[id]");
const links=document.querySelectorAll("nav a");
window.addEventListener("scroll",()=>{
  let current="";
  sections.forEach(section=>{
    if(scrollY >= section.offsetTop-160) current=section.id;
  });
  links.forEach(link=>link.classList.toggle("active",link.getAttribute("href")==="#"+current));
});

function sendMessage(e){
  e.preventDefault();
  const name=document.getElementById("name").value.trim();
  alert(`Thanks ${name}! Your message form is ready. Connect this form to your email/WhatsApp when you're ready.`);
  e.target.reset();
}