'use strict';

/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'error',
      from: {},
      to: { circular: true },
    },
    {
      name: 'no-test-from-prod',
      severity: 'error',
      from: {
        pathNot:
          '(\\.(test|spec)\\.|/(__tests__|testkit|fixtures?|tests?)/|pkgs/[^/]+/src/(simulator|testkit)\\.ts)',
      },
      to: {
        path: '(\\.(test|spec)\\.|/(__tests__|testkit|fixtures?|tests?)/)',
        pathNot: 'smoke-tests',
      },
    },
    {
      name: 'shared-pure',
      severity: 'error',
      from: { path: '/src/shared/' },
      to: { path: '/src/(client|server)/' },
    },
    {
      name: 'client-not-server',
      severity: 'error',
      from: { path: '/src/client/' },
      to: { path: '/src/server/' },
    },
    {
      name: 'server-not-client',
      severity: 'error',
      from: { path: '/src/server/' },
      to: { path: '/src/client/' },
    },
    {
      name: 'no-non-package-json',
      severity: 'error',
      from: {},
      to: { dependencyTypes: ['npm-no-pkg', 'npm-unknown'] },
    },
    {
      name: 'not-to-dev-dep-from-src',
      severity: 'error',
      from: {
        path: '^pkgs/[^/]+/src/',
        pathNot: '\\.(test|spec|example)\\.',
      },
      to: { dependencyTypes: ['npm-dev'] },
    },
  ],
  options: {
    doNotFollow: {
      path: 'node_modules',
      dependencyTypes: ['npm', 'npm-dev', 'npm-optional', 'npm-peer'],
    },
    exclude: '(^|/)(\\.wrangler|\\.turbo|\\.expo|dist|build|coverage)/',
    tsPreCompilationDeps: true,
    includeOnly: '^pkgs/',
  },
};
