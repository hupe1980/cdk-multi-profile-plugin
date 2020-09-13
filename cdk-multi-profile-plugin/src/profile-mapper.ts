import * as fs from 'fs-extra';
import * as path from 'path';
import * as os from 'os';

/**
 * Creates a mapping from accountnumber to a local aws profile
 */
export interface ProfileMapper {
  resolve(): { [key: string]: string };
}

export interface JsonFileProfileMapperProps {
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
  private readonly _workingDirectory: string;
  private readonly _filename: string;
  private _encoding = 'utf8';

  constructor(props: JsonFileProfileMapperProps) {
    this._workingDirectory = props.workingDirectory;
    this._filename = props.filename;
  }

  resolve(): { [key: string]: string } {
    const filename = path.join(this._workingDirectory, this._filename);
    if (!fs.existsSync(filename)) {
      return {};
    }
    try {
      const pkg = JSON.parse(fs.readFileSync(filename, this._encoding));
      const { awsProfiles } = pkg;
      return awsProfiles;
    } catch (e) {
      console.log(`Failed to parse file ${this._filename}: `, e.message);
    }
    return {};
  }
}

// Will use local package.json for mapping an accountnumber to a local profile
export class PackageJsonProfileMapper implements ProfileMapper {
  resolve(): { [key: string]: string } {
    return new JsonFileProfileMapper({
      workingDirectory: process.cwd(),
      filename: 'package.json',
    }).resolve();
  }
}

// Will default to ~/.cdkmultiprofileplung.json and can be overriden by environment variable
// CDK_MULTI_PROFILE_PLUGIN_CONFIG=/path/to/file.json
export class EnvironmentAwareGlobalProfileMapper implements ProfileMapper {
  public static readonly environmentVariableName =
    'CDK_MULTI_PROFILE_PLUGIN_CONFIG';
  private readonly _defaultGlobalConfigurationFile =
    '.cdkmultiprofileplugin.json';
  private readonly _workingDirectory: string;
  private readonly _filename: string;

  constructor() {
    this._workingDirectory = os.homedir();
    this._filename = this._defaultGlobalConfigurationFile;
    const configFileLocationOverride =
      process.env[EnvironmentAwareGlobalProfileMapper.environmentVariableName];
    if (configFileLocationOverride) {
      const configFile = path.parse(configFileLocationOverride);
      this._workingDirectory = configFile.dir;
      this._filename = configFile.base;
    }
  }

  resolve(): { [p: string]: string } {
    return new JsonFileProfileMapper({
      workingDirectory: this._workingDirectory,
      filename: this._filename,
    }).resolve();
  }
}

// Can be used in local project directory. Can be added or ignored by your VCS
export class LocalProjectDirMapper implements ProfileMapper {
  resolve(): { [p: string]: string } {
    return new JsonFileProfileMapper({
      workingDirectory: process.cwd(),
      filename: 'cdkmultiprofileplugin.json',
    }).resolve();
  }
}

// Uses all mappers and applies precedence
export class PrecedenceProfileMapper implements ProfileMapper {
  resolve(): { [p: string]: string } {
    // Temporary in order to get it working again
    const packageJsonMappings = new PackageJsonProfileMapper().resolve();
    const projectLocalMappings = new LocalProjectDirMapper().resolve();
    const globalMappings = new EnvironmentAwareGlobalProfileMapper().resolve();
    return {
      ...packageJsonMappings,
      ...projectLocalMappings,
      ...globalMappings,
    };
  }
}
