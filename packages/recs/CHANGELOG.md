# @rapidajs/recs

## 0.1.0

### Minor Changes

- Minor version bump @rapidajs/recs, @rapidajs/three, @rapidajs/postprocessing due to deprecation of @rapidajs/rapida

## 0.0.14

### Patch Changes

- 3d8b7f9: Refactor to move more ecs management logic into internal classes
- c194c46: Update recs default export, remove second 'time' parameter for recs World update method

## 0.0.13

### Patch Changes

- 6b6dde2: Refactor recs package file structure
- 1a1855d: Add 'time' parameter to recs update and onUpdate methods
- 9092567: Remove 'public' from getters in recs and rapida
- cae1ac7: Clean up recs Space logic for removing dead entities

## 0.0.9

### Patch Changes

- 95312bc: Improve EventSystem performance by using es6 Map which supports iteration in insertion order
- 95312bc: Add explicit types for 'add' and 'create' nested factory methods
- 791305b: Add EntityManager class that contains logic for maintaining Spaces, Entities, and their Components, simplifying user-facing classes
- 865268f: Update initialisation logic to support adding resources during initialisation
- 6c78cb6: Refactor classes to better communicate whether methods and properties are internal or public
- 630f257: Fix missing jsdoc for factory methods
- a20c440: Change @rapidajs/recs and @rapidajs/rapida to use seconds for update methods instead of ms
- 95312bc: Add 'queued' option to EventSystem that controls whether events are queued, or whether they are processed immediately
- Updated dependencies [95312bc]
- Updated dependencies [95312bc]
  - @rapidajs/rapida-common@0.0.9

## 0.0.7

### Patch Changes

- 6f32509: Separate rapida entity component system into a separate standalone package '@rapidajs/recs'
- 6d8058b: Add 'added' and 'removed' fields to @rapidajs/recs Query for entities added and removed in the latest update
- 6d8058b: Change `@rapidajs/recs` to use object pools for entities and components, change component usage to support the changes
- 6d8058b: Change event system to return subscription object instead of a handler id
- Updated dependencies [6d8058b]
  - @rapidajs/rapida-common@0.0.7
