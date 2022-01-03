# Re4ma - magic in-browser HTML-page generator

## Implements very simple but powerful module system for HTML documents building

### Import types:

* HTML (*.html, *.htm): modules, chunks, templates whith a data placeholders and `<slot>` based composition support
* Markdown (*.md)
* Code snippets with a syntax highlight
* JavaScript (as imported module dependency)
* CSS (external files connection + inline)
* Images and image processing
* Custom contents import and processing
* JSON-data applied to HTML template
* etc...

### Symbiote.js friendly
Use Symbiote-components for any dynamic page content.
> https://symbiotejs.org/

## Usage:

### Connect re4ma script from CDN:
```html
<script
  src="https://unpkg.com/@re4ma/re4ma@latest/build/re4ma.js">
</script>
```

### NPM installation:

`npm i @re4ma/re4ma`

### Then you can use these simple HTML-tags:

```html
<!-- Import any external HTML chunk or component: -->
<re-htm src="htm/page.htm"><re-htm>

<!-- Import and render Markdown: -->
<re-md src="md/article.md"><re-md>

<!-- Import and render code snippet: -->
<re-code src="js/snippet.js"><re-code>

<!-- Import Javascript on demand: -->
<re-js src="js/app.js"><re-js>

<!-- Import styles: -->
<re-css src="css/styles.css"><re-css>

<!-- Import with custom source handler: -->
<re-load
  loader="scripts/txt-loader.js"
  src="some_content.txt">
<re-load>

<!-- Image: -->
<re-img 
  loader="scripts/my-loader.js"
  src="img/picture.jpg">
<re-img>

<!-- Rendering from external data endpoint: -->
<re-peat 
  template-src="htm/user-card-template.htm"
  data-src="data/users.json">
<re-peat>
```

### HTML-file extension convention: 

Use *.html file names for HTML-pages and *.htm for chunks and modules

### Named Slots:

```html
<re-htm src="html/page.htm">
  <div slot="content"></div>
<re-htm>
```
In HTML Chunk:
```html
<div>
  <slot name="content"></slot>
</div>
```
### Placeholders for arttribute values:

Set custom HTML attributes:
```html
<re-htm src="html/page.htm" --text="My Text"><re-htm>
```
Then use values in template:
```html
<div>{{text}}</div>
```
## Build stage helper attributes
Clear element content (remove children):
```html
<my-component re-clear><my-component>
```

Remove cetrain element after render:
```html
<my-component re-move><my-component>
```

