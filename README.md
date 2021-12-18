# rapida

*rápida - fast*

`rapida` is a collection of javascript packages that make creating interactive 3d content for the web with three.js easy!

- [x] Build out your 3D scenes with [three.js](https://threejs.org/)
- [x] Add physics to your world with `rapida-physics`, which runs [cannon-es](https://github.com/pmndrs/cannon-es) in a web worker
- [x] Add complex logic to your world with the rapida Entity Component System
- [x] Simple API for handling multiple renderers and multiple views within renderers

```bash
> npm install @rapidajs/rapida three@^0.133.0
# OR
> yarn add @rapidajs/rapida three@^0.133.0
```

The package `@rapidajs/rapida-physics` can also be used independently to add physics into your three scene!

```bash
> npm install @rapidajs/rapida-physics
# OR
> yarn add @rapidajs/rapida-physics
```

See the rapida website for documentation and examples - [rapidajs.dev](https://rapidajs.dev/)

## Development

To track development for `rapida`, see our board on GitLab - https://gitlab.com/rapidajs/rapida/-/boards

The below commands can be used to help with development:

```bash
# Install dependencies rapida and dependant packages in the workspace
> yarn workspaces focus @rapidajs/rapida

# alternatively, install all packages in the workplace to build examples
# note that one example requires node-datachannel which requires cmake to be installed
# see node-datachannel for system requirements: https://www.npmjs.com/package/node-datachannel
> yarn install

# build and test all packages
> yarn run release

# Start storybook for all packages
> yarn run storybook

# Create a new changeset
> yarn run change

# Create a new versioned release
> yarn run version
```

## Contributing

All rapida packages are open sourced under the `MIT` license.

It's still very early days for rapida, and we're still working things out! Right now, Isaac Mason is the primary contributor. If you're interested in contributing, [feel free to reach out](https://isaacmason.com/)! 

If you're viewing this repository on GitHub, we actually make changes over here at GitLab - https://gitlab.com/rapidajs/rapida
