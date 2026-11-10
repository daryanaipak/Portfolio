/* The five case books, carried over from the first site: content, page-turning reader, brochure viewer and video player. */
(() => {
const $ = id => document.getElementById(id);
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const RATIO = 1.36;
const ORN = '<svg class="orn" viewBox="0 0 120 20" aria-hidden="true"><path d="M2 10 H48 M72 10 H118" stroke="currentColor" stroke-width="1"/><path d="M60 3 L67 10 L60 17 L53 10 Z" fill="currentColor"/><circle cx="46" cy="10" r="2" fill="currentColor"/><circle cx="74" cy="10" r="2" fill="currentColor"/></svg>';
const ARROW_DOWN = '<svg viewBox="0 0 40 30" aria-hidden="true"><path d="M4 4 C 14 2, 26 8, 30 24"/><path d="M24 20 L30 25 L34 18"/></svg>';
const ARROW_LEFT = '<svg viewBox="0 0 40 30" aria-hidden="true"><path d="M36 6 C 26 4, 12 10, 6 20"/><path d="M5 12 L6 21 L14 19"/></svg>';
const ARROW_UP = '<svg viewBox="0 0 40 30" aria-hidden="true"><path d="M4 26 C 14 26, 26 20, 30 6"/><path d="M24 10 L30 5 L34 12"/></svg>';
const ch = t => `<h4 class="ch">${t}</h4>`;
/* Illustrated process flow: phases with a colored rail, numbered steps, key steps filled in ink */
const flow = (phases, start = 1) => { let n = start; return `<div class="flow">${phases.map(ph => `<div class="flow-phase" style="--pc:${ph.c}"><span class="flow-tag">${ph.t}</span><ol class="flow-steps">${ph.steps.map(st =>
  `<li class="flow-step${st.key ? ' key' : ''}"><span class="flow-num">${n++}</span><div class="flow-txt"><b>${st.t}</b><span>${st.d}</span></div></li>`).join('')}</ol></div>`).join('')}</div>`; };
/* Before/after bars and a ten-dot counter, drawn in the same ink */
const bars = (title, rows) => `<figure class="bars"><figcaption>${title}</figcaption>${rows.map(r => `<div class="bar-row"><span>${r[0]}</span><i style="--w:${r[2]}%;--bc:${r[3]}"></i><b>${r[1]}</b></div>`).join('')}</figure>`;
const dots = (on, label) => `<figure class="dots"><div>${Array.from({ length: 10 }, (_, i) => `<i class="${i < on ? 'on' : ''}"></i>`).join('')}</div><figcaption>${label}</figcaption></figure>`;
const note = (t, cls = '', arrow = '') => `<p class="cs-note ${cls}">${arrow}<span>${t}</span></p>`;
const bubble = t => `<div class="cs-bubble"><b>What I learned</b>${t}<i></i><i></i></div>`;
const plate = (src, alt, cap, mh) => `<figure class="plate"><img src="img/${src}" alt="${alt}" loading="lazy"${mh ? ` style="--mh:${mh}"` : ''}>${cap ? `<figcaption>${cap}</figcaption>` : ''}</figure>`;
const titleLeft = c => `<div class="title-page"><p class="tp-num">Case ${c.num}</p><h3 class="tp-title">${c.title}</h3>${ORN}<p class="tp-author">Darya Naipak</p></div>`;
const intro = (sub, res, imprint) => `<div class="title-page cs-intro"><p class="tp-sub">${sub}</p><p class="tp-result"><span>${res[0]}</span>${res[1]}</p><p class="tp-imprint">${imprint}</p></div>`;
/* Brochures flip page by page right on the book page; the image or the button opens them full screen */
const brochure = (id, alt, mh, cover, label) => { const b = BROCHURES[id], n = b.pages.length;
  return `<div class="brochure${n > 1 ? ' flip' : ''}" data-bro="${id}" data-i="0" style="--mh:${mh}">
    <div class="bro-stage">${n > 1 ? `<button type="button" class="bro-arrow prev" data-flip="-1" aria-label="Previous page of ${b.title}" disabled>‹</button>` : ''}<button type="button" class="bro-img" data-brochure="${id}" aria-label="Open ${b.title} full screen"><img src="${cover || b.pages[0]}" alt="${alt}" loading="lazy"></button>${n > 1 ? `<button type="button" class="bro-arrow next" data-flip="1" aria-label="Next page of ${b.title}">›</button>` : ''}</div>
    ${n > 1 ? `<span class="bro-count">1 / ${n}</span>` : ''}</div>`; };
const videoTile = (id, img, title, cls = '') => `<figure class="vtile ${cls}"><button type="button" class="shot play" data-video="${id}" aria-label="${VIDEOS[id] && (VIDEOS[id].src || VIDEOS[id].vimeo || VIDEOS[id].yt) ? 'Play' : 'View'}: ${title}"><img src="${img}" alt="" loading="lazy">${VIDEOS[id] && (VIDEOS[id].src || VIDEOS[id].vimeo || VIDEOS[id].yt) ? '<i class="play-badge" aria-hidden="true"></i>' : ''}</button><figcaption>${title}</figcaption></figure>`;
/* Videos play in a player inside the site. Add an MP4 file as src to play it here; yt links to YouTube until the file is added. */
const VOICES = [{"name": "Rita Nascimento", "role": "Senior Account Manager, Studyportals", "quote": "Darya’s strength is definitely her natural ability to connect with others. When managing relationships with external suppliers (such as me) her communication is consistent, timely, and thoughtful, allowing her to create trust and alignment quickly, even in fast-paced environments."}, {"name": "Mikhail Israelashvili", "role": "Masters alumnus ’23", "quote": "Working with Darya was always a pleasure. She was incredibly friendly, approachable and accommodating. Whenever she invited us to take part in video shoots or other projects, she explained everything clearly and made sure we felt comfortable and valued. It was clear that our contribution genuinely mattered and that we were helping create something meaningful for the school. She made us feel like an important part of the process :)"}, {"name": "Rick Rudolph", "role": "Founder, EDUNAKHO Group", "quote": "What stood out most was Darya’s ability to transform complex ideas into engaging, audience-centric content. She possesses a deep understanding of how to craft messages that resonate with different audiences, both in substance and in format, based on how content is consumed in today’s digital landscape. Under her guidance, we produced a series of impactful videos for Vlerick."}];
const VIDEOS = {
  onboarding: { title: '4 things you can do to get ready for Belgium', poster: 'img/onboarding-video.jpg', vimeo: '1241780913' },
  exchange: { title: 'Exchange Experience of a Masters Student in Belgium', poster: 'img/film-exchange.jpg', yt: 'KhlcX15UK9w' },
  mims: { title: 'Inside the Masters in International Management & Strategy', poster: 'img/film-mims.jpg', yt: 'jP9JKXyDhBE' },
  careers: { title: 'How Vlerick Career Services Gets You Career-Ready', poster: 'img/film-careers.jpg', yt: '8o_8WcM_YSI' },
  faculty: { title: 'Meet the Faculty: Learning at Vlerick, Ghent', poster: 'img/film-faculty.jpg', yt: '_5Dyjx4oQnc' },
  career: { title: 'Video post: career support', poster: 'img/post-career.jpg', vimeo: '1241785130' },
  degree: { title: 'Video post: you don’t need a business degree', poster: 'img/post-degree.jpg', vimeo: '1241785385' }
};
const openLink = (id, text) => `<button type="button" class="inline-open" data-brochure="${id}">${text}</button>`;

const BROCHURES = {
  boarding: { title: 'Personalized welcome letter: boarding pass', pages: ['brochures/boarding/p-1.jpg', 'brochures/boarding/p-2.jpg'] },
  checklist: { title: 'Moving to Belgium checklist', pages: ['brochures/checklist/p-1.jpg'] },
  stickers: { title: 'Welcome stickers', pages: ['brochures/stickers/p-1.jpg'] },
  guide: { title: 'The Vlerick Guide to Belgium', pages: ['brochures/guide/p-01.jpg', 'brochures/guide/p-02.jpg', 'brochures/guide/p-03.jpg', 'brochures/guide/p-04.jpg', 'brochures/guide/p-05.jpg', 'brochures/guide/p-06.jpg', 'brochures/guide/p-07.jpg', 'brochures/guide/p-08.jpg', 'brochures/guide/p-09.jpg', 'brochures/guide/p-10.jpg', 'brochures/guide/p-11.jpg', 'brochures/guide/p-12.jpg', 'brochures/guide/p-13.jpg', 'brochures/guide/p-14.jpg', 'brochures/guide/p-15.jpg', 'brochures/guide/p-16.jpg', 'brochures/guide/p-17.jpg', 'brochures/guide/p-18.jpg', 'brochures/guide/p-19.jpg', 'brochures/guide/p-20.jpg', 'brochures/guide/p-21.jpg', 'brochures/guide/p-22.jpg', 'brochures/guide/p-23.jpg', 'brochures/guide/p-24.jpg', 'brochures/guide/p-25.jpg', 'brochures/guide/p-26.jpg', 'brochures/guide/p-27.jpg', 'brochures/guide/p-28.jpg'] },
  mmdt: { title: 'Masters in Marketing & Digital Transformation (2022)', pages: ['brochures/mmdt/p-1.jpg', 'brochures/mmdt/p-2.jpg', 'brochures/mmdt/p-3.jpg', 'brochures/mmdt/p-4.jpg', 'brochures/mmdt/p-5.jpg', 'brochures/mmdt/p-6.jpg'] },
  mms: { title: 'Masters in Marketing Strategy (2025)', pages: ['brochures/mms/p-1.jpg', 'brochures/mms/p-2.jpg', 'brochures/mms/p-3.jpg', 'brochures/mms/p-4.jpg', 'brochures/mms/p-5.jpg', 'brochures/mms/p-6.jpg'] },
  tripLondon: { title: 'London, Covent Garden', pages: ['img/trip-london-full.jpg'] },
  tripBarcelona: { title: 'Barcelona, Sagrada Família', pages: ['img/trip-barcelona-full.jpg'] },
  linkedin: { title: 'LinkedIn · Masters in Business Analytics & AI in Amsterdam', pages: ['img/linkedin-ai-trip.jpg'] },
  tripKiss: { title: 'Barcelona, the kiss mural', pages: ['img/trip-kiss-full.jpg'] },
  flowMasters: { title: 'Masters · conversational ad flow', pages: ['img/flow-masters.jpg'] },
  flowMba: { title: 'MBA · conversational ad flow', pages: ['img/flow-mba.jpg'] },
  experience: { title: 'Experience Vlerick Business School', pages: ['brochures/experience/p-01.jpg', 'brochures/experience/p-02.jpg', 'brochures/experience/p-03.jpg', 'brochures/experience/p-04.jpg', 'brochures/experience/p-05.jpg', 'brochures/experience/p-06.jpg', 'brochures/experience/p-07.jpg', 'brochures/experience/p-08.jpg', 'brochures/experience/p-09.jpg', 'brochures/experience/p-10.jpg', 'brochures/experience/p-11.jpg', 'brochures/experience/p-12.jpg', 'brochures/experience/p-13.jpg', 'brochures/experience/p-14.jpg', 'brochures/experience/p-15.jpg', 'brochures/experience/p-16.jpg', 'brochures/experience/p-17.jpg', 'brochures/experience/p-18.jpg', 'brochures/experience/p-19.jpg', 'brochures/experience/p-20.jpg', 'brochures/experience/p-21.jpg', 'brochures/experience/p-22.jpg', 'brochures/experience/p-23.jpg', 'brochures/experience/p-24.jpg'] }
};

const CASES = [
  {
    num: 'I', title: 'Welcome Package', spine: 'Welcome Package', color: '#5b2328',
    blurb: 'Closing the admit-to-enroll gap with a pre-arrival journey', result: '+9.5% registrations',
    learned: 'Peer-generated, hyper-local content outperformed institutional messaging. Tips from current students built familiarity and trust before arrival.',
    pages: [
      intro('Designed to create an emotional connection with the school before day one.', ['+9.5%', 'registrations (tuition paid), 2025 intake compared with 2024'], 'Vlerick Business School, with Admissions, the International Office and Web'),
      `<div class="dense">${ch('The brief')}<p class="dc">A share of admitted candidates never converted to paid enrollment: <span class="u">the most expensive leak in the funnel</span>, because acquisition cost was already spent.</p>
       ${note('Already paid to win them. Losing them here hurts most.', 'r', ARROW_UP)}
       ${ch('The insight')}<p>After admission, decision risk peaks: cost, relocation and career return, often weighed against a competing offer. <b>Remove that friction before it turns into drop-off.</b></p>
       ${ch('My role')}<p>I mapped every moment between “admitted” and “day one”, gave each one its own touchpoint, and delivered it with Admissions, the International Office and Web.</p></div>`,
      `${ch('The journey to day one')}${flow([
        { t: 'Admitted', c: '#9c3a2d', steps: [{ t: 'The offer', d: 'Decision risk peaks: cost, relocation, career return.', key: 1 }] },
        { t: 'Before arrival', c: '#2c4677', steps: [
          { t: 'Welcome letter', d: `A boarding-pass ticket: you are already on your way.` },
          { t: 'Moving checklist', d: `Arrival steps and a moving guide. ${openLink('checklist', 'See it')}` },
          { t: 'Guide to Belgium', d: `Tips written by current students. ${openLink('guide', 'Read it')}` },
          { t: 'Merch & video', d: `Passport holder, luggage tag, stickers, onboarding video.` }] },
        { t: 'Day one', c: '#4f7a4a', steps: [{ t: 'Registration', d: 'Tuition paid: +9.5% on the year before.', key: 1 }] }])}`,
      `<figure class="cut"><img src="img/boarding-cut.webp" alt="Boarding-pass style welcome letter, front and back" loading="lazy" style="max-height:34cqw"></figure>
       ${note('A ticket, not a letter. You are already on your way.', 'r', ARROW_UP)}
       <div class="cut-pair"><figure class="cut"><img src="img/merch-cut.webp" alt="Cork passport holder and luggage tag with the Vlerick logo" loading="lazy" style="max-height:33cqw"></figure>
       <figure class="cut"><img src="img/stickers-cut.webp" alt="Welcome stickers: fries, waffle, highlighter and the Vlerick V" loading="lazy"></figure></div>
       <p class="cap">Boarding-pass welcome letter, cork passport holder, luggage tag and welcome stickers.</p>
       ${note('Fries, waffles and a highlighter. Belgian student life, in sticker form.', '', ARROW_UP)}`,
      `<div class="g-grid">
         <div class="g-bro">${brochure('guide', 'The Vlerick Guide to Belgium', '200cqw')}</div>
         <div class="g-note">${note('Tips from students who live here. That is what people actually read.', '', ARROW_UP)}</div>
         <div class="g-vid">${videoTile('onboarding', 'img/onboarding-video.jpg', 'Onboarding video: 4 things you can do to get ready for Belgium', 'wide')}</div>
         <p class="g-link">Live welcome site:<br><a href="https://www.vlerick.com/en/embark-on-your-vlerick-journey" target="_blank" rel="noopener">vlerick.com/en/embark-on-your-vlerick-journey</a></p>
       </div>`
    ]
  },
  {
    num: 'II', title: 'Content Overhaul', spine: 'Content Overhaul', color: '#2f4636',
    blurb: 'Collateral and landing pages rebuilt for short attention spans', result: '+28% time on landing pages',
    learned: 'Prioritize, then route. A brochure that hands off to the landing page extends reach across every channel instead of closing the conversation.',
    pages: [
      intro('Collateral and landing pages rebuilt for short attention spans.', ['+28%', 'average time on program landing pages, and +78% brochure downloads'], 'Vlerick Business School, across the Masters portfolio'),
      `<div class="dense">${ch('The brief')}<p class="dc">Legacy brochures and landing pages were <b>text-dense and inconsistent</b>, driving drop-off and repeat enquiries for information that was already published.</p>
       ${ch('My role')}<p>Led the end-to-end overhaul: information architecture, web copy, visual hierarchy and landing-page alignment across the Masters portfolio.</p>
       ${note('If people keep asking, the page is not doing its job.', 'r', ARROW_UP)}
       ${ch('The insight')}<p>Attention dropped from 2.5 min to 47 sec (Gloria Mark, UC Irvine). <b>Collateral should qualify interest fast and route prospects to the next step</b>, not say everything.</p>
       ${bars('Attention on one screen', [['2004', '2.5 min', 100, '#1d5fd8'], ['Today', '47 s', 31, '#e01e2b']])}
       ${note('47 seconds. Less time than it takes to read this page.', '', ARROW_UP)}</div>`,
      `${ch('How I rebuilt it')}${flow([
        { t: 'Diagnose', c: '#9c3a2d', steps: [{ t: 'Audit', d: 'Text-dense pages and repeat enquiries.', key: 1 }] },
        { t: 'Rebuild', c: '#2c4677', steps: [
          { t: 'Prioritize', d: 'Rankings and accreditations move up front.' },
          { t: 'Rewrite', d: 'Scannable “What can you expect?” blocks and a student quote.' },
          { t: 'Redesign', d: 'One visual hierarchy across the Masters portfolio.' }] },
        { t: 'Route', c: '#4f7a4a', steps: [
          { t: 'Hand off', d: 'Every brochure points to its program page.' },
          { t: 'Result', d: '+28% time on page, +78% downloads.', key: 1 }] }])}`,
      `<div class="ba"><div class="ba-col">${ch('Before')}${brochure('mmdt', 'Masters in Marketing & Digital Transformation brochure, before', '40cqw')}</div><div class="ba-col">${ch('After')}${brochure('mms', 'Masters in Marketing Strategy brochure, after', '40cqw')}</div></div>
       <div class="ba-notes"><ul class="hand-list minus"><li>Copy-heavy spreads, like a course catalog</li><li>Rankings and proof buried mid-page</li><li>No clear next step for the reader</li></ul>
       <ul class="hand-list plus"><li>Rankings and accreditations up front</li><li>Scannable “What can you expect?” blocks and a student quote</li><li>Routes the reader to the program page</li></ul></div>`,
      `${ch('Experience Vlerick')}<p><b>After the content overhaul, I noted a gap at portfolio level.</b> So I built a proposition piece that sells Masters-level USPs rather than individual programs, deployed at international fairs, in partner pitches and on the general Masters page.</p>
       ${brochure('experience', 'Experience Vlerick Business School brochure', '56cqw')}`
    ]
  },
  {
    num: 'III', title: "The Master's Campaign", spine: "The Master's Campaign", color: '#2c3650',
    blurb: 'Four-month video campaign with EDUNAKHO, from brief to final cut', result: '4 films · ~30 people',
    learned: 'Always have a plan B: an extra speaker, an alternative location. A speaker canceled at the last minute; because stand-by participants were already confirmed, the shoot ran to plan.',
    pages: [
      intro('A four-month, large-investment campaign to build audience and awareness for the Masters programs.', ['4 films', 'about 30 people coordinated'], 'Produced with EDUNAKHO, filmed in Ghent and Brussels'),
      `<p class="dc">I planned and delivered it from brief to final assets, and coordinated about 30 people: professors, students, a film crew and the production agency. Later, I built the new assets into our ongoing digital campaigns.</p>
       ${flow([{ t: 'Plan', c: '#9c3a2d', steps: [
          { t: 'Brief', d: 'What a Vlerick Masters is really like: real students, real outcomes.', key: 1 },
          { t: 'Storylines', d: 'Four films: exchange life, MIMS, career services, faculty.' },
          { t: 'Talking points', d: 'Interview guide per speaker, built to surface proof.' },
          { t: 'Casting', d: 'Professors, students and staff, plus confirmed stand-bys.' }] }], 1)}
       ${note('Most of the work happens before anyone presses record.', 'r', ARROW_UP)}`,
      `${flow([
        { t: 'Produce', c: '#2c4677', steps: [
          { t: 'Shoot plan', d: 'Two campuses, two days, timed slots per speaker.' },
          { t: 'Creative direction', d: 'Narration, filming and edit style; one tone of voice.' },
          { t: 'Production', d: 'Shot and edited with the EDUNAKHO team.' }] },
        { t: 'Publish', c: '#4f7a4a', steps: [{ t: 'Launch', d: 'Long-form films, teasers, short-form ads and Google Ads testimonials.', key: 1 }] }], 5)}
       <div class="numgrid tight"><div><strong>4 months</strong><span>Brief to final cut</span></div><div><strong>2 days</strong><span>Back-to-back filming, Ghent and Brussels</span></div><div><strong>~30 people</strong><span>Professors, students, crew and agency</span></div><div><strong>4 long formats</strong><span>Plus short-form videos and ad testimonials</span></div></div>`,
      `${ch('Behind the scenes')}<div class="anno">${plate('shoot-plan.jpg', 'The two-day shoot plan with run of show, cast, stand-bys and concept per film', '', '84cqw')}
        <p class="cs-note" style="left:1cqw;top:22cqw">${ARROW_UP}<span>Confirmed vs stand-by: a shortlist, not a hope</span></p>
        <p class="cs-note r" style="right:1cqw;top:56cqw;max-width:30cqw"><span>Ideas and benchmarks: what to borrow, what to skip</span></p></div>
       <p class="cap">The real two-day shoot plan: run of show, cast and stand-bys, and the concept per film. Contact details hidden.</p>`,
      `${ch('Four films from two filming days')}<div class="films">
        ${[['exchange', 'film-exchange', 'Exchange Experience of a Masters Student in Belgium', '3:21'], ['mims', 'film-mims', 'Inside the Masters in International Management &amp; Strategy', '3:32'], ['careers', 'film-careers', 'How Vlerick Career Services Gets You Career-Ready', '3:34'], ['faculty', 'film-faculty', 'Meet the Faculty: Learning at Vlerick, Ghent', '2:53']].map(f => `<figure><button type="button" class="shot play" data-video="${f[0]}" aria-label="Play: ${f[2]}"><img src="img/${f[1]}.jpg" alt="" loading="lazy">${VIDEOS[f[0]].src || VIDEOS[f[0]].vimeo || VIDEOS[f[0]].yt ? '<i class="play-badge" aria-hidden="true"></i>' : ''}<span class="dur">${f[3]}</span></button><figcaption>${f[2]}</figcaption></figure>`).join('')}
       </div><p class="cap">Tap a film to play it. Published on the Vlerick Business School channel.</p>`
    ]
  },
  {
    num: 'IV', title: 'Community-led Social', spine: 'Community-led Social', color: '#c4922f', ink: '#3b2510',
    blurb: 'Creator-led content that reached new international audiences', result: '1.5M views · 89%+ non-followers',
    pages: [
      intro('Creator-led content that reached new international audiences.', ['1.5M', 'views in three months, 89%+ from non-followers'], 'Vlerick Business School, school and student-ambassador accounts'),
      `<div class="dense">${ch('The brief')}<p class="dc"><b>Grow reach beyond the existing follower base</b> on the corporate and student-ambassador accounts, targeting new international prospect audiences.</p>
       ${ch('My role')}<p>Set the content strategy and ran the ambassador program, from coaching students to scheduling their posts, to reusing the UGC content as paid ads.</p>
       ${ch('The result · three months')}
       <div class="figs big4"><div><strong>1.5M</strong><span>Views</span></div><div><strong>89%+</strong><span>Of reach from non-followers</span></div><div><strong>370K+</strong><span>Unique viewers</span></div><div><strong>+24%</strong><span>Followers across both accounts</span></div></div>
       ${ch('What drove it')}<p><b>Prospects trust students more than brands.</b> With ambassadors and alumni in front of the camera, the content felt real and the algorithm carried it to new audiences, at no extra cost.</p></div>`,
      `${ch('How it worked')}${flow([
        { t: 'Set up', c: '#9c3a2d', steps: [{ t: 'Strategy', d: 'Reach new international prospects, not the people already following.', key: 1 }, { t: 'Brief & coach', d: 'Ambassadors learn what to film and why.' }] },
        { t: 'Create', c: '#2c4677', steps: [{ t: 'Students film & write', d: 'Their own day, their own voice. Their articles, edited by me, ran as native ads on study portals.' }, { t: 'Edit & schedule', d: 'I edit, approve and schedule every post.' }, { t: 'Pilot TikTok', d: 'Tested a new channel together with the students.' }] },
        { t: 'Reach', c: '#4f7a4a', steps: [{ t: '1.5M views', d: 'In three months, at no extra cost.', key: 1 }] }])}`,
      `<div class="dense">${ch('Work we’ve done')}<ul class="lst"><li>“Get to know our ambassadors” series</li><li>“Day in the life” for company projects and study tours</li><li>Student articles as native advertising</li></ul><p class="ex4-more">…and other engaging formats</p>
       <div class="ex4">
         <figure class="ex4-cell">${videoTile('career', 'img/post-career.jpg', 'Career support')}
           <p class="ex4-cap"><b>Watch ↗</b> <i>Career support</i></p>
           <p class="ex4-note"><svg viewBox="0 0 20 30" aria-hidden="true"><path d="M10 28 L10 4 M3 11 L10 3 L17 11"/></svg><span>A seamless blend of staff and students, presenting the programs in a less authoritative way.</span></p></figure>
         <figure class="ex4-cell">${videoTile('degree', 'img/post-degree.jpg', 'Who the Masters is for')}
           <p class="ex4-cap"><b>Watch ↗</b> <i>Who the Masters is for</i> <span class="me">← that’s me</span></p></figure>
         <figure class="ex4-cell"><button type="button" class="li-post ex4-shot" data-brochure="linkedin" aria-label="Open the LinkedIn post about the Amsterdam AI study trip"><img src="img/linkedin-ai-trip.jpg" alt="LinkedIn post: Masters in Business Analytics &amp; AI students in Amsterdam" loading="lazy"></button>
           <p class="ex4-cap"><i>LinkedIn · Amsterdam AI study trip</i></p>
           <p class="ex4-note"><svg viewBox="0 0 20 30" aria-hidden="true"><path d="M10 28 L10 4 M3 11 L10 3 L17 11"/></svg><span>Post made by students, reviewed by me and posted on the corporate account.</span></p></figure>
         <figure class="ex4-cell"><a class="ex4-art" href="https://studylink.com/articles/inside-vlericks-dublin-study-trip/" target="_blank" rel="noopener"><img src="img/dublin-trip.jpg" alt="Vlerick students on the Dublin study trip" loading="lazy"><span class="lc-site">studylink.com · student article</span><b>Inside Vlerick’s Dublin study trip</b><span class="lc-go">Read the article ↗</span></a>
           <p class="ex4-note"><svg viewBox="0 0 20 30" aria-hidden="true"><path d="M10 28 L10 4 M3 11 L10 3 L17 11"/></svg><span>Written by our students, edited by me, run as native advertising.</span></p></figure>
       </div></div>`,
      `<div class="anno" style="display:grid;justify-items:center">${plate('feed.jpg', 'The vlerick_masters Instagram feed', 'The real vlerick_masters feed.', '92cqw')}
        <p class="cs-note" style="left:1cqw;top:10cqw;max-width:24cqw"><span>Student-generated content, managed and curated by me</span></p></div>`
    ]
  },
  {
    num: 'V', title: 'Lead Nurturing', spine: 'Lead Nurturing', color: '#3e2f6e',
    blurb: 'Nurture flows and conversational ads rebuilt around social proof', result: '3.1× click rate',
    learned: 'Fewer, less commercial emails, spaced further apart and segmented by profile.',
    pages: [
      intro('Nurture flows and conversational ads rebuilt around social proof.', ['3.1×', 'click rate on the fair follow-up flow'], 'Vlerick Business School, Masters and MBA'),
      `${ch('The brief')}<p class="dc">Fair and brochure-download <b>leads received generic, unsegmented nurture</b>; several flows were triggered manually and read as hard-sell.</p>
       ${ch('The insight')}<p>In the consideration stage, prospects <b>need proof before a sales ask</b>. Social proof from participants does that better than institutional claims.</p>
       ${note('Proof first. The ask can wait.', 'r', ARROW_UP)}`,
      `${ch('What I did')}${flow([
        { t: 'Audit', c: '#9c3a2d', steps: [{ t: 'Every touchpoint', d: 'Open rate, CTR, unsubscribes and quality score.', key: 1 }] },
        { t: 'Build', c: '#2c4677', steps: [{ t: 'Rewrite', d: 'Copy that leads with proof, not the sales ask.' }, { t: 'Dynamic emails', d: 'Brochure emails that match what was downloaded.' }, { t: 'Testimonial email', d: 'Participants make the case.' }, { t: 'Conversational ads', d: 'Choose-your-path for Masters and MBA.' }] },
        { t: 'Iterate', c: '#4f7a4a', steps: [{ t: 'Three versions', d: 'Plus a stakeholder feedback round.', key: 1 }] }])}`,
      `<div class="dense"><p>Choose-your-path ads: every answer opens the next step, so prospects pick what they need instead of reading everything.</p>
       ${ch('MBA · conversational ad')}${brochure('flowMba', 'Flow chart of the MBA conversational ad', '24cqw', 'img/flow-mba.jpg', 'Enlarge the flow')}
       ${ch('Masters · conversational ad')}${brochure('flowMasters', 'Flow chart of the Masters conversational ad', '27cqw', 'img/flow-masters.jpg', 'Enlarge the flow')}
       <p class="remark">Still under development and implementation.</p>
       <p class="cap">From my flow decks. The feedback round added women's scholarships, student chat, campus visits for Belgian leads and post-graduation job routes for international leads.</p></div>`,
      `<div class="dense">${ch('The result')}<p>MBA portfolio fair follow-up flow, old version compared with today.</p>
       <div class="figs"><div><strong><s>1.19%</s>3.73%</strong><span>Click rate: 3.1× on the fair follow-up flow</span></div><div><strong><s>57%</s>60%</strong><span>Open rate: same flow, old version vs today</span></div><div><strong>10.9%</strong><span>First-email click rate, part-time MBA brochure email</span></div><div class="neg"><strong><s>0.60%</s>2.98%</strong><span>Unsubscribes: the trade-off, rose with send volume</span></div></div>
       <div style="max-width:100%">${note('The fix: three emails a week from different teams was too many. We cut the frequency and hold these leads back from other mailings until they reach a set stage. Unsubscribes are already falling.', '', ARROW_UP)}</div>
       <div style="max-width:74%">${bars('Click rate, fair follow-up flow', [['Old version', '1.19%', 32, '#e3a414'], ['Today', '3.73%', 100, '#6b2fc8']])}</div></div>`
    ]
  }
];

const Reader = (() => {
  const el = $('reader'), book = $('book'), L = $('slotL'), R = $('slotR'), closedView = $('closedView');
  let cur = null, ci = 0, idx = 0, single = false, busy = false, opener = null, list = [], closed = false;
  const SKIN = '<linearGradient id="hnSkin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f1d2b8"/><stop offset="0.55" stop-color="#e2b291"/><stop offset="1" stop-color="#c48f6d"/></linearGradient><linearGradient id="hnKnit" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#a97c2f"/><stop offset="0.5" stop-color="#d1a24c"/><stop offset="1" stop-color="#a0752b"/></linearGradient>';
  const HAND = '<svg class="hn-hand" viewBox="0 0 200 260" aria-hidden="true"><defs>' + SKIN + '</defs>'
    + '<g fill="url(#hnSkin)" stroke="#b07d5c" stroke-width="1.2">'
    + '<path d="M74 104 C 70 70, 72 30, 80 14 C 86 6, 96 10, 95 22 L 94 104 Z"/>'
    + '<path d="M95 104 C 94 66, 96 22, 104 8 C 110 0, 120 4, 118 18 L 116 104 Z"/>'
    + '<path d="M116 104 C 117 70, 120 30, 127 18 C 133 10, 142 15, 139 28 L 136 106 Z"/>'
    + '<path d="M136 106 C 138 80, 142 50, 148 40 C 153 33, 161 38, 158 50 L 152 110 Z"/></g>'
    + '<g fill="none" stroke="#b9876a" stroke-width="1.4" stroke-linecap="round" opacity="0.7"><path d="M78 84 q 8 -4 15 0"/><path d="M98 82 q 8 -4 16 0"/><path d="M119 84 q 8 -4 15 0"/><path d="M139 88 q 6 -3 12 0"/></g>'
    + '<path d="M66 104 C 70 98, 150 96, 156 108 C 160 130, 150 160, 142 182 L 70 184 C 64 160, 60 124, 66 104 Z" fill="url(#hnSkin)" stroke="#b07d5c" stroke-width="1.2"/>'
    + '<g fill="none" stroke="#f6dcc6" stroke-width="2.5" stroke-linecap="round" opacity="0.55"><path d="M86 112 q 4 26 6 52"/><path d="M106 110 q 2 28 2 56"/><path d="M126 112 q -1 26 -4 54"/></g>'
    + '<g fill="#f4d9c2" opacity="0.6"><ellipse cx="84" cy="106" rx="6" ry="3.5"/><ellipse cx="105" cy="104" rx="6" ry="3.5"/><ellipse cx="126" cy="106" rx="6" ry="3.5"/><ellipse cx="145" cy="110" rx="5" ry="3"/></g>'
    + '<path d="M58 178 L 150 178 L 170 260 L 34 260 Z" fill="url(#hnKnit)"/>'
    + '<path d="M56 176 L 152 176 L 156 204 L 52 204 Z" fill="#b8892f"/>'
    + '<g stroke="#8f6522" stroke-width="2" opacity="0.6">' + Array.from({ length: 16 }, (_, i) => `<path d="M${60 + i * 6} 178 L ${57 + i * 6.3} 203"/>`).join('') + '</g>'
    + '<g stroke="#e4bd6c" stroke-width="3" stroke-linecap="round" opacity="0.5"><path d="M60 222 l 18 -4"/><path d="M96 232 l 22 -3"/><path d="M128 244 l 18 -5"/><path d="M70 248 l 14 2"/></g></svg>'
    + '<svg class="hn-thumb" viewBox="0 0 200 260" aria-hidden="true"><defs>' + SKIN.replace(/hnSkin/g, 'hnSkin2').replace(/hnKnit/g, 'hnKnit2') + '</defs>'
    + '<ellipse cx="80" cy="66" rx="16" ry="34" fill="rgba(60,40,20,.16)" transform="rotate(14 80 66)"/>'
    + '<path d="M60 150 C 54 120, 58 80, 66 56 C 70 42, 86 38, 92 50 C 96 62, 90 92, 86 118 C 84 132, 80 146, 74 156 Z" fill="url(#hnSkin2)" stroke="#b07d5c" stroke-width="1.2"/>'
    + '<path d="M70 52 C 72 44, 84 42, 87 50 C 88 58, 84 64, 78 64 C 72 64, 69 58, 70 52 Z" fill="#f3d6cb" stroke="#c99a88" stroke-width="1"/>'
    + '<path d="M72 50 q 6 -3 12 0" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.7"/>'
    + '<path d="M68 96 q 8 2 14 -2" fill="none" stroke="#b9876a" stroke-width="1.4" stroke-linecap="round"/></svg>';
  function layout() {
    single = innerWidth < 760;
    const availW = single ? innerWidth - 32 : Math.min(innerWidth - 64, 1640);
    const availH = innerHeight - (single ? 214 : 236);
    let pw = single ? availW : availW / 2, ph = pw * RATIO;
    if (ph > availH) { ph = availH; pw = ph / RATIO; }
    el.style.setProperty('--pw', Math.floor(pw) + 'px');
    el.style.setProperty('--ph', Math.floor(ph) + 'px');
    book.classList.toggle('single', single);
  }
  function buildList() {
    list = [{ title: true }, ...cur.pages.map((h, i) => ({ h, n: i + 1 }))];
    if (!single && list.length % 2) list.push({ end: true });
  }
  function pageHTML(p, side) {
    if (!p) return '';
    if (p.end) return `<div class="page ${side}"></div>`;
    if (p.title) return `<div class="page ${side}"><div class="page-inner"><div class="page-body">${titleLeft(cur)}</div></div></div>`;
    const rh = p.n > 1 ? `<div class="rh">${side === 'left' && !single ? 'Darya Naipak' : `Case ${cur.num} · ${cur.title}`}</div>` : '';
    return `<div class="page ${side}"><div class="page-inner">${rh}<div class="page-body">${p.h}</div><div class="folio">${p.n} out of ${cur.pages.length}</div></div></div>`;
  }
  const spreads = () => single ? list.length : list.length / 2;
  function paint() {
    if (single) { R.innerHTML = pageHTML(list[idx], 'right'); L.innerHTML = ''; }
    else { L.innerHTML = pageHTML(list[2 * idx], 'left'); R.innerHTML = pageHTML(list[2 * idx + 1], 'right'); }
    status();
  }
  const handNote = document.createElement('div'); handNote.className = 'hand-note'; handNote.setAttribute('aria-live', 'polite'); el.appendChild(handNote);
  let handTimer = 0;
  function hideHand() { clearTimeout(handTimer); handTimer = 0; handNote.classList.remove('show', 'tucked'); }
  handNote.addEventListener('click', e => { e.stopPropagation(); handNote.classList.toggle('tucked'); });
  function syncHand() {
    const last = !closed && idx >= spreads() - 1;
    if (!cur.learned || !last) { hideHand(); return; }
    if (handNote.classList.contains('show') || handTimer) return;
    handNote.innerHTML = `<div class="hn-paper"><b>What I learned</b>${cur.learned}</div>${HAND}`;
    handTimer = setTimeout(() => { handTimer = 0; handNote.classList.remove('tucked'); handNote.classList.add('show');
      /* after a few seconds the hand tucks the note down so the page stays readable; tap it to raise it again */
      handTimer = setTimeout(() => { handTimer = 0; handNote.classList.add('tucked'); }, 6500); }, closed || reduceMotion ? 0 : 2500);
  }
  function status() {
    const total = cur.pages.length;
    let label;
    if (closed) label = 'Back cover';
    else {
      const ns = (single ? [list[idx]] : [list[2 * idx], list[2 * idx + 1]]).filter(p => p && p.n).map(p => p.n);
      label = !ns.length ? 'Title page' : ns.length === 2 ? `Pages ${ns[0]}–${ns[1]} of ${total}` : `Page ${ns[0]} of ${total}`;
    }
    $('pageCount').textContent = label;
    $('prevPage').disabled = !closed && idx === 0;
    $('nextPage').disabled = closed;
    const last = !closed && idx >= spreads() - 1;
    $('nextPage').innerHTML = last ? '<span class="lbl">Close the book </span>→' : '<span class="lbl">Next </span>→';
    $('nextPage').setAttribute('aria-label', last ? 'Close the book' : 'Next page');
    syncHand();
  }
  function leaf(dir, front, back) {
    const lf = document.createElement('div');
    lf.className = 'leaf ' + (dir > 0 ? 'fwd' : 'bwd');
    lf.innerHTML = `<div class="face front">${front}</div><div class="face back">${back}</div>`;
    book.appendChild(lf);
    return lf;
  }
  function animate(lf, done) {
    if (reduceMotion) { lf.remove(); done(); return; }
    let ended = false;
    const finish = () => { if (ended) return; ended = true; lf.remove(); done(); };
    lf.getBoundingClientRect();
    requestAnimationFrame(() => lf.classList.add('go'));
    lf.addEventListener('transitionend', e => { if (e.target === lf && e.propertyName === 'transform') finish(); });
    setTimeout(finish, 1300);
  }
  function backHTML() {
    const next = CASES[ci + 1];
    const nav = next
      ? `<p class="bk-next">Next on the shelf</p><p class="bk-title">${next.title}</p><button type="button" class="go" data-act="next">Open Case ${next.num}</button><button type="button" data-act="shelf">Back to the shelf</button>`
      : `<p class="bk-next">That's the last of the five</p><p class="bk-text">Put the book back. There is more to see in the study.</p><button type="button" class="go" data-act="store">Back to the room</button><button type="button" data-act="shelf">Back to the shelf</button>`;
    return `<div class="back-cover" style="--c:${cur.color};--gilt:${cur.ink || '#d3b36c'}"><span class="cv-num">Case ${cur.num} · ${cur.title}</span>${nav}</div>`;
  }
  function showClosed() {
    closed = true;
    book.hidden = true;
    closedView.innerHTML = backHTML();
    closedView.hidden = false;
    closedView.classList.remove('show');
    closedView.getBoundingClientRect();
    clearTimeout(showClosed.t);
    showClosed.t = setTimeout(() => { if (closed) closedView.classList.add('show'); }, reduceMotion ? 0 : 900);
    status();
    closedView.querySelector('button.go')?.focus();
  }
  function closeBook() {
    hideHand();
    busy = true;
    busy = false; showClosed();
  }
  function reopen() {
    closed = false;
    closedView.hidden = true; closedView.classList.remove('show');
    book.hidden = false;
    paint();
  }
  function turn(dir) {
    if (busy) return;
    if (closed) { if (dir < 0) reopen(); return; }
    const n = idx + dir;
    if (dir > 0 && n >= spreads()) { closeBook(); return; }
    if (n < 0) return;
    busy = true;
    if (single) {
      if (dir > 0) {
        const lf = leaf(1, pageHTML(list[idx], 'right'), '');
        idx = n; R.innerHTML = pageHTML(list[idx], 'right'); status();
        animate(lf, () => { busy = false; });
      } else {
        idx = n; paint();
        if (!reduceMotion) R.firstElementChild?.animate([{ opacity: 0, transform: 'translateX(-24px)' }, { opacity: 1, transform: 'none' }], { duration: 380, easing: 'ease-out' });
        busy = false;
      }
      return;
    }
    if (dir > 0) {
      const lf = leaf(1, pageHTML(list[2 * idx + 1], 'right'), pageHTML(list[2 * n], 'left'));
      R.innerHTML = pageHTML(list[2 * n + 1], 'right');
      idx = n; status();
      animate(lf, () => { L.innerHTML = pageHTML(list[2 * idx], 'left'); busy = false; });
    } else {
      const lf = leaf(-1, pageHTML(list[2 * idx], 'left'), pageHTML(list[2 * n + 1], 'right'));
      L.innerHTML = pageHTML(list[2 * n], 'left');
      idx = n; status();
      animate(lf, () => { R.innerHTML = pageHTML(list[2 * idx + 1], 'right'); busy = false; });
    }
  }
  function open(i, from) {
    hideHand();
    ci = i; cur = CASES[i]; idx = 0; opener = from || opener; closed = false;
    closedView.hidden = true; closedView.classList.remove('show'); book.hidden = false;
    layout(); buildList();
    $('readerTitle').textContent = `Case ${cur.num} · ${cur.title}`;
    el.hidden = false;
    document.documentElement.classList.add('reading');
    window.Shop && Shop.pause(true);
    paint();
    if (!reduceMotion) book.animate([{ opacity: 0, transform: 'scale(0.97)' }, { opacity: 1, transform: 'none' }], { duration: 350, easing: 'ease-out' });
    $('closeBook').focus();
  }
  function close(then) {
    hideHand();
    el.hidden = true;
    book.querySelectorAll('.leaf').forEach(l => l.remove());
    L.classList.remove('waiting'); busy = false;
    document.documentElement.classList.remove('reading');
    window.Shop && Shop.pause(false);
    if (then) then(); else opener && opener.focus({ preventScroll: true });
  }
  $('nextPage').addEventListener('click', () => turn(1));
  $('prevPage').addEventListener('click', () => turn(-1));
  $('closeBook').addEventListener('click', () => close());
  el.addEventListener('click', e => {
    const fl = e.target.closest('[data-flip]');
    if (fl) { const w = fl.closest('.brochure'), b = BROCHURES[w.dataset.bro], n = b.pages.length, i = Math.max(0, Math.min(n - 1, +w.dataset.i + +fl.dataset.flip));
      w.dataset.i = i; const img = w.querySelector('.bro-img img'); img.src = b.pages[i]; img.alt = `${b.title}, page ${i + 1}`;
      w.querySelector('.bro-count').textContent = `${i + 1} / ${n}`; w.querySelector('.prev').disabled = i === 0; w.querySelector('.next').disabled = i === n - 1; return; }
    const vd = e.target.closest('[data-video]');
    if (vd) { Player.open(vd.dataset.video, vd); return; }
    const br = e.target.closest('[data-brochure]');
    if (br) { const w = br.closest('.brochure'); Viewer.open(br.dataset.brochure, br, w ? +w.dataset.i : 0); return; }
    const b = e.target.closest('[data-act]');
    if (!b) return;
    if (b.dataset.act === 'next') close(() => open(ci + 1));
    if (b.dataset.act === 'shelf') close();
    
    /* back into the shop, just past the bookshelf, where the next part of the walk begins */
    if (b.dataset.act === 'store') close(() => window.__room && window.__room.back());
  });
  el.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') turn(1);
    else if (e.key === 'ArrowLeft') turn(-1);
    else if (e.key === 'Tab') {
      const f = [...el.querySelectorAll('button:not([disabled]), a[href]')].filter(x => x.offsetParent);
      if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });
  let sx = null;
  book.addEventListener('pointerdown', e => { sx = e.clientX; });
  book.addEventListener('pointerup', e => { if (sx === null) return; const dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 50) turn(dx < 0 ? 1 : -1); });
  addEventListener('resize', () => { if (!el.hidden && cur) { const was = single; const page = single ? list[idx] : list[2 * idx + 1] || list[2 * idx]; layout(); if (was !== single) { buildList(); const k = list.findIndex(p => p === page || (p.n && page && p.n === page.n)); idx = single ? Math.max(0, k) : Math.max(0, Math.floor(k / 2)); if (!closed) paint(); } } });
  return { open };
})();

/* ---------- Video player ---------- */
const Player = (() => {
  const el = $('player'), stage = $('playerStage'); let opener = null;
  function open(id, from) {
    const v = VIDEOS[id]; opener = from; $('playerTitle').textContent = v.title;
    const wait = extra => `<div class="player-wait"><img src="${v.poster}" alt=""><p>${extra}</p></div>`;
    if (v.src) stage.innerHTML = `<video controls autoplay playsinline poster="${v.poster}" src="${v.src}"></video>`;
    else if (v.vimeo || v.yt) {
      /* Try the video player inside the page; if the host blocks it, offer the video on Vimeo or YouTube instead */
      const site = v.vimeo ? 'Vimeo' : 'YouTube', link = v.vimeo ? `https://vimeo.com/${v.vimeo}` : `https://www.youtube.com/watch?v=${v.yt}`;
      const embed = v.vimeo ? `https://player.vimeo.com/video/${v.vimeo}?autoplay=1&title=0&byline=0&portrait=0` : `https://www.youtube-nocookie.com/embed/${v.yt}?autoplay=1&rel=0`;
      stage.innerHTML = `<div class="player-frame"><iframe src="${embed}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="${v.title}"></iframe></div><p class="player-alt"><a href="${link}" target="_blank" rel="noopener">Not playing? Watch it on ${site} ↗</a></p>`;
      const fallback = () => { if (!el.hidden && stage.querySelector('iframe')) stage.innerHTML = wait(`<a class="player-go" href="${link}" target="_blank" rel="noopener">▶ Watch the video on ${site} ↗</a>`); };
      const onBlock = e => { if (/vimeo|youtube/.test(e.blockedURI || '')) { fallback(); document.removeEventListener('securitypolicyviolation', onBlock); } };
      document.addEventListener('securitypolicyviolation', onBlock);
    }
    else stage.innerHTML = wait(`This video will play right here once its file is added to the site.${v.yt ? ` <a href="https://www.youtube.com/watch?v=${v.yt}" target="_blank" rel="noopener">Watch it on YouTube ↗</a>` : ''}`);
    el.hidden = false; $('playerClose').focus();
  }
  function close() { stage.querySelector('video')?.pause(); stage.innerHTML = ''; el.hidden = true; opener && opener.focus({ preventScroll: true }); }
  $('playerClose').addEventListener('click', close);
  el.addEventListener('keydown', e => { e.stopPropagation(); if (e.key === 'Escape') close(); });
  return { open };
})();

/* ---------- Brochure viewer ---------- */
const Viewer = (() => {
  const el = $('viewer'), strip = $('viewerStrip');
  let opener = null, n = 0;
  const current = () => Math.round(strip.scrollLeft / Math.max(1, strip.clientWidth));
  const count = () => { const i = current(); $('vCount').textContent = `Page ${i + 1} of ${n}`; $('vPrev').disabled = i === 0; $('vNext').disabled = i >= n - 1; };
  const go = d => strip.scrollTo({ left: (current() + d) * strip.clientWidth, behavior: reduceMotion ? 'auto' : 'smooth' });
  function open(id, from, start = 0) {
    const b = BROCHURES[id]; opener = from; n = b.pages.length;
    $('viewerTitle').textContent = b.title;
    strip.innerHTML = b.pages.map((p, i) => `<figure><img src="${p}" loading="lazy" alt="${b.title}, page ${i + 1}"></figure>`).join('');
    el.hidden = false; strip.scrollLeft = 0; count();
    el.classList.toggle('single', n === 1); $('viewerClose').textContent = /^(trip|linkedin)/.test(id) ? 'Close the photo' : 'Close the brochure';
    if (start) requestAnimationFrame(() => { strip.scrollLeft = start * strip.clientWidth; count(); });
    $('viewerClose').focus();
  }
  function close() { el.hidden = true; opener && opener.focus({ preventScroll: true }); }
  strip.addEventListener('scroll', () => requestAnimationFrame(count));
  $('vPrev').addEventListener('click', () => go(-1));
  $('vNext').addEventListener('click', () => go(1));
  $('viewerClose').addEventListener('click', close);
  el.addEventListener('keydown', e => {
    e.stopPropagation();
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  });
  return { open };
})();

window.Cases = { open: (i, from) => Reader.open(i, from), CASES };
})();
