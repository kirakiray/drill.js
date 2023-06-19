# ts-drill

Make browsers support `.ts` files directly, without having to compile them in advance;

## Usage

Reference the ts-drill plugin after drill.js;

```html
<script src="https://cdn.jsdelivr.net/npm/drill.js/dist/drill.min.js"></script>
<!-- Formal environments use this version ⬇️ -->
<script src="https://cdn.jsdelivr.net/npm/drill.js/libs/typescript/dist/ts-drill.min.js"></script>
<!-- Development environment using ⬇️ dev version, will bring sourceMap more convenient debugging  -->
<!-- <script src="https://cdn.jsdelivr.net/npm/drill.js/libs/typescript/dist/ts-drill-dev.js"></script> -->

<!-- Followed by l-m tags using .ts files -->
<l-m src="./test.ts"></l-m>
```