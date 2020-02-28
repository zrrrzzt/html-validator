const button = {
  button: {
    inherit: 'button',
    requiredAttributes: []
  }
}

module.exports = {
  elements: ['html5', button],
  rules: {
    'attribute-allowed-values': 'error',
    'close-attr': 'error',
    'close-order': 'error',
    deprecated: 'error',
    'deprecated-rule': 'error',
    'doctype-html': 'error',
    'element-name': 'error',
    'element-permitted-content': 'error',
    'element-permitted-occurrences': 'error',
    'element-permitted-order': 'error',
    'element-required-attributes': 'error',
    'element-required-content': 'error',
    'heading-level': 'error',
    'missing-doctype': 'error',
    'no-conditional-comment': 'error',
    'no-deprecated-attr': 'error',
    'no-dup-attr': 'error',
    'no-dup-id': 'error',
    'no-missing-references': 'error',
    'no-raw-characters': ['error', { relaxed: true }],
    'no-redundant-role': 'error',
    'no-unknown-elements': 'error',
    'script-element': 'error',
    'unrecognized-char-ref': 'error',
    'void-content': 'error',
    'wcag/h37': 'error'
  }
}
