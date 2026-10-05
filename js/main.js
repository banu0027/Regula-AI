(function(){
  var b=document.getElementById('burger'),m=document.getElementById('menu');
  function set(o){m.classList.toggle('open',o);b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Close menu':'Open menu');}
  b.addEventListener('click',function(){set(!m.classList.contains('open'));});
  m.addEventListener('click',function(e){if(e.target.tagName==='A')set(false);});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false);});

  var secs=[].slice.call(document.querySelectorAll('main section[id]')),links=[].slice.call(m.querySelectorAll('a[href^="#"]'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id);});}});},{rootMargin:'-45% 0px -50% 0px'});
    secs.forEach(function(s){io.observe(s);});
  }

  var f=document.getElementById('demo'),ok=document.getElementById('ok');
  var rules={name:function(v){return v.trim().length>=2||'Enter your full name.';},
    company:function(v){return v.trim().length>=2||'Enter your company name.';},
    email:function(v){return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)||'Enter a valid email, like name@company.com.';},
    phone:function(v){return /^[+()\-\s\d]{8,16}$/.test(v)&&v.replace(/\D/g,'').length>=10||'Enter a valid phone number with at least 10 digits.';},
    role:function(v){return !!v||'Select your role.';}};
  function check(el){var r=rules[el.name];if(!r)return true;var res=r(el.value),err=el.parentNode.querySelector('.err');
    var bad=res!==true;el.setAttribute('aria-invalid',bad);err.textContent=bad?res:'';return !bad;}
  [].forEach.call(f.elements,function(el){if(el.name){el.addEventListener('blur',function(){check(el);});el.addEventListener('input',function(){if(el.getAttribute('aria-invalid')==='true')check(el);});}});
  f.addEventListener('submit',function(e){e.preventDefault();ok.hidden=true;var first=null;
    [].forEach.call(f.elements,function(el){if(el.name&&!check(el)&&!first)first=el;});
    if(first){first.focus();return;}
    ok.hidden=false;f.reset();});
})();
