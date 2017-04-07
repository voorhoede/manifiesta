# Concept

Configure and preview your Progressive Web App Manifest.


## Configure (input)

Possible ways to configure the manifest:

### Site URL + manifest JSON

Textarea to enter manifest contents in JSON format. To show a preview of the app and as a base URL for `icons` and `start_url` we also need a site URL.
We can use a simple `input[type="url"]` for that.

### Drop manifest file

Instead of copy-pasting or typing the manifest contents, you can drag-and-drop a manifest file straight into Manifiesta.

### Site URL only

Based on the URL we fetch its web page. We find the linked manifest (`link[rel="manifest"]`) on that page.
We fetch that manifest file and use it as input, together with the site URL.

### Form controls

### All-in-1

We could implement all options above and have to user pick the best suited option.


## Preview (output)

Emulate appearance of the app on different screens: install prompt in browser, app added to homescreen, splash screen on start-up and app screen once opened from home.
[Nexus 5X, more later]

### Install screen

[In browser, URL bar, install prompt, show on scroll or other interaction?]

### Home screen

[Icon, other apps?, background cover?]

### Splash screen

[icon, name, background color]

### App screen

[Fullscreen / standalone, test device rotation, theme color, start_url]

### All-in-1

[transitions between screens, interactions]


## Extras

* Add message when content fails to load in iframe. May be undetectable, so could add text behind iframe after x seconds.
* Support `meta[name="theme_color"]`.
* Support Android "back", "home" and "options" buttons in bottom bar.
* Support "show tabs" button in browser to show tab in overview with theme color.
* Use live clock in top bar.
* Animate wifi and network icons.
* Add other devices and browsers (e.g. Samsung Internet on Galaxy VI).
* Add zoom (`scale`) support.
* Add persistent form support using Local Storage.
* Add favicons and other device icons.
* Add offline support using Service Worker.
* Add manifest to enable add to homescreen (prompt).