function HavenIcon({name}) {
  const paths = {
    platform:['M3 4h18v12H3z','M8 21h8M12 16v5'],
    system:['M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z'],
    overview:['M4 3h16v18H4z','M8 7h8M8 12h8M8 17h5'],
    challenge:['M12 3 3 7v5c0 5 9 9 9 9s9-4 9-9V7z','M12 8v5M12 16v1'],
    solution:['m9 5-7 7 7 7m6-14 7 7-7 7'],
    impact:['M4 20V10m8 10V4m8 16v-7'],
    reflection:['M4 4h16v13H9l-5 4z','M8 8h8M8 12h5']
  };
  return React.createElement('svg',{className:'haven-icon',viewBox:'0 0 24 24',fill:'none',stroke:'currentColor',strokeWidth:1.5,strokeLinecap:'round',strokeLinejoin:'round','aria-hidden':true,focusable:false},(paths[name]||paths.overview).map((d,i)=>React.createElement('path',{d,key:i})));
}
function HavenOnboarding() {
  const h = React.createElement;
  const [playing, setPlaying] = React.useState(false);
  const [replay, setReplay] = React.useState(0);
  const frame = React.useRef(null);
  const panel = React.useRef(null);
  React.useEffect(() => {
    const complete = event => {
      if (event.origin === location.origin && event.source === frame.current?.contentWindow && event.data?.type === 'haven-onboarding-complete') setPlaying(false);
    };
    window.addEventListener('message', complete);
    const observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) setPlaying(false);
      else if (!matchMedia('(prefers-reduced-motion: reduce)').matches) setPlaying(true);
    }, {threshold:0.15});
    if (panel.current) observer.observe(panel.current);
    return () => { window.removeEventListener('message', complete); observer.disconnect(); };
  }, []);
  return h('section', {className:'haven-onboarding',ref:panel,'aria-label':'Haven onboarding animation'},
    h('div',{className:'haven-onboarding__heading'},h('div',null,h('span',{className:'haven-onboarding__eyebrow'},'THE FIRST MOMENT OF TRUST'),h('h2',null,'Welcome to your private space.')),playing && h('div',{className:'haven-onboarding__controls'},h('button',{onClick:()=>setReplay(replay+1)},'Replay'),h('button',{onClick:()=>setPlaying(false)},'Close'))),
    playing ? h('iframe',{key:replay,ref:frame,src:'assets/haven-onboarding/index.html?v=autoplay-en',title:'Haven onboarding — automatic playback',className:'haven-onboarding__frame',sandbox:'allow-scripts allow-same-origin'}) : h('button',{className:'haven-onboarding__poster',onClick:()=>setPlaying(true),'aria-label':'Play Haven onboarding'},h('img',{src:'assets/portfolio/haven-onboarding-en.webp',width:1280,height:560,alt:'Welcome to Haven — original onboarding opening',loading:'lazy'}),h('span',{className:'haven-onboarding__play'},'▶ Play onboarding')),
    h('p',{className:'haven-onboarding__caption'},'The original onboarding, with automatic scene progression. Plays when visible and stops off-screen. Reduced-motion preferences are respected.'));
}
const HAVEN_STOPS = [
  ['haven-intro','Introduction'],['haven-onboarding','Onboarding'],['haven-platform','Platform'],
  ['overview','Overview'],['challenge','Challenge'],['solution','Solution'],['impact','Impact'],['reflection','Reflection']
];
function HavenProgressNav() {
  const h = React.createElement;
  const [reading,setReading] = React.useState({index:0,progress:0});
  const [collapsed,setCollapsed] = React.useState(true);
  React.useEffect(()=>{
    let frame = 0;
    const update = () => {
      frame = 0;
      const points = HAVEN_STOPS.map(([id])=>document.getElementById(id)?.getBoundingClientRect().top ?? Infinity);
      const marker = Math.min(180,innerHeight*.25);
      let index = 0;
      for(let i=0;i<points.length;i++) if(points[i]<=marker) index=i;
      const next = points[index+1];
      const fraction = Number.isFinite(next) ? Math.max(0,Math.min(1,(marker-points[index])/(next-points[index]||1))) : 0;
      const progress = Math.max(0,Math.min(100,(index+fraction)/(points.length-1)*100));
      setReading(old=>old.index===index && Math.abs(old.progress-progress)<.2 ? old : {index,progress});
    };
    const schedule=()=>{if(!frame) frame=requestAnimationFrame(update)};
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule);
    const observer=new ResizeObserver(schedule);
    const page=document.querySelector('.haven-detail'); if(page) observer.observe(page);
    update();
    return()=>{window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);observer.disconnect();cancelAnimationFrame(frame)};
  },[]);
  return h('nav',{className:'haven-progress-nav'+(collapsed?' is-collapsed':''),'aria-label':'Haven case study navigation'},
    h('button',{className:'haven-progress-toggle',type:'button','aria-expanded':!collapsed,'aria-controls':'haven-progress-chapters',onClick:()=>setCollapsed(!collapsed)},'Contents',h('span',null,collapsed?'+':'−')),
    h('div',{className:'haven-progress-title'},'CONTENTS',h('span',null,Math.round(reading.progress)+'%')),
    h('div',{id:'haven-progress-chapters',className:'haven-progress-list',style:{'--reading-progress':reading.progress+'%'}},
      h('div',{className:'haven-progress-track','aria-hidden':true},h('span')),
      HAVEN_STOPS.map(([id,label],index)=>h('button',{key:id,type:'button',className:index===reading.index?'is-current':index<reading.index?'is-complete':'','aria-current':index===reading.index?'location':undefined,onClick:()=>{setCollapsed(true);document.getElementById(id)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'})}},h('span',{className:'haven-progress-dot','aria-hidden':true}),label))));
}
function HavenProjectDetail({lang, onBack}) {
  const h = React.createElement;
  return h('section',{className:'project-detail project-detail--media-only haven-detail'},
    h(HavenProgressNav),
    h('div',{className:'shell'},
      h('button',{className:'project-detail__back',onClick:()=>{ if(location.hash==='#haven') location.hash='projects'; onBack(); }},'← Back to projects'),
      h('div',{id:'haven-intro',className:'project-detail__header project-detail__header--center'},
        h('h1',{className:'project-detail__title'},'Haven AI'),
        h('div',{className:'project-detail__meta project-detail__meta--tags'},['Private Wealth','Personal AI','2026'].map(label=>h('span',{key:label,className:'project-detail__pill'},label))),
        h('p',{className:'project-detail__intro'},'Your 24/7 private AI relationship manager. Helping overseas high-net-worth individuals preserve their wealth through a private, secure and effortless experience.'),
        h('div',{className:'haven-links'},h('a',{href:'haven-preview/?view=platform'},h(HavenIcon,{name:'platform'}),'View platform ↗'),h('a',{href:'haven-preview/?view=design-system'},h(HavenIcon,{name:'system'}),'View design system ↗'))),
      h('div',{id:'haven-onboarding'},h(HavenOnboarding)),
      h('figure',{id:'haven-platform',className:'haven-lead'},h('img',{src:'assets/portfolio/haven-platform-en.webp',width:1280,height:630,alt:'Haven platform home captured from the supplied local application in English',loading:'lazy',decoding:'async'}),h('figcaption',null,'Platform home — captured from the supplied local application.')),
      h('div',{className:'haven-content',dangerouslySetInnerHTML:{__html:window.HAVEN_CASE_HTML}})));
}
