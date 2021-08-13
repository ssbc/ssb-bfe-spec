# SSB Binary Field Encodings

Shortname: SSB-BFE

Definition of binary encodings for common types such as message IDs and feed IDs
to be used in binary feed formats.

The binary encoding is defined as the concatenation of three parts, often known
as **T-F-D**:

- The `type` of thing as a UInt8 byte
- The `format` of the `type` as a UInt8 byte
- The `data` as a sequence of UInt8 bytes

## Types

 | Type code   | Referencing        |
 |:-----------:| ------------------ |
 | 0           | feed               |
 | 1           | msg                |
 | 2           | blob               |
 | 3           | key                |
 | 4           | signature          |
 | 5           | encrypted          |
 | 6           | generic            |
 | 7           | identity           |

### 0. Feed ID formats

A feed ID TFD represents the public portion of a cryptographic keypair used to
identify a feed, and verify message signatures.

| Type code | Format code | Data length | Format name     | Specification    |
|:---------:|:-----------:|-------------|-----------------|------------------|
| 0         | 0           | 32 bytes    | classic         | [classic]        |
| 0         | 1           | 32 bytes    | gabby-grove     | [gabby grove]    |
| 0         | 2           | 32 bytes    | bamboo          | [bamboo]         |
| 0         | 3           | 32 bytes    | bendy-butt      | [bendy butt]     |

#### Example

Given a sigil-based string encoding of a classic SSB feed:

```
  @6CAxOI3f+LUOVrbAl0IemqiS7ATpQvr9Mdw9LC4+Uv0=.ed25519
  │└─────────────────────┬────────────────────┘└───┬──┘
 sigil           base64 encoded data            suffix
```

Its BFE encoding is the following bytes displayed in hexadecimal:

```
  00 00 e8 20 31 38 8d df f8 b5 0e 56 b6 c0 97 42 1e 9a a8 92 ec 04 e9 42 fa fd 31 dc 3d 2c 2e 3e 52 fd
   │  │ └────────────────────┬────────────────────────────────────────────────────────────────────────┘
type  │                    data
     format
```

### 1. Msg ID formats

A message ID TFD represents the hash that uniquely identifies a message
published on a feed. Some message ID formats directly reference the hash
algorithm utilized, while others leave it implicit in the specification.

| Type code | Format code | Data length | Format name   | Specification   |
|:---------:|:-----------:|-------------|---------------|-----------------|
| 1         | 0           | 32 bytes    | classic       | [classic]       |
| 1         | 1           | 32 bytes    | gabby-grove   | [gabby grove]   |
| 1         | 2           | 32 bytes    | cloaked       | [private group] |
| 1         | 3           | 64 bytes    | bamboo        | [bamboo]        |
| 1         | 4           | 32 bytes    | bendy-butt    | [bendy butt]    |

#### Example

Given a sigil-based string encoding of a classic SSB message ID:

```
  %R8heq/tQoxEIPkWf0Kxn1nCm/CsxG2CDpUYnAvdbXY8=.sha256
  │└─────────────────────┬────────────────────┘└──┬──┘
 sigil           base64 encoded data            suffix
```

Its BFE encoding is the following bytes displayed in hexadecimal:

```
  01 00 47 c8 5e ab fb 50 a3 11 08 3e 45 9f d0 ac 67 d6 70 a6 fc 2b 31 1b 60 83 a5 46 27 02 f7 5b 5d 8f
   │  │ └────────────────────┬────────────────────────────────────────────────────────────────────────┘
type  │                    data
     format
```

### 2. Blob ID formats

A blob ID TFD represents the hash that uniquely identifies the blob.

| Type code | Format code | Data length | Format name | Specification |
|:---------:|:-----------:|-------------|-------------|---------------|
| 2         | 0           | 32 bytes    | classic     | [classic]     |

#### Example

Given a sigil-based string encoding of a classic SSB blob ID:

```
  &S7+CwHM6dZ9si5Vn4ftpk/l/ldbRMqzzJos+spZbWf4=.sha256
  │└─────────────────────┬────────────────────┘└───┬─┘
 sigil           base64 encoded data            suffix
```

Its BFE encoding is the following bytes displayed in hexadecimal:

```
  02 00 4b bf 82 c0 73 3a 75 9f 6c 8b 95 67 e1 fb 69 93 f9 7f 95 d6 d1 32 ac f3 26 8b 3e b2 96 5b 59 fe
   │  │ └────────────────────┬────────────────────────────────────────────────────────────────────────┘
type  │                    data
     format
```

### 3. Encryption Key formats

keys used for encryption

| Type code | Format code | Data length | Format name    | Specification         |
|:---------:|:-----------:|-------------|----------------|-----------------------|
| 3         | 0           | 32 bytes    | box2-dm-dh     | [private group dm]    |
| 3         | 1           | 32 bytes    | box2-pobox-dh  | [private group pobox] |


### 4. Signature formats

| Type code | Format code | Data length | Format name     | specification |
|:---------:|:-----------:|-------------|-----------------|---------------|
| 4         | 0           | 64 bytes    | msg-ed25519     |               |


#### Example

Given a base64 string encoding of a classic SSB ed25519 signature:

```
  nkY4Wsn9feosxvX7bpLK7OxjdSrw6gSL8sun1n2TMLXKySYK9L5itVQnV2nQUctFsrUOa2istD2vDk1B0uAMBQ==.sig.ed25519
  └─────────────────────────────────────┬────────────────────────────────────────────────┘└────┬─────┘
                             base64 encoded signature                                        suffix
```

Its BFE encoding is the following bytes displayed in hexadecimal:

```
  04 00 9e 46 38 5a c9 fd 7d ea 2c c6 f5 fb 6e 92 ca ec ec 63 75 2a f0 ea 04 8b f2 cb a7 d6 7d 93 30 b5 ca c9 26 0a f4 be 62 b5 54 27 57 69 d0 51 cb 45 b2 b5 0e 6b 68 ac b4 3d af 0e 4d 41 d2 e0 0c 05
   │  │ └────────────────────┬────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
type  │                    data
     format
```

### 5. Encrypted data formats

When content is encrypted (in other words, "boxed") in SSB, it is provided as
uninterpretable bytes, plus a tag that identifies which algorithm was used for
encrypting it, such as `box` or `box2`.

| Type code | Format code | Data length | Format name | Specification   |
|:---------:|:-----------:|-------------|-------------|-----------------|
| 5         | 0           | Arbitrary   | box1        | [private box]   |
| 5         | 1           | Arbitrary   | box2        | [private group] |

### 6. Generic data formats

BFE supports encoding data types with no semantics attached to them. They are
merely categorized into formats that represent their data type.

| Type code | Format code | Data length | Format name | Specification                 |
|:---------:|:-----------:|-------------|-------------|-------------------------------|
| 6         | 0           | Arbitrary   | string-UTF8 | [UTF8]                        |
| 6         | 1           | 1 byte      | boolean     | Data byte is 0 for False, 1 for True |
| 6         | 2           | 0 bytes     | nil         | [null pointer]                |
| 6         | 3           | Arbitrary   | any-bytes   | Arbitrary sequence of bytes |


### 7. Identity formats

Identities are distinct from feedIds in that they are not a key bound to a single feed/ device,
and they are never used for signing of messages.

| Type code | Format code | Data length | Format name | Specification                 |
|:---------:|:-----------:|-------------|-------------|-------------------------------|
| 7         | 0           | 32          | po-box      | [private group pobox]         |


[TFK]: https://github.com/ssbc/envelope-spec/blob/master/encoding/tfk.md
[classic]: https://ssbc.github.io/scuttlebutt-protocol-guide/#message-format
[gabby grove]: https://github.com/ssbc/ssb-spec-drafts/tree/master/drafts/draft-ssb-core-gabbygrove/00
[bamboo]: https://github.com/AljoschaMeyer/bamboo
[private group]: https://github.com/ssbc/private-group-spec/tree/master/encryption
[private group dm]: https://github.com/ssbc/private-group-spec/tree/master/direct-messages
[private group pobox]: https://github.com/ssbc/private-group-spec/tree/master/po-box
[bendy butt]: https://github.com/ssb-ngi-pointer/bendy-butt-spec
[private box]: https://ssbc.github.io/scuttlebutt-protocol-guide/#private-messages
[envelope spec]: https://github.com/ssbc/envelope-spec
[null pointer]: https://en.wikipedia.org/wiki/Null_pointer
[UTF8]: https://datatracker.ietf.org/doc/html/rfc3629
[fusionidentity]: https://github.com/ssb-ngi-pointer/fusion-identity-spec/
[bencode]: https://en.wikipedia.org/wiki/Bencode
