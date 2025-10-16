---
title: markdown에서 iframe을 해석하려면 - remark-rehype, remark.
category: null
---


# markdown에서 iframe을 해석하려면 - remark-rehype, remark.

먼저 이 글은 블로그에 사용되는 markdown 문법의 파일들에 iframe을 박아넣기 위한 노력의 일환임을 밝힙니다.

---

https://github.com/remarkjs/remark-rehype

> This package is a `unified` plugin that switches from `remark` to `rehype`, from the markdown ecosystem to HTML ecosystem.

> 'unified' is a project that transforms content with abstract syntax trees (ASTs). remark adds support for markdown to unified. rehype adds support for HTML to unified.
> `mdast` (md+ast) is the markdown AST that remark uses. `hast` is the markdown AST that rehype uses. This is a remark plugin that transforms mdast into hast to support rehype.

그래, readme는 이렇게 써야한다. 적당히 추상적으로, 적당히 자세하게..

- When should I use this?

This project is useful when you to turn markdown to HTML. It opens up a whole new ecosystem with tons of plugins to do all kinds of things.

You can minify HTML, format HTML, make sure it's safe, highlight code, add metadata, and a lot more.

a different plugin, `rehype-raw`, adds support for raw HTML written inside markdown.

예를 들어 iframe 등을 그냥 마크다운에 작성해버렸다, 혹은 img 태그를 그냥 사용해버렸다고 해도 markdown => HTML이 아니라 markdown에 작성된 HTML => HTML로 해석이 가능하게 된다는 것.

This is a separate plugin because supporting HTML inside markdown is a heavy task and not always needed. To use both together, you also have to configure `remark-rehype` with `allowDangerousHtml: true`.  🍵🍵🍵

The rehype plugin `rehype-remark` does the inverse of this plugin. It turns HTML into markdown.

위의 🍵🍵🍵 부분을 읽고는 rehype-raw 로 넘어갔다.

https://github.com/rehypejs/rehype-raw

- What it is?

This package is a unified plugin to parse a document 'again'. 무슨말이야?

To understand how it works, requires knowledge of ASTs, (specifically hast).

This plugin passes each node and embedded raw HTML through an HTML parser, to recreate a tree exactly as how a browser would parse it, while keeping the original data and positional info intact.

This is a rehype plugin that parses the tree 'again'.

- When should I use this? (도구를 알아보는 입장에서는 이걸 항상 이야기해주는게 좋다고 느껴지네)

This plugin is 'particulary' useful when coming from markdown and wanting to support HTML embedded inside that markdown (which requires passing `allowDangerousHTML: true` to `remark-rehype`).

잘 찾아왔군. 여기에서 궁금증은, 꼭 remark-rehype을 함께 써야하는 것인지, 아니면 따로인지? 조금 더 이해가 필요하다.

Markdown dictates how, say, a list item or emphasis can be parsed.
We can use that to turn the markdown syntax tree into an HTML syntax tree.

마크다운이 알아듣는 문법이 있고, 우린 그걸 HTML syntax 트리로 바꿔줄 수 있다.

But markdown also dictates that things that look like HTML, are passed through untouched, even when it just looks like XML but doesn't really make sense, so we can't normally use these strings of HTML to create an HTML syntax tree.

**This plugin can.** It can be used to take those strings of HTML and include them into the syntax tree as actual nodes.

---

다 읽고 드는 생각, markdown이 어떻게 html로 변형(parse)되어 나타나는건가? 이 기본적인 플로우부터 알아야겠다.