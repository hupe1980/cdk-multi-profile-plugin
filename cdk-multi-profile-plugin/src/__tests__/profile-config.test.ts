import * as path from 'path';
import { ProfileConfig } from '../profile-config';

it('should return foo profile', () => {
  const config = new ProfileConfig(path.join(__dirname, 'aws.config'));

  const foo = config.getProfile('foo');

  expect(foo).toEqual({
    region: 'eu-central-1',
    output: 'text',
  });
});
