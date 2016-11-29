export default {
  'required': {
    validate: value => !!value,
    hint: 'Teste'
  },
  'length': {
    validate: (value, { max, min }) => {
      if (!value) return false;
      if (typeof min !== 'undefined' ) {
        if (value.length < min) {
          return 'insufficient'
        }
      }

      if (typeof max !== 'undefined' ) {
        if (value.length > max) {
          return 'exceed'
        }
      }
    },
    hint: (value, params, result) => {
      if (result === 'exceed') {
        return `Max length ${params.max}`
      } else {
        return `Min length ${params.min}`
      }
    }
  }
}
