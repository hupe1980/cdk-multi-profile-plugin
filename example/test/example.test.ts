import { App } from '@aws-cdk/core';
import { ExampleStack } from '../lib/example-stack';
import 'jest-cdk-snapshot';

test('default setup', () => {
  const app = new App();
  // WHEN
  const stack = new ExampleStack(app, 'ExampleStack');
  // THEN
  expect(stack).toMatchCdkSnapshot({ yaml: true });
});