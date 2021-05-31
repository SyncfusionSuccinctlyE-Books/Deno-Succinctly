---
title: My First Post
description: My reasons for starting a blog.
author: Mark Lewin
date: 2020-12-01
---
### Introduction

![Tired kitty pic](../public/assets/images/tired_kitty.jpg)

This is some **really awesome content**.

Here is some Deno code:

```javascript
import { readCSVObjects } from "https://deno.land/x/csv/mod.ts";

const f = await Deno.open("./movies.csv");

for await (const obj of readCSVObjects(f)) {
  console.log(obj);
}

f.close();
```

And here are some things to consider....

* Deno is awesome
* And just keeps getting better