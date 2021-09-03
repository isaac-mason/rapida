# rapida

*rápida - fast*

NPM packages for creating single-player and multi-player web-based games.

## Getting Started

### 0. Requirements

- Node12+ is installed

### 1. Install dependencies

```
> npm i && (cd common && npm i) && (cd server && npm i) && (cd client && npm i)
```

### 2. Link local packages

From the project root, run the following:

```
# Run npm link in packages
> (cd common && npm link)
> (cd server && npm link)
> (cd client && npm link)

# Use local version of @isaacmason/rapida-common in the client and server libraries
> (cd server && npm link "@isaacmason/rapida-common")
> (cd client && npm link "@isaacmason/rapida-common")
```

You can now in other projects run the following to use the local version of `@isaacmason/rapida-client` and `@isaacmason/rapida-server`:

```
> (cd other-project-server && npm link "@isaacmason/rapida-server")
> (cd other-project-client && npm link "@isaacmason/rapida-client")
```

### 3. Rebuild all packages for local development

Run the following in the project root to rebuild all packages:

```
> npm run build
```

### 4. Releasing a new version

A new version can be set in package.json files with the following commands:

```
# choose the new version
> VERSION=0.0.1

# update versions
> (cd common && npm version $VERSION)
> (cd server && npm version $VERSION)
> (cd client && npm version $VERSION)
```

To build and release the new version in the package registry, create a new tag with the same version.
