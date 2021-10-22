# 🐸

This repo contains the source code of [pep frog](https://amphibian-advice.sonnet.io).

## I want to add my own pep talk!

Edit `src/data.ts` to modify the possible phrases or templates.
You don't need to install the project locally to do that: just fork it, go to the file on GH <kbd>.</kbd> and the web editor will pop up.

### How does this work?

`src/collapse.ts` contains a simple text expansion engine. Its syntax is similar to Tracery by [Kate Compton](https://github.com/galaxykate/tracery), but the implementation is much more limited (check `/src/collapse.spec.ts/` for examples of what's possible, how it's meant to be used).

## Finally, remember the wise words of the amphibian oracle:

![Frog](./logo.jpg)

## Credits

-   the idea for this app comes from [this reddit post](https://i.redd.it/w6yzerz484u71.png).
-   the _squiggly lines_ effect is based on [this CodePen](https://codepen.io/lbebber/pen/KwGEQv?editors=1100) by Lucas Bebber
-   the less cheesy, yet somewhat more funny phrases come from [Luna](https://www.instagram.com/luna.jenesaisquoi/)
