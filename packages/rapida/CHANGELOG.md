# @rapidajs/rapida

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
