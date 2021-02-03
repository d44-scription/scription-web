class Helper {
  // In some use cases the singular of the `type` prop (ie "item" instead of "items") is needed
  // This removes the last character from and capitalises the string. While not perfect, it works
  // for the available notable types.
  singular(type) {
    return `${type.charAt(0).toUpperCase()}${type.slice(1, -1)}`;
  }
}

export default new Helper();
