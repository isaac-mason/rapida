# @rapidajs/cannon-worker

## 0.0.9
### Patch Changes

- 70f361a: Reduce @ts-expect-error usage by adding custom cannon-es declarations that include uuid property
- 3d50349: Fix cannon-worker CompoundBodyParams type, add compound body storybook
- 73da5be: Fix bug in cannon-worker for collision, add more cannon-worker examples
- 9995b49: Add basic support for converting three objects to cannon shapes
- 2daad2f: Call debugger update method as part of physics step
- 2daad2f: Change default physics debugger color to white
- ccc6793: Remove redundant getter for physics web worker
- ba4df1a: Fix onCollideBegin collision event
- bf6abae: Fix incorrect import styles
- 5f0aaea: Change physics factory methods to return objects instead of arrays
 
## 0.0.8
### Patch Changes

- a50c7ec: Export `@rapidajs/cannon-worker` `paramsToBody` method to enable body params to be used with cannon-es directly
- 2fa043a: Revert back to using 'args' syntax for physics object creation in '@rapidajs/cannon-worker

## 0.0.7
### Patch Changes

- 9ebc693: Change to using isolatedModules tsconfig and fix imports and exports

## 0.0.6
### Patch Changes

- 0b66f10: Add README
