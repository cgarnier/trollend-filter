# trollend-filter
trollend filter component.

Filter a stream according a filter function

## Usage

```
const Filter = require('trollend-filter')
const concat = require('concat-stream')

let sample = [{a: 1}, {a: 2}, {a: 3}, {a: 4}, {a: 5}]

streamify(sample)
  .pipe(new Filter({objectMode: true})
    .setFn((o) => o.a !== 1)
  )
  .pipe(concat((data) => {
    console.log('Filtered data: ', data)
  }))
```

See the tests for more usage examples.

## Methods

### setFn

Set the filtering function. If you want to use the lookup input you must use a function ()

### setLookup

Set a lookup stream.
You can access to the lookup data in the filter funciton with `this.lookupData`
