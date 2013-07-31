## What is express-represent?

express-represent enables you to organize your expressjs web app or site into resources and specify representations of those resources (e.g. HTML, JSON, XML, TXT, CVS, etc.). The main idea is that views are representations of resources. You really have to try it to see what I mean.

## So what's so special about thinking in representations?
For one, you can request http://localhost:3000/about/ and you'll get HTML, then make an AJAX request to http://localhost:3000/login.phtml and get the partial HTML representation to display a login panel. And that's just the beginning. You can POST that login form to http://localhost:3000/login.json via an AJAX request and get a JSON representation from the same resource. I think it's refreshing and ultimately, that's what this is all about, my preference organizing code for web apps.

## MIT License
Copyright (c) Joey Guerra

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.