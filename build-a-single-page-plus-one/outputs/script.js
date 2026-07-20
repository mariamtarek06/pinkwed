(() => {
  const field = document.querySelector('.confetti-field');
  for (let i = 0; i < 35; i += 1) {
    const piece = document.createElement('i');
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.animationDuration = `${7 + Math.random() * 9}s`;
    piece.style.animationDelay = `${-Math.random() * 14}s`;
    piece.style.setProperty('--drift', `${-100 + Math.random() * 200}px`);
    field.appendChild(piece);
  }

  const yes = document.querySelector('#yesButton');
  const no = document.querySelector('#noButton');
  const hint = document.querySelector('#hint');
  const success = document.querySelector('#successMessage');
  if (!yes || !no) return;
  let attempts = 0;
  let hasAccepted = false;

  const burst = () => {
    for (let i = 0; i < 55; i += 1) {
      const dot = document.createElement('i');
      dot.style.position = 'fixed'; dot.style.zIndex = '10';
      dot.style.left = `${48 + (Math.random() * 8 - 4)}vw`; dot.style.top = '45vh';
      dot.style.width = `${7 + Math.random() * 9}px`; dot.style.height = `${7 + Math.random() * 13}px`;
      dot.style.borderRadius = Math.random() > .5 ? '50%' : '2px';
      dot.style.background = ['#ff3b9d', '#fff', '#ffc400', '#d81778'][i % 4];
      dot.animate([{ transform: 'translate(0,0) rotate(0)', opacity: 1 }, { transform: `translate(${(Math.random()-.5)*85}vw, ${20 + Math.random()*55}vh) rotate(${Math.random()*720}deg)`, opacity: 0 }], { duration: 1000 + Math.random() * 800, easing: 'cubic-bezier(.14,.75,.36,1)' }).finished.then(() => dot.remove());
      document.body.appendChild(dot);
    }
  };
  const downloadCalendar = () => {
    const ics = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Wear Pink Wednesday//EN','BEGIN:VEVENT','UID:wear-pink-wednesday-20260722@invite','DTSTAMP:20260701T000000Z','DTSTART;VALUE=DATE:20260722','DTEND;VALUE=DATE:20260723','SUMMARY:Wear Pink Wednesday','DESCRIPTION:On Wednesdays we wear pink!','END:VEVENT','END:VCALENDAR'].join('\r\n');
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
    link.download = 'wear-pink-wednesday.ics';
    document.body.appendChild(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(link.href), 500);
  };
  yes.addEventListener('click', () => { if (hasAccepted) return; hasAccepted = true; burst(); success.hidden = false; yes.textContent = 'Pink outfit secured! ✨'; yes.disabled = true; downloadCalendar(); });
  const misbehave = (event) => {
    if (hasAccepted || no.dataset.cooldown) return;
    event.preventDefault(); attempts += 1; no.dataset.cooldown = 'true';
    const move = () => { no.style.position = 'fixed'; no.style.left = `${10 + Math.random() * 68}vw`; no.style.top = `${15 + Math.random() * 65}vh`; no.style.zIndex = '5'; no.style.transform = `rotate(${Math.random() * 16 - 8}deg)`; };
    const mode = Math.floor(Math.random() * 4);
    if (mode === 0) move();
    if (mode === 1) { no.style.transform = 'scale(.55) rotate(8deg)'; setTimeout(() => { no.style.transform = ''; }, 1800); }
    if (mode === 2) { no.style.opacity = '.05'; no.style.pointerEvents = 'none'; setTimeout(() => { no.style.opacity = '1'; no.style.pointerEvents = ''; move(); }, 2200); }
    if (mode === 3) { no.disabled = true; no.textContent = 'Nice try 😘'; setTimeout(() => { no.disabled = false; no.textContent = 'No Thank You'; move(); }, 2200); }
    if (attempts >= 2) hint.textContent = 'psst… just click the pink button 💗';
    setTimeout(() => { delete no.dataset.cooldown; }, 500);
  };
  no.addEventListener('mouseenter', misbehave); no.addEventListener('click', misbehave);
})();
