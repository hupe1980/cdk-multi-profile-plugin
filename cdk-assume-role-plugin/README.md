# cdk-assume-role-plugin

[![Build Status](https://travis-ci.org/hupe1980/cdk-multi-profile-plugin.svg?branch=master)](https://travis-ci.org/hupe1980/cdk-multi-profile-plugin)

> Adds assume role and mfa support to cdk apps

:warning: This is experimental and subject to breaking changes.

## Installation

```bash
npm install cdk-assume-role-plugin
```

## How to use

There are two ways to tell cdk to use the plugin. The first way is to include an explicit --plugin option whenever you use a cdk command.

```bash
npx cdk deploy --plugin "cdk-assume-role-plugin" *Stack
```

The second way is to add the following entry to the cdk.json file

```javascript
// cdk.json
{
  "app": "npx ts-node bin/YOURAPP.ts",
  "plugin": ["cdk-assume-role-plugin"]
}
```

Finally, add the account / profile mapping in the package.json

```javascript
// package.json
{
    ...
    "devDependencies": {
        "aws-cdk": "^1.15.0",
        "cdk-assume-role-plugin": "^0.0.1",
        ...
    },
    ...
    "cdkAssumeRolePlugin": {
      "userProfile": "idp",
      "roles": {
        "YOUR_ACCOUNT_ID": "YOUR_ROLE_NAME",
        "YOUR_ACCOUNT_ID": "YOUR_ROLE_NAME"
      }
    }
}
```

## Environment Variables

The plugin supports the following environment variables:

- `AWS_SHARED_CREDENTIALS_FILE` – Specifies the location of the file that the AWS CLI uses to store access keys. The default path is `~/.aws/credentials`).
- `IGNORE_CDK_ASSUME_ROLE_PLUGIN=true` - Turn off the plugin. Defaults to `false`.
- `CDK_ASSUME_ROLE_PLUGIN_CONFIG` - Specifies the localtion of the global plugin config. Defaults to `~/.cdkassumeroleplugin.json`

## License

[MIT](LICENSE)
