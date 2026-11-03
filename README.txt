Y Portfolio Favicon Pack

Copy files into your website project:
  favicon.svg           -> project root
  favicon.ico           -> project root
  img/favicon-32x32.png -> img/
  img/apple-touch-icon.png -> img/

In the <head> of index.html, use these links:
<link rel="icon" type="image/svg+xml" href="/favicon.svg?v=y2">
<link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32x32.png?v=y2">
<link rel="shortcut icon" href="/favicon.ico?v=y2">
<link rel="apple-touch-icon" href="/img/apple-touch-icon.png?v=y2">

After copying, open http://localhost:3000/favicon.svg?v=y2 and verify the Y logo appears.
Refresh your portfolio tab (Ctrl + Shift + R), or open it in a new tab.
If the favicon still reads h, verify the browser Network tab and favicon href paths.
