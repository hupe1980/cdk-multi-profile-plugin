import { MultiProfilePlugin} from './multi-profile-plugin';
import { readProfiles, getSharedCredentialsFilename } from './utils';

const profiles = readProfiles();
const filename = getSharedCredentialsFilename();

module.exports = new MultiProfilePlugin(profiles, filename);
