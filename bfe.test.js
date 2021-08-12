const tape = require('tape')
const bfeTypes = require('./bfe.json')

tape('bfe', function (t) {
  const sigiledTypes = bfeTypes.reduce((acc, type) => {
    if (type.sigil) return [...acc, type]
    return acc
  }, [])
  t.equal(
    sigiledTypes.length,
    new Set(sigiledTypes.map((type) => type.sigil)).size, // unique sigil
    'each sigil is unique to a type'
  )
  t.equal(sigiledTypes.length, 3, 'there are only 3 sigils')

  sigiledTypes.forEach(type => {
    const typeSuffixes = type.formats.reduce((acc, format) => {
      if (format.suffix && format.suffix.length) acc.add(format.suffix)
      return acc
    }, new Set())

    t.equal(
      typeSuffixes.size,
      type.formats.length,
      `each type/format with sigil ${type.sigil} has unique suffix` // unique to that type
    )
  })

  const sigillessSuffixFormats = bfeTypes.reduce((acc, type) => {
    if (type.sigil) return acc

    return [...acc, ...type.formats.filter((format) => format.suffix)]
  }, [])
  t.equal(
    sigillessSuffixFormats.length,
    new Set(sigillessSuffixFormats.map((type) => type.suffix)).size,
    'every suffix-only format is unique'
  )

  t.end()
})
