import { MultiProfilePlugin } from './multi-profile-plugin';
import { readProfiles, getSharedCredentialsFilename } from './utils';

const profiles = readProfiles();
const filename = getSharedCredentialsFilename();

export = new MultiProfilePlugin(profiles, filename);
