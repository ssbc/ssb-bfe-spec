# SSB binary field encodings

Definition of binary encodings for common types such as message ids
and feed ids to be used in binary feed formats. This can be seen as an
extension of the types defined in [TFK].

The binary encoding is defined as the concatenation of:
- the `type` of thing as a UInt8
- the `format` of the `type` as a UInt8
- the `data` for the actual bytes

## Codes

 |  type code  | referencing        |
 | ----------- | -------------      |
 |  0          | feed               |
 |  1          | message            |
 |  2          | blob               |
 |  3          | diffie-hellman key |
 |  4          | box encoding       |
 |  5          | value types        |

For canonical, machine-readable definitions, see `binary-field-encodings.json`

### Feed type

 | format code   | format            | specification               |
 | ------------- | ----------------- | --------------------------- |
 | 0             | classic           | [classic]                   |
 | 1             | gabby grove       | [gabby grove]               |
 | 2             | private group     |                             |
 | 3             | bamboo            | [bamboo]                    |
 | 4             | metafeed          | [metafeed]                  |
 | 5             | fusion identity   | [fusionidentity]            |

Example:

String encoding of a classic feed:

```
  @6CAxOI3f+LUOVrbAl0IemqiS7ATpQvr9Mdw9LC4+Uv0=.ed25519
  │└─────────────────────┬────────────────────┘└───┬──┘
 sigil           base64 encoded key             suffix
```

### Message type

 | format code   | format            | specification               |
 | ------------- | ----------------- | --------------------------- |
 | 0             | classic           | [classic]                   |
 | 1             | gabby grove       | [gabby grove]               |
 | 2             | bamboo            | [bamboo]                    |
 | 3             | metafeed          | [metafeed]                  |

Example:

String encoding of a classic message id:

```
  %R8heq/tQoxEIPkWf0Kxn1nCm/CsxG2CDpUYnAvdbXY8=.sha256
  │└─────────────────────┬────────────────────┘└───┬─┘
 sigil           base64 encoded key             suffix
```

Binary encoding (as hex) of the same thing:

```
  01 00  47 c8 5e ab fb 50 a3 11 08 3e 45 9f d0 ac 67 d6 70 a6 fc 2b 31 1b 60 83 a5 46 27 02 f7 5b 5d 8f
   │  │  └────────────────────┬────────────────────────────────────────────────────────────────────────┘
type  │                hex encoded key
     format 
```

### Blob type

 | format code   | format            | specification               |
 | ------------- | ----------------- | --------------------------- |
 | 0             | classic           | [classic]                   |

Example: 

String encoding of a classic blob id:

```
  &S7+CwHM6dZ9si5Vn4ftpk/l/ldbRMqzzJos+spZbWf4=.sha256
  │└─────────────────────┬────────────────────┘└───┬─┘
 sigil           base64 encoded key             suffix
```

### Diffie-hellman type

 | format code   | format            | specification               |
 | ------------- | ----------------- | --------------------------- |
 | 0             | curve25519        |                             |

### Box encoding type

 | format code   | format            | specification               |
 | ------------- | ----------------- | --------------------------- |
 | 0             | box1              |                             |
 | 1             | box2              |                             |

### Value type

 | format code   | format            | specification               |
 | ------------- | ----------------- | --------------------------- |
 | 0             | utf8 string       |                             |

Value type can be used for binary encodings that has limited support
for different types such as [bencode].

[TFK]: https://github.com/ssbc/envelope-spec/blob/master/encoding/tfk.md
[classic]: https://ssbc.github.io/scuttlebutt-protocol-guide/#message-format
[gabby grove]: https://github.com/ssbc/ssb-spec-drafts/tree/master/drafts/draft-ssb-core-gabbygrove/00
[bamboo]: https://github.com/AljoschaMeyer/bamboo
[metafeed]: https://github.com/ssb-ngi-pointer/bipfy-badger-spec
[fusionidentity]: https://github.com/ssb-ngi-pointer/fusion-identity-spec/
[bencode]: https://en.wikipedia.org/wiki/Bencode
