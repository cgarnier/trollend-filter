
const Filter = require('../lib/index')
const streamify = require('stream-array')
const toArray = require('stream-to-array')
const concat = require('concat-stream')
const assert = require('chai').assert
const os = require('os')

let sample = [{a: 1}, {a: 2}, {a: 1}, {a: 3}, {a: 3}, {a: 4}, {a: 1}, {a: 5}]
let lookup = [{a: 1}, {a: 4}]

function notInLookup (data) {
  return !this.lookupData.some((d) => d.a === data.a)
}


describe('Simple filtering', () => {
  it('Should be able to map a property to another', (done) => {
    streamify(sample)
      .pipe(new Filter({objectMode: true})
        .setFn((o) => o.a !== 1)
      )
      .pipe(concat((data) => {
        for(var i = 0; i < data.length; i++) {
          assert.notStrictEqual(data[i].a, 1, 'these property value are stricly equal')
        }
        done()
      }))
  })

  it('Should be able to filter using a lookup table', (done) => {
    streamify(sample)
      .pipe(new Filter({objectMode: true})
      .setFn(notInLookup)
      .setLookup(streamify(lookup))
    )
    .pipe(concat((data) => {
      for(var i = 0; i < data.length; i++) {
        assert.notStrictEqual(data[i].a, 1, 'these property is equal to 1')
        assert.notStrictEqual(data[i].a, 4, 'these property value are stricly equal')

      }
      done()
    }))
})
})
