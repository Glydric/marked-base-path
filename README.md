# marked-base-path

Prefix relative url with base url.

# Usage

```js
import { marked } from "marked";
import { baseUrl } from "marked-base-path";

//or 
//
// const basePath = require("marked-base-path")

marked.use(basePath("/your/absolute/path"));

marked.parse("[my url](./relative/path)");
```
