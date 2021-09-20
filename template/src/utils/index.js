export const computedScroll = (columns = [], x = 300, y) => {
  const scroll = {
    x:
      columns
        .filter((i) => i.width)
        .map((i) => i.width)
        .reduce((acc, cur) => acc + cur, 0) + x,
    y
  }
  return scroll
}
export const getFormValue = (keys, data) => {
  const values = {}
  keys.forEach((key) => {
    if (Array.isArray(key)) {
      const [k, cb] = key
      values[k] = cb(data)
    } else {
      values[key] = data[key]
    }
  })
  return values
}
export const isFn = (f) => typeof f === 'function'

export const replaceDateField = (data, fields, type = 'YYYY-MM-DD') => {
  if (!Array.isArray(fields) || !data || !Object.keys(data).length) return data
  const params = {}
  const originFields = fields.map((item) => item[0])
  Object.entries(data).forEach(([key, value]) => {
    const index = originFields.indexOf(key)
    if (index >= 0) {
      const replaceFields = fields[index][1]
      replaceFields.forEach((rKey, rIndex) => {
        params[rKey] = value[rIndex].clone().format(type)
      })
    } else {
      params[key] = value
    }
  })
  return params
}
