# Bookmarklets
Live version - https://github.com/hariprasd/cool-bookmarklets

<br>
<details><summary>What is a Bookmarklet?</summary>
  <br>
A bookmarklet is a bookmark stored in a web browser that contains JavaScript commands that add new features to the browser. They are stored as the URL of a bookmark in a web browser or as a hyperlink on a web page. Bookmarklets are usually small snippets of JavaScript executed when user clicks on them - Wikipedia 
</details>

<details><summary>Procedure to Save a Bookmarklet</summary>
 <br>
1. Copy the code snippet and Goto the Bookmark section of your browser<br>
2. Create a bookmark with this code as the URL (you should have known how to do it :)<br>
3. Give whatever the name you want & Save it <br>
4. Booom Done, That's All folks 🦾<br>
5. Click and check the functionality of the code, It should work 100% <br>
</details>

<details><summary>Want to collaborate in this Repo?</summary>
 <br>
1. Fork and commit in your repo <br>
2. Changes will be reviewed and accepted based on the effectiveness of the content 
</details>
<br>


## List of Bookmarklets 👇

### 1. EasyTimer⌚
This works with any browser with Javascript support, Like Chrome, Firefox, Edge, Brave etc...

#### Code Snippet :
```
javascript: const input = prompt("Enter minutes: ");url="https://www.google.com/search?q=set+timer+for+%22+%20input%20+%22+minutes%22;window.open(url,%20%27_blank%27).focus();
```
>Thank Google for Timer component & Thank me for making the process easier <br>

[**Procedure**](https://github.com/hariprasd/cool-bookmarklets#bookmarklets) 👈<br>
Still having doubts - [Contact Me](https://wa.me/919345160259/)

<hr style="border:2px solid gray"> </hr>
<br>

### 2. Turn Off Personalised Web Search results 
Sometimes these Personalisations goes out of hand and shows unwanted Highlights in the webpages,That might be annoying for some guys like me, This Feature turns off the PWS feature in a single click

#### Code Snippet :
```
javascript:(function(){window.location=document.URL+'?pws=0%27%20})()
```
[**Procedure**](https://github.com/hariprasd/cool-bookmarklets#bookmarklets) 👈<br>
Still having doubts - [Contact Me](https://wa.me/919345160259/)

<hr style="border:2px solid gray"> </hr>
<br>

### 3. Colour Picker by Google 🌈
You know? Google has a colour picking tool which can be used to get colour codes in many formats by eyedropping, Access this feature in a single click

#### Code Snippet :
```
javascript:(function(){window.location='https://www.google.com/search?q=color+picker'})()
```

>Thank Google for Color Picking Feature & Thank me for making the process easier <br>

[**Procedure**](https://github.com/hariprasd/cool-bookmarklets#bookmarklets) 👈<br>
Still having doubts - [Contact Me](https://wa.me/919345160259/)

<hr style="border:2px solid gray"> </hr>
<br>

### 4. Calculator by Google ➗
This is a great feature made by Google, we can use scientific / general calculator on web without getting into any sites, Access this feature in a single click

#### Code Snippet :
```
javascript:(function(){window.location='https://www.google.com/search?q=calculator'})()
```

>Thank Google for Calculator Component & Thank me for making the process easier <br>

[**Procedure**](https://github.com/hariprasd/cool-bookmarklets#bookmarklets) 👈<br>
Still having doubts - [Contact Me](https://wa.me/919345160259/)

<hr style="border:2px solid gray"> </hr>
<br>

### 5. Unit Conventor by Google ※
This is also a great feature made by Google, we can convert Currencies, Weight, Length in other units on web without getting into any sites, Access this feature in a single click

#### Code Snippet :
```
javascript:(function(){window.location='https://www.google.com/search?q=Unit%20converter'})()
```

>Thank Google for Unit Convertor Component & Thank me for making the process easier <br>

[**Procedure**](https://github.com/hariprasd/cool-bookmarklets#bookmarklets) 👈<br>
Still having doubts - [Contact Me](https://wa.me/919345160259/)

<hr style="border:2px solid gray"> </hr>
<br>

### 6. Text Anchors ⚓ 
A hidden feature used by Search Engine to highlight & direct the users to a specific part of the Page which is related to their query, While using this feature, You should be at the webpage & the text to be anchored should be copied before clicking it <br>
This will be useful when you need to hyperlink an exact part of the website to your friend, After clicking the bookmarklet, you can copy & share the new link to friend, It will highlight the text in the page which was provided by you
#### Code Snippet :
```
javascript:const input = prompt("Enter the text to be anchored (maximum 10 words):  ");(function(){window.location=document.URL+'#:~:text='+input})()
```

[**Procedure**](https://github.com/hariprasd/cool-bookmarklets#bookmarklets) 👈<br>
Still having doubts - [Contact Me](https://wa.me/919345160259/)

<hr style="border:2px solid gray"> </hr>
<br>

### 7. Enable Right Click 😉
Some websites may block you from Right Click & using Context Menu aka Right click menu, But we can enable it again by using this simple Bookmarklet
#### Code Snippet :
```
javascript:(function(){var d=document;d.onmousedown=null;d.onmouseup=null;d.oncontextmenu=null})()
```

[**Procedure**](https://github.com/hariprasd/cool-bookmarklets#bookmarklets) 👈<br>
Still having doubts - [Contact Me](https://wa.me/919345160259/)

<hr style="border:2px solid gray"> </hr>
<br>

### 8. Birthday Moon Phase 🌒
If you are eager to see how the Moon looked when you were born, Check this out. You can use both of them, Second one has moon images of any date<br>
Credits: [Lunaf](https://lunaf.com/lunar-calendar/) & [MoonPhase](https://phasesmoon.com/)
#### Code Snippet :
```
javascript:const input = prompt("Enter date(YYYY/MM/DD only works):  ");(function(){window.location='https://lunaf.com/lunar-calendar/'+input})()
```
```
javascript:const input = prompt("Enter date(eg: 3March1978) without spaces:  ");(function(){window.location='https://phasesmoon.com/moonday'+input+'.html'})()
```

[**Procedure**](https://github.com/hariprasd/cool-bookmarklets#bookmarklets) 👈<br>
Still having doubts - [Contact Me](https://wa.me/919345160259/)

<hr style="border:2px solid gray"> </hr>
<br>

### 9. Google Search Handy Shortcuts⚡
Web Surfing can sometime be frustating if we want to click & navigate through many Tabs, Here are some handy shortcuts to directly get what we want
#### Code Snippet to Search Images:
```
javascript:const input = prompt("Enter the Query : ");window.location='https://www.google.com/search?q='+input+'&tbm=isch'
```
#### Code Snippet Search Images with Creative Commons Licence:
```
javascript:const input = prompt("Enter the Query : ");window.location='https://www.google.com/search?q='+input+'&tbm=isch&tbs=il:cl'
```
#### Code Snippet to Search Transparent Images:
```
javascript:const input = prompt("Enter the Query : ");window.location='https://www.google.com/search?q='+input+'tbm=isch&tbs=ic:trans'
```
#### Code Snippet for Direct Video Search:
```
javascript:const input = prompt("Enter the Query : ");window.location='https://www.google.com/search?q='+input+'tbm=vid'
```

[**Procedure**](https://github.com/hariprasd/cool-bookmarklets#bookmarklets) 👈<br>
Still having doubts - [Contact Me](https://wa.me/919345160259/)

<hr style="border:2px solid gray"> </hr>
<br>

### 10. Developers' Search (YouCode)⚡

#### Code Snippet for Direct Getting results tailored for a Dev, like Code snippets, Tutorials, Articles etc.. :
```
javascript: const input = prompt("Enter Query: ");url="https://you.com/search?q=%22+input;window.open(url,%20%27_blank%27).focus();
```

[**Procedure**](https://github.com/hariprasd/cool-bookmarklets#bookmarklets) 👈<br>
Still having doubts - [Contact Me](https://wa.me/919345160259/)

<hr style="border:2px solid gray"> </hr>
<br>

### 11. Tech Stack Lookup (builtwith) ⚡

#### Code Snippet for Looking up the tech Stack for any website :
```
javascript:url="https://builtwith.com/?%22+document.URL;window.open(url,%20%27_blank%27).focus();
```

[**Procedure**](https://github.com/hariprasd/cool-bookmarklets#bookmarklets) 👈<br>
Still having doubts - [Contact Me](https://wa.me/919345160259/)

<hr style="border:2px solid gray"> </hr>
<br>

### 12. HTML Preview by [Github](https://htmlpreview.github.io/)⚡
Note: You have to upload HTML files to github and currently at the page where HTML file is located.

#### Code Snippet for previewing HTML pages directly from Github :
```
javascript:url="https://htmlpreview.github.io/?%22+document.URL;window.open(url,%20%27_blank%27).focus();
```

[**Procedure**](https://github.com/hariprasd/cool-bookmarklets#bookmarklets) 👈<br>
Still having doubts - [Contact Me](https://wa.me/919345160259/)

<hr style="border:2px solid gray"> </hr>
<br>

### 13. Download all images from any site in a single click

#### Code Snippet:
```
javascript:;(function() {var images = [].slice.call(document.querySelectorAll('img'));try {images.forEach(function(img){downloadImage(img)})} catch (e) {alert('Download failed.');console.log('Download failed.', e)}function downloadImage(img) {var link = document.createElement('a');link.setAttribute('href', img.src);link.setAttribute('download', '');link.click()}}).call(window);
```

[**Procedure**](https://github.com/hariprasd/cool-bookmarklets#bookmarklets) 👈<br>
Still having doubts - [Contact Me](https://wa.me/919345160259/)

<hr style="border:2px solid gray"> </hr>
<br>


### 14. Share current Tab's URL to Whatsapp⚡

#### Code Snippet :
```
javascript:url="https://wa.me/?text=%22+document.URL;window.open(url,%20%27_blank%27).focus();
```

[**Procedure**](https://github.com/hariprasd/cool-bookmarklets#bookmarklets) 👈<br>
Still having doubts - [Contact Me](https://wa.me/919345160259/)

<hr style="border:2px solid gray"> </hr>
<br>
