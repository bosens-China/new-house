const mjsResolver = (path, options) => {
  const mjsExtRegex = /\.m?js$/i;
  const resolver = options.defaultResolver;
  if (mjsExtRegex.test(path)) {
    try {
      return resolver(path.replace(mjsExtRegex, /\.mjs$/i.test(path) ? '.mts' : '.ts'), options);
    } catch {
      // use default resolver
    }
  }

  return resolver(path, options);
};

module.exports = mjsResolver;
