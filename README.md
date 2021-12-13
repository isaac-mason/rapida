# rapida

*rápida - fast*

`rapida` is a collection of javascript packages that make creating interactive 3d content for the web with three.js easy!

- [x] Build out your 3D scenes with [three.js](https://threejs.org/)
- [x] Add physics to your world with `rapida-physics`, which runs [cannon-es](https://github.com/pmndrs/cannon-es) in a web worker
- [x] Add complex logic to your world with the `rapida-ecs` Entity Component System
- [x] Simple API for handling multiple renderers and multiple views within renderers
- [x] Frontend framework/library agnostic - BYO frontend stack!

```bash
> npm install @rapidajs/rapida three@^0.133.0
```

The package `@rapidajs/rapida-physics` can also be used standalone to bring physics into your three scene!

```bash
> npm install @rapidajs/rapida-physics
```

See the rapida website for documentation and examples - [rapidajs.dev](https://rapidajs.dev/)

## Development

To track development for `rapida`, see our board on GitLab - https://gitlab.com/rapidajs/rapida/-/boards

The below commands can be used to help with development:

```bash
# Install deps, build, then test all packages
> npm run install && npm run build && npm run test

# Start storybook for all packages
> npm run storybook

# Build and test all packages
> npm run prerelease

# Create a new changeset
> npm run change

# Create a new release
> npm run release
```

## Contributing

All rapida packages are open sourced under the `MIT` license.

It's still very early days for rapida, and we're still working things out! Right now, Isaac Mason is the author of rapida and the primary contributor. If you're interested in contributing, [feel free to reach out](https://isaacmason.com/)! 

If you're viewing this repository on GitHub, we actually make changes over here at GitLab - https://gitlab.com/rapidajs/rapida
