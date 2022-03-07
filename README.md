# rapida

_rápida - fast_

`rapida` is a collection of javascript packages that make creating interactive 3d content for the web with three.js easy!

**rapida is under active alpha development and is not yet battle-tested and stable. We don't recommend using rapida in production just yet, but watch this space!**

| Package                                                           | Description                                                                                                                                                         |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@rapidajs/recs`](./packages/recs/README.md)                     | `@rapidajs/recs` helps you build and structure games and other demanding applications with ECS architecture.                                                        |
| [`@rapidajs/three`](./packages/three/README.md)                   | `@rapidajs/three` provides three.js utilities for managing multiple views and loading assets.                                                                       |
| [`@rapidajs/postprocessing`](./packages/postprocessing/README.md) | `@rapidajs/postprocessing` is a thin wrapper around vanruesc/postprocessing. It is used in @rapidajs/three to provide an easy way of using post processing effects. |
| [`@rapidajs/cannon-worker`](./packages/cannon-worker/README.md)   | `@rapidajs/cannon-worker` makes adding cannon physics to your three.js scenes easy!                                                                                 |

See the rapida website for documentation and examples - [rapidajs.dev](https://rapidajs.dev/)

## Development

To track development for `rapida`, see our board on GitLab - https://gitlab.com/rapidajs/rapida/-/boards

The below commands can be used to help with development:

```bash
# Install dependencies
> yarn install

# build and test all packages
> yarn run release

# Start storybook for all packages
> yarn run storybook

# Build the rapida website
> yarn run website:build

# Create a new changeset
> yarn run change

# Update versions of packages according to committed changesets
> yarn run version
```

## Contributing

All rapida packages are open sourced under the `MIT` license.

It's still very early days for rapida, and we're still working things out! Right now, Isaac Mason is the primary contributor. If you're interested in contributing, [feel free to reach out](https://isaacmason.com/)!

If you're viewing this repository on GitHub, we actually make changes over here at GitLab - https://gitlab.com/rapidajs/rapida
