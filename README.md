math-editor
============

[DEMO](http://scaljeri.github.io/math-editor)

https://www.polymer-project.org/docs/start/reusableelements.html

Build new gh-pages: "../tools/bin/gp.sh <username> test-element"

Bookmarks:
   * [MathQuill](http://mathquill.com/)
   * [MathJax](http://www.mathjax.org/)
   * [Community filters](https://github.com/addyosmani/polymer-filters)
   
   Build: ../tools/bin/gp.sh scaljeri math-editor
   
 
 Install paper elements:
 
     $> bower install Polymer/paper-elements
     <link rel="import" href="components/paper-elements/paper-elements.html">
     
e.target.templateInstance.model.s;


See the [component page](http://polymerlabs.github.io/math-editor) for more information.

## Getting Started

We've put together a [guide to math-editor](http://www.polymer-project.org/docs/start/reusableelements.html) to help get you rolling.

## Testing Your Element

Add the logic specific to your new element and verify its functionality. Good unit tests are essential to your verification plan but a good way to quickly sanity test your component is to access your demo.html file via a local web server. There are several ways to do this but one easy method is to run a simple web server that ships with Python, using the commands:

```sh
python -m SimpleHTTPServer
```

Or other method using NodeJS:

```sh
http-server ./
```

This starts a web server on port 8000, so you can test your new element by navigating a browser to `localhost:8000/test/index.html`.

### web-component-tester

The tests are also compatible with [web-component-tester](https://github.com/Polymer/web-component-tester). You can run them on multiple local browsers via:

```sh
npm install -g web-component-tester
wct
```
