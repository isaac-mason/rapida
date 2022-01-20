# @rapidajs/rapida

## 0.0.10

### Patch Changes

- Change version of three
- Updated dependencies
  - @rapidajs/cannon-worker@0.0.10

## 0.0.9

### Patch Changes

- 95312bc: Improve EventSystem performance by using es6 Map which supports iteration in insertion order
- 42db24e: Remove 'ready' event from rapida world
- 95312bc: Add explicit types for 'add' and 'create' nested factory methods
- 865268f: Update initialisation logic to support adding resources during initialisation
- 8019f2d: Prefix internal World methods with '\_' to indicate they should not be called directly
- 791305b: Fix incorrect initialisation of rapida engine previousFrame causing unexpected behaviour
- 865268f: Add event system to 'World' with 'ready' event that is emitted after initialisation
- f7d1869: Add support to WebGLRenderer for post processing effects, add common post processing effects
- 8019f2d: Remove unused 'maxUpdatesPerSec' parameter from world physics factory
- 6c78cb6: Refactor classes to better communicate whether methods and properties are internal or public
- 630f257: Fix missing jsdoc for factory methods
- bfeb2b5: Add factory methods for rapida Engine and World as default exports from rapida lib
- a20c440: Change @rapidajs/recs and @rapidajs/rapida to use seconds for update methods instead of ms
- 10de257: Add support for onProgress callback to loaders
- 5935220: Merge render, physics and game loop into a single loop
- 95312bc: Add 'queued' option to EventSystem that controls whether events are queued, or whether they are processed immediately
- 5935220: Add world viewport to webgl and css3d views that give the viewport in 3d units for a target
- bfeb2b5: Remove all references to `Engine` from `World` class, making the world engine agnostic
- bf6abae: Fix incorrect import styles
- 5f0aaea: Change physics factory methods to return objects instead of arrays
- 8d9ed89: Add a load method to world with methods for various types of assets
- Updated dependencies [95312bc]
- Updated dependencies [95312bc]
- Updated dependencies [791305b]
- Updated dependencies [865268f]
- Updated dependencies [70f361a]
- Updated dependencies [3d50349]
- Updated dependencies [f7d1869]
- Updated dependencies [73da5be]
- Updated dependencies [9995b49]
- Updated dependencies [2daad2f]
- Updated dependencies [6c78cb6]
- Updated dependencies [630f257]
- Updated dependencies [2daad2f]
- Updated dependencies [ccc6793]
- Updated dependencies [ba4df1a]
- Updated dependencies [a20c440]
- Updated dependencies [95312bc]
- Updated dependencies [bf6abae]
- Updated dependencies [5f0aaea]
  - @rapidajs/rapida-common@0.0.9
  - @rapidajs/recs@0.0.9
  - @rapidajs/cannon-worker@0.0.9
  - @rapidajs/postprocessing@0.0.2

## 0.0.8

### Patch Changes

- 2fa043a: Revert back to using 'args' syntax for physics object creation in '@rapidajs/cannon-worker
- Updated dependencies [a50c7ec]
- Updated dependencies [2fa043a]
  - @rapidajs/cannon-worker@0.0.8

## 0.0.7

### Patch Changes

- 49bd7d5: Improve performance of entity 'get', 'find', and 'has' methods
- 6f32509: Separate rapida entity component system into a separate standalone package '@rapidajs/recs'
- 2a1452c: Add Engine factory as default export to '@rapidajs/rapida'
- 6d8058b: Add 'added' and 'removed' fields to @rapidajs/recs Query for entities added and removed in the latest update
- 6d8058b: Change `@rapidajs/recs` to use object pools for entities and components, change component usage to support the changes
- 802b008: Change rapida to use isolatedModules tsconfig and fix imports and exports
- f71af6e: Change entity `get` method to throw error if component is not found, add entity `find` method for components that returns undefined if not found
- f2fa77f: Change system queries from being a constructor argument to a property
- 8a9e1ed: Make renderers more flexible by removing the renderer element id param in favour of appending a dom element
- 6d8058b: Change event system to return subscription object instead of a handler id
- Updated dependencies [6f32509]
- Updated dependencies [6d8058b]
- Updated dependencies [6d8058b]
- Updated dependencies [9ebc693]
- Updated dependencies [6d8058b]
  - @rapidajs/recs@0.0.7
  - @rapidajs/cannon-worker@0.0.7
  - @rapidajs/rapida-common@0.0.7

## 0.0.6

### Patch Changes

- 0b66f10: Add README
- Updated dependencies [0b66f10]
  - @rapidajs/cannon-worker@0.0.6

## 0.0.5

### Patch Changes

- Add XRRenderer to add basic VR and AR support
