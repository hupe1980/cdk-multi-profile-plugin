#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { ExampleStack } from '../lib/example-stack';

const app = new App();

new ExampleStack(app, 'ExampleStack1', { env: {
    region: 'eu-central-1',
    account: '123'
}});

new ExampleStack(app, 'ExampleStack2', {
  env: {
    region: 'eu-central-1',
    account: '456'
  }
});
