# AI for Every Learner

Group 8's static, eight-chapter Terminal Assessment website about unequal access to AI-supported education. Open `index.html`, serve this folder with a static web server, or publish the repository through GitHub Pages. No build step is required.

## Neon Circuit experience

- Neon cyan/violet technology theme with angular panels, glowing circuits, moving signal trails, a floating learning network, scroll reveals, and chapter progress.
- Scroll-triggered number count-ups and bar fills share a 1.4-second eased animation, with a short stagger and subtle completion glow. Revisit a chapter or select another solution/comparison to replay. Motion off shows exact final values immediately; turning it back on re-arms the current chapter.
- Responsive hero spacing keeps metadata labels intact, balances the title with the learning network, and places bottom navigation after the content.
- Chapter URLs (`#problem`, `#solutions`, `#signal-check`, etc.) support reload, browser Back/Forward, and direct links.
- Short synthesized digital cues for chapter changes, solution/story/compare selections, and quiz feedback. No sound plays on initial load. **Sound on/off** saves the visitor's preference.
- **Motion on/off** controls transitions and interface animation. Device reduced-motion preferences override animation settings.
- Educational videos from Code.org and UNESCO load only when selected, one at a time. Changing chapters or choosing Close video unloads the player and stops playback.
- Videos include direct publisher links, requested captions, and written key ideas for slow connections or unavailable embeds. Actual playback requires internet access and depends on YouTube availability.
- Original research content, scoring, map, solution explorer, comparisons, and quiz are preserved. Video resources are listed separately from the group's research references.

## Added files

- `assets/learning-lab.css`: visual refinements and responsive layouts.
- `assets/learning-lab.js`: sound, motion, video controls, and progress.

The original embedded map libraries and remote images remain in `index.html`. Maps, remote photos, Google Fonts, and video playback require network access; existing text/map fallback remains available if the map cannot load. No new library dependencies were added. Personal quiz answers are not stored; only sound and motion preferences are saved locally when storage is available.

## Video provenance

- Code.org: [What is Machine Learning?](https://www.youtube.com/watch?v=KHbwOetbmbs)
- UNESCO: [Teacher to Teacher: Is AI reshaping education for the better?](https://www.unesco.org/en/digital-education/artificial-intelligence) — official embedded video ID `EEbGYRW7feM`.

Videos are embedded from their publishers through YouTube's privacy-enhanced domain; no third-party video is downloaded or redistributed. The written key ideas are brief supplementary reading, not verbatim transcripts or a substitute for the project's cited evidence.
