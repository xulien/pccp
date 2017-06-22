# PCCP

Crop and adjust image colors into a browser

![alt text](./screenshot_editor.jpg "Screenshot demo_editor")
![alt text](./screenshot_result.jpg "Screenshot demo_result")

Clone this repo and open demo.html for a try

## API

#### Usage

```js

<script type="text/javascript">
  document.addEventListener("DOMContentLoaded", () => pccp.init({
    output: [
      {
        w:480,
        h:240,
        t: 'large'
      },
      {
        w:300,
        h:150,
        t: 'medium'
      },
      {
        w:150,
        h: 75,
        t: 'small'
      }
    ]
  }));
</script>

```
