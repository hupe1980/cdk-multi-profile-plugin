# cdk-multi-profile-plugin

[![Build Status](https://travis-ci.org/hupe1980/cdk-multi-profile-plugin.svg?branch=master)](https://travis-ci.org/hupe1980/cdk-multi-profile-plugin)

> Adds multi profile/account and mfa support to cdk apps

## Installation

```bash
npm install cdk-multi-profile-plugin aws-sdk
```

## How to use

### Plugin configuration

There are two ways to tell cdk to use the plugin. The first way is to include an explicit --plugin option whenever you use a cdk command.

```bash
npx cdk deploy --plugin "cdk-multi-profile-plugin" *Stack
```

The second way is to add the following entry to the `cdk.json` file

```json
// cdk.json
{
  "app": "npx ts-node bin/YOURAPP.ts",
  "plugin": ["cdk-multi-profile-plugin"]
}
```

### Configure account mapping

Add the account / profile mapping in the `package.json`

```javascript
// package.json
{
    ...
    "devDependencies": {
        "aws-cdk": "^1.15.0",
        "cdk-multi-profile-plugin": "^0.0.1",
        ...
    }
    "awsProfiles": {
        "YOUR_ACCOUNT_ID": "YOUR_PROFILE",
        "YOUR_ACCOUNT_ID": "YOUR_PROFILE",
    }
}
```

Finally add the account number to the environment of your stack.

```typescript
new CdkStack(app, `Stack`, {
  env: {
    account: "1234number",
  },
});
```

## Precedence of account number to profile mapping

When working in a team every team member should be allowed to have an individual configuration of locally configured AWS profiles.
There also might be a need to override the mapping for an account within a build job.

The following order defines the precedence of your mapping:

1. Global configuration file `~/.cdkmultiprofileplugin.json` (can be overridden using the `CDK_MULTI_PROFILE_PLUGIN_CONFIG` environment variable)
2. Project local configuration file `<projectDir>/cdkmultiprofileplugin.json`
3. Project local `package.json`

The `<projectDir>/cdkmultiprofileplugin.json` can optionally be under version control.
This depends on your preference.

`package.json` approach works if you can ensure equal AWS profile names across all team members or build runners.

`package.json` based mapping is overrideable by using `<projectDir>/cdkmultiprofileplugin.json`.
The configuration file `<projectDir>/cdkmultiprofileplugin.json` can be ignored or put under version control.
This decision is dependant on your use case.
Either you also ensure equal AWS profile names for every team member and build runner.
In this case, it safely can be put under version control.
You can locally override your mapping if you choose to ignore it.

With the global configuration file you can override all of the approaches above.
The location of the global configuration file is `~/.cdkmultiprofileplugin.json`.
To customize the location of the configuration file use the environment variable `CDK_MULTI_PROFILE_PLUGIN_CONFIG`.

The configuration uses the following json based format.
The plugin will ignore unknown or additionals fields in the configuration.

```json
`{
    "awsProfiles": {
        "123": "default123",
        "456": "default123"
    }
}`
```

## Environment Variables

The plugin supports the following environment variables:

- `AWS_SHARED_CREDENTIALS_FILE` – Specifies the location of the file that the AWS CLI uses to store access keys. The default path is `~/.aws/credentials`).
- `IGNORE_CDK_MULTI_PROFILE_PLUGIN=true` - Turn off the plugin. Defaults to `false`.
- `CDK_MULTI_PROFILE_PLUGIN_CONFIG` - Specifies the localtion of the global account to profile mapping. Defaults to `~/.cdkmultiprofileplugin.json`

## License

[MIT](LICENSE)
