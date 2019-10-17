function padStar(text, length = 8, chars = '0') {
  if (typeof text !== 'string') {
    throw new Error('invalid params. text must be string')
  }

  return (
    Array(length)
      .fill(chars)
      .slice(text.length) + text
  )
}

const zeroWidthSpace = '\u200B'
const zeroWidthJoiner = '\u200D'
const zeroWidthNonJoiner = '\u200C'
const zeroWidthNonBreakSpace = '\uFEFF'

class ZeroWidthCharacterEncryptionManager {
  createEncryptionText(text) {
    if (!text || typeof text !== 'string') {
      throw new Error('invalid param, param must be string')
    }

    const binaryText = this.textToBinary(text)
    return binaryText
      .split('')
      .map(b => {
        const num = parseInt(b, 10)
        if (num === 1) {
          return zeroWidthSpace
        }

        if (num === 0) {
          return zeroWidthNonJoiner
        }

        return zeroWidthJoiner
      })
      .join(zeroWidthNonBreakSpace)
  }

  charToBinary(char) {
    return char.charCodeAt(0).toString(2)
  }

  textToBinary(text) {
    return text
      .split('')
      .map(item => padStar(this.charToBinary(item)))
      .join(' ')
  }

  binaryToText(text) {
    return text
      .split(' ')
      .map(num => {
        return String.fromCharCode(parseInt(num, 2))
      })
      .join('')
  }

  extractZeroWidthCharacters(content) {
    if (typeof content !== 'string') {
      throw new Error('invalid params. text must be string')
    }
    const result = content.match(/[\u200B-\u200C\uFEFF]+/g)
    return Array.isArray(result) && result.join('')
  }

  zeroWidthTextToBinary(text) {
    return text
      .split(zeroWidthNonBreakSpace)
      .map(t => {
        if (t === zeroWidthSpace) {
          return 1
        }

        if (t === zeroWidthNonJoiner) {
          return 0
        }

        return ' '
      })
      .join('')
  }

  decryptCipherText(text) {
    const target = this.extractZeroWidthCharacters(text)

    if (!target) {
      return ''
    }

    return this.binaryToText(this.zeroWidthTextToBinary(target))
  }

  getOriginalSignature(content) {
    const target = this.extractZeroWidthCharacters(content)

    if (!target) {
      return ''
    }

    return this.binaryToText(this.zeroWidthTextToBinary(target))
  }

  generateAnnouncement(content, signature) {
    return this.createEncryptionText(signature) + content
  }
}

module.exports = ZeroWidthCharacterEncryptionManager
