const { expect } = require('chai')
const ZeroWidthCharacterEncryptionManager = require('./')

const username = 'wfsovereign'

describe('ZeroWidthCharacterEncryptionManager ', function () {

  let manager
  beforeEach(() => {
    manager = new ZeroWidthCharacterEncryptionManager()
  })

  it(`should output correct binary when input ${username}`, function () {
    expect(manager.textToBinary(username)).to.equal('01110111 01100110 01110011 01101111 01110110 01100101 01110010 01100101 01101001 01100111 01101110')
  })

  it(`should not equal incorrect binary when input ${username}`, function () {
    expect(manager.textToBinary(username)).to.not.equal('01110111 01100110')
  })

  it(`should output ${username} when input binary `, function () {
    expect(manager.binaryToText('01110111 01100110 01110011 01101111 01110110 01100101 01110010 01100101 01101001 01100111 01101110')).to.equal(username)
  })

  it(`should output ${username} when encrypt and decrypt`, function () {
    expect(username).to.equal(manager.decryptCipherText(manager.createEncryptionText(username)))
  })

  it(`should output ${username} when use generate content to get signature`, function () {
    expect(username).to.equal(manager.getOriginalSignature(manager.generateAnnouncement('Today news', username)))
  })
})
