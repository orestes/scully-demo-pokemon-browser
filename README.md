# Pokémon Browser

Angular demo project with static generation powered by [Scully](https://github.com/scullyio/scully)

## Adding Scully to your project

0. Read the [Scully documentation](https://github.com/scullyio/scully)
0. Add Scully to your Angular CLI project with `ng add @scullyio/init`
0. Run `yarn run scully` and verify your routes are being pre-rendered
0. If needed, write [router plugins](https://github.com/scullyio/scully/blob/main/docs/plugins.md#router-plugin) for your dynamic routes (like `view/:id`)
0. If not needed during runtime, remove Angular altogether from the resulting bundle by using [scully-plugin-disable-angular](https://samvloeberghs.be/posts/disabling-angular-when-statically-genering-with-scully). 

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Building a static version with Scully

0. Run `yarn build:prod` to build the project with production settings.
0. Run `yarn scully` to generate a static version of your site, with no Angular scripts included.
0. Deploy `dist/static` to your http server. You can also run `yarn serve:static` to serve locally

## Links

 - [Pokémon Browser demo](https://github.com/orestes/scully-demo-pokemon)
 - [PokéApi](https://github.com/scullyio/scully)
 - [Scully on GitHub](https://github.com/scullyio/scully)
 - [Scully on Twitter](https://twitter.com/scullyio)
 - [Scully Router Plugin documentation](https://github.com/scullyio/scully/blob/main/docs/plugins.md#router-plugin)
 - [Disabling Angular when statically generating with Scully by Sam Vloebergh](https://samvloeberghs.be/posts/disabling-angular-when-statically-genering-with-scully)

## License

[Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/)
