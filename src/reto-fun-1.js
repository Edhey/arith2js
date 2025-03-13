Function.prototype.add = (...x) => {
  try {
    return this(...x)+(other(...x))
  } catch (e) {
    throw new Error(`Unsupported "+" for ${typeof other}`)
  }
}