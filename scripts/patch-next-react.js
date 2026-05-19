const fs = require('fs');
const path = require('path');

const targetVersions = [
  '19.2.0-canary-0bdb9206-20250818',
  '19.2.0-experimental-0bdb9206-20250818'
];

const files = [
  // react canary
  {
    path: 'node_modules/next/dist/compiled/react/cjs/react.development.js',
    version: '19.2.0-canary-0bdb9206-20250818',
    implementation: `exports.useEffectEvent = function (fn) {
      var ref = resolveDispatcher().useRef(fn);
      resolveDispatcher().useInsertionEffect(function () {
        ref.current = fn;
      }, [fn]);
      return resolveDispatcher().useCallback(function () {
        return ref.current.apply(null, arguments);
      }, []);
    };`
  },
  {
    path: 'node_modules/next/dist/compiled/react/cjs/react.production.js',
    version: '19.2.0-canary-0bdb9206-20250818',
    implementation: `exports.useEffectEvent = function (fn) {
      var ref = ReactSharedInternals.H.useRef(fn);
      ReactSharedInternals.H.useInsertionEffect(function () {
        ref.current = fn;
      }, [fn]);
      return ReactSharedInternals.H.useCallback(function () {
        return ref.current.apply(null, arguments);
      }, []);
    };`
  },
  {
    path: 'node_modules/next/dist/compiled/react/cjs/react.react-server.development.js',
    version: '19.2.0-canary-0bdb9206-20250818',
    implementation: `exports.useEffectEvent = function (fn) {
      return fn;
    };`
  },
  {
    path: 'node_modules/next/dist/compiled/react/cjs/react.react-server.production.js',
    version: '19.2.0-canary-0bdb9206-20250818',
    implementation: `exports.useEffectEvent = function (fn) {
      return fn;
    };`
  },

  // react experimental
  {
    path: 'node_modules/next/dist/compiled/react-experimental/cjs/react.development.js',
    version: '19.2.0-experimental-0bdb9206-20250818',
    implementation: `exports.useEffectEvent = function (fn) {
      var ref = resolveDispatcher().useRef(fn);
      resolveDispatcher().useInsertionEffect(function () {
        ref.current = fn;
      }, [fn]);
      return resolveDispatcher().useCallback(function () {
        return ref.current.apply(null, arguments);
      }, []);
    };`
  },
  {
    path: 'node_modules/next/dist/compiled/react-experimental/cjs/react.production.js',
    version: '19.2.0-experimental-0bdb9206-20250818',
    implementation: `exports.useEffectEvent = function (fn) {
      var ref = ReactSharedInternals.H.useRef(fn);
      ReactSharedInternals.H.useInsertionEffect(function () {
        ref.current = fn;
      }, [fn]);
      return ReactSharedInternals.H.useCallback(function () {
        return ref.current.apply(null, arguments);
      }, []);
    };`
  },
  {
    path: 'node_modules/next/dist/compiled/react-experimental/cjs/react.react-server.development.js',
    version: '19.2.0-experimental-0bdb9206-20250818',
    implementation: `exports.useEffectEvent = function (fn) {
      return fn;
    };`
  },
  {
    path: 'node_modules/next/dist/compiled/react-experimental/cjs/react.react-server.production.js',
    version: '19.2.0-experimental-0bdb9206-20250818',
    implementation: `exports.useEffectEvent = function (fn) {
      return fn;
    };`
  }
];

files.forEach(file => {
  const fullPath = path.resolve(process.cwd(), file.path);
  if (!fs.existsSync(fullPath)) {
    console.log(`File not found, skipping: ${file.path}`);
    return;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  if (content.includes('exports.useEffectEvent =') && !content.includes('experimental_useEffectEvent')) {
    console.log(`File already patched: ${file.path}`);
    return;
  }

  // To be safe, if we have exports.useEffectEvent, but need to make sure we're not double-patching:
  // Let's do a strict search for target string.
  const targetStr = `exports.version = "${file.version}";`;
  if (!content.includes(targetStr)) {
    console.warn(`Target version string not found in ${file.path}`);
    return;
  }

  // Only patch if we haven't defined useEffectEvent in this file yet (experimental_useEffectEvent is fine)
  // Let's check with a regex or exact string.
  // In react-experimental, the original file has `exports.experimental_useEffectEvent =` but NOT `exports.useEffectEvent =`
  // Wait, if it has `exports.useEffectEvent =` already (e.g. from a previous patch), don't re-patch.
  // Note: we can use a regex to look for exports.useEffectEvent (not preceded by experimental_)
  const hasUseEffectEvent = /(?<!experimental_)exports\.useEffectEvent\s*=/.test(content);
  if (hasUseEffectEvent) {
    console.log(`useEffectEvent already exists in ${file.path}`);
    return;
  }

  const patchedContent = content.replace(targetStr, `${file.implementation}\n    ${targetStr}`);
  fs.writeFileSync(fullPath, patchedContent, 'utf8');
  console.log(`Successfully patched: ${file.path}`);
});
