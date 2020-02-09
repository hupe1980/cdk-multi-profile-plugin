import { AssumeRolePlugin } from './assume-role-plugin';
import { readProfiles, getSharedCredentialsFilename } from './utils';

const { userProfile = 'default', roles = {} } = readProfiles();
const filename = getSharedCredentialsFilename();

module.exports = new AssumeRolePlugin(userProfile, roles, filename);
