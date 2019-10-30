# cdk-multi-profile-plugin
> Adds multi profile/account and mfa support to cdk apps

:warning: This is experimental and subject to breaking changes.

## Installation

```bash
npm install cdk-multi-profile-plugin
```

## How to use

There are two ways to tell cdk to use the plugin. The first way is to include an explicit --plugin option whenever you use a cdk command.

```bash
npx cdk deploy --plugin "cdk-multi-profile-plugin" *Stack
```

The second way is to add the following entry to the cdk.json file

```javascript
// cdk.json
{
  "app": "npx ts-node bin/YOURAPP.ts",
  "plugin": ["cdk-multi-profile-plugin"]
}
```
Add the account / profile mapping in the package.json 

```javascript
// package.json
{
    ...
    "devDependencies": {
        "aws-cdk": "^1.15.0",
        "cdk-multi-profile-plugin": "^1.0.0",
        ...
    }
    "awsProfiles": {
        "YOUR_ACCOUNT_ID": "YOUR_PROFILE",
        "YOUR_ACCOUNT_ID": "YOUR_PROFILE",
    }
}
```

## Environment Variables
The plugin supports the following  environment variables:
- AWS_SHARED_CREDENTIALS_FILE – Specifies the location of the file that the AWS CLI uses to store access keys. The default path is ~/.aws/credentials).



## License

[MIT](LICENSE)
