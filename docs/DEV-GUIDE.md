# Development

Documentation for developing with rapida.

## Getting Started

### 0. Requirements

- Ensure Node12+ is installed

### 1. Install dependencies

Install all dependencies:

```
> npm i && (cd common && npm i) && (cd server && npm i) && (cd client && npm i)
```

### 2. Build all packages

Run the following in the project root to build all packages:

```
> npm run build
```

## Releasing a new version

A new version can be set in package.json files with the following commands:

```
# choose the new version
> VERSION=0.0.1

# update versions
> (cd common && npm version $VERSION)
> (cd server && npm version $VERSION)
> (cd client && npm version $VERSION)
```

To build and release the new version in the package registry, create and push new tag based on the `main` branch with the same version.
