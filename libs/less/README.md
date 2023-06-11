# less-drill

Make browsers support `.less` files directly, without having to compile them in advance;

## Usage

Reference the less-drill plugin after drill.js;

```html
<script src="https://cdn.jsdelivr.net/npm/drill.js/dist/drill.min.js"></script>
<!-- Formal environments use this version ⬇️ -->
<script src="https://cdn.jsdelivr.net/npm/drill.js/libs/less/dist/less-drill.js"></script>
<!-- Development environment using ⬇️ dev version, will bring sourceMap more convenient debugging  -->
<!-- <script src="https://cdn.jsdelivr.net/npm/drill.js/libs/less/dist/less-drill-dev.js"></script> -->

<!-- Followed by l-m tags using .less files -->
<l-m src="./test.less"></l-m>
```