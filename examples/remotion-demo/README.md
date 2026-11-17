# THX 1138 — Remotion film

A 42 second, 1920×1080, 30 fps film of the control surface. It is a consumer of the public `thx-components` package: `import "thx-components"` and `import "thx-components/aesthetics.css"`. The picture is driven from `useCurrentFrame`. Custom elements are the real UI SDK and THX parts, not a redraw.

Remotion evaluates the composition in Node, and this package defines custom elements on import. `ConsoleFilm.tsx` loads `Surface.tsx` in the browser for that reason.

## Render

From the repository root, build the library once so `dist/` exists. Then:

```bash
cd examples/remotion-demo
npm install
npx remotion browser ensure
npm run render
```

`out/thx-1138.mp4` is H.264. A still is:

```bash
npx remotion still src/index.ts THX1138 out/frame.png --frame=560
```

## What a React consumer actually does

The package ships the Web Components adapter, not `@ui-sdk/react`. A React page writes the part markup (`<ui-button><button data-variant="primary">`) and then sets DOM state after upgrade. Scopes move when `element.api.setValue` runs. Tabs move when `element.api.select` runs. A dialog opens through its `open` property. `default-value` does not keep updating after the element mounts.

There are no JSX typings for `ui-*` or `thx-*` in the published package. This demo declares them locally. Primitive factories are typed `unknown` in `thx-components`, which is fine here because the film never calls them.

`thx-relative-time` and the spinner, pulse, and shimmer animations follow wall-clock timers. This film does not use them. Every number on screen comes from the frame.

A dialog's content is painted in the top layer. A cursor that is a sibling of the page sits behind that layer, so this film draws a second cursor inside `ui-dialog-content` while the dialog is open. React 19 also does not accept `ref` on an undeclared custom element unless the local JSX type includes it.
