import has from 'has';

export function forEach(obj, fn) {
  if (Array.isArray(obj)) {
      let i = 0;
      let len = obj.length;

      for (; i < len; i++) {
        if(fn(obj[i], i) === false) {
          break;
        }
      }
  } else {
    let i = 0;
    for (let key in obj) {
      if(has(obj, key)) {
        i++;
        if (fn(obj[key], key, i) === false) {
          break;
        }
      }
    }
  }
}
