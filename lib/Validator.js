import { forEach } from './utils/object-utils';
import has from 'has';
import defaultValidators from './defaultValidators';

class Validator {

  validate (value, rules, validators=defaultValidators, { returnFirstError, data }) {
    const errors = []

    forEach(rules, rule => {
      let ruleName = rule ? rule.rule || rule : rule;
      let validator;

      if (!has(validators, ruleName)) {
        if (typeof rule === 'object') {
          if (!rule.name) {
            console.warn(`Validator: Missing rule name.`)
            return
          }
          ruleName = rule.name
          validator = rule
        } else {
          console.warn(`Validator: '${ruleName}' does not exist.`)
          return
        }
      } else {
        validator = validators[ruleName]
      }

      if (!has(validator, 'validate')) {
        console.warn(`Validator: Missing 'validate' in '${ruleName}'.`);
        return;
      }

      const params = {...rule, ...data}
      let result;

      if (validator.validate instanceof RegExp) {
        result = validator.validator.test(value)
      } else {
        result = validator.validate(
          value,
          typeof rule === 'string' ? undefined : params
        )
      }

      if (result !== undefined && result !== true) {
        const resultObject = {}
        forEach(validator, (value, key) => {
          if (key !== 'validate') {
            if (typeof value === 'function') {
              resultObject[key] = value(value, params, result)
            } else {
              resultObject[key] = value
            }
          }
        })
        resultObject.name = ruleName;
        errors.push(resultObject)

        return !returnFirstError
      }
    })

    if (returnFirstError) {
      return errors.length ? errors[0] : null
    }

    return errors
  }
}

export default new Validator();

