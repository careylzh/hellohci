Execute skill-4, skill-2 for this task whenever necessary. commit and push for each task when done.
## `hci-history`
* [x] revamp `hci-history` to emulate design in https://natalieagus.github.io/50002/. retain the current page as the homepage. consolidate all the .md files in this directory and display each md as a separate page. The names of each page should be a written version of the file names, without `.md` and `-` delineations. Done: `python3 -m http.server 8000 --directory hci-history`, `curl -I`, and Playwright smoke test passed.
    * [x] add toggle button to raw markdown and the current font. Done: Playwright verified rendered Markdown and raw Markdown toggle.
* [x] Add a toggle dark theme: use consolas on a dark background (background color same as the color theme Nord in vs.code). Done: `styles.css` uses Consolas on Nord `#2e3440`.
* [x] apply the Nord color theme in vscode to the site. Done: site chrome, document pages, and timeline SVG palette use Nord dark colors.

Deploy to the github pages in `https://careylzh.github.io/hellohci/` when done.
