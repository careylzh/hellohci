# Tangible User Interfaces: An HCI Ancestry

A dependency-free static timeline for GitHub Pages.

## Source Of Truth

Edit this folder in `phdlitreviews` first:

```text
phdlitreviews/synthesis/hci-history/
```

Use the `careylzh/hellohci` repository as the public GitHub Pages publish target only.
Do not make content edits directly in `hellohci` unless you also copy them back here,
otherwise the next publish from this folder can overwrite them.

For research materials, PDFs, and Markdown synthesis notes, keep working in
`phdlitreviews/synthesis/`. Update this static site from those notes when you
want the public timeline to change.

## Preview

```bash
python3 -m http.server 8000 --directory hci-history
```

Then open <http://localhost:8000/>.

## Deploy

The public URL is <https://careylzh.github.io/hellohci/>.

Publish the current contents of this folder to the `careylzh/hellohci` repository:

```bash
./hci-history/scripts/publish.sh
```

Optional commit message:

```bash
./hci-history/scripts/publish.sh "Update timeline sources"
```

The script clones `careylzh/hellohci` into a temporary directory, mirrors this
folder into the repository root, commits if there are changes, and pushes to
`main`. GitHub Pages is configured to publish from `main` at `/`.
