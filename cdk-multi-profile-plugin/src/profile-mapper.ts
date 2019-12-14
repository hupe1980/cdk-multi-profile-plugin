import * as fs from "fs-extra";
import * as path from "path";
import * as os from "os";

/**
 * Creates a mapping from accountnumber to a local aws profile
 */
export interface ProfileMapper {
    resolve(): { [key: string]: string };
}

interface JsonFileProfileMapperProps {
    workingDirectory: string;
    filename: string;
}

/*
 * Resolves profiles from a json file. The key for resolving a mapping is "awsProfiles".
 *
 * example:
 *  `{
 *      "awsProfiles": {
 *        "123": "default123",
 *        "456": "default123"
 *      }
 *  }`
 *
 */
export class JsonFileProfileMapper implements ProfileMapper {
    private _encoding = 'utf8';
    private workingDirectory: string;
    private filename: string;

    constructor(props: JsonFileProfileMapperProps) {
        this.workingDirectory = props.workingDirectory;
        this.filename = props.filename;
    }

    resolve(): { [key: string]: string } {
        const pkg = JSON.parse(
            fs.readFileSync(path.join(this.workingDirectory, this.filename), this._encoding)
        );
        const {awsProfiles} = pkg;
        return awsProfiles;
    }

}

// Will use local package.json for mapping an accountnumber to a local profile
export class PackageJsonProfileMapper implements ProfileMapper {
    resolve(): { [key: string]: string } {
        return new JsonFileProfileMapper({
                workingDirectory: process.cwd(),
                filename: 'package.json'
            }
        ).resolve();
    }
}

// TODO:
// Will default to ~/.cdkmultiprofileplung.json and can be overriden by environment variable
// CDK_MULTI_PROFILE_PLUGIN_CONFIG=/path/to/file.json
export class EnvironmentAwareGlobalProfileMapper implements ProfileMapper {
    resolve(): { [p: string]: string } {
        return new JsonFileProfileMapper({
                workingDirectory: os.homedir(),
                filename: '.cdkmultiprofileplung.json'
            }
        ).resolve();
    }
}

// Can be used in local project directory. Can be added or ignored by your VCS
export class LocalProjectDirMapper implements ProfileMapper {
    resolve(): { [p: string]: string } {
        return new JsonFileProfileMapper({
                workingDirectory: process.cwd(),
                filename: 'cdkmultiprofileplugin.json'
            }
        ).resolve();
    }
}

// Will be used for resolving mapping information and applying precedence
export class PrecedenceProfileMapper implements ProfileMapper {
    resolve(): { [p: string]: string } {
        // Temporary in order to get it working again
        return new PackageJsonProfileMapper().resolve();
    }
}
