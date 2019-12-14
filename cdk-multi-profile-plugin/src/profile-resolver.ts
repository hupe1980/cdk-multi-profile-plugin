import * as fs from "fs-extra";
import * as path from "path";

export class PackageJsonProfileResolver {
    resolve(): { [key: string]: string } {
        const cwd = process.cwd();
        const pkg = JSON.parse(
            fs.readFileSync(path.join(cwd, 'package.json'), 'utf8')
        );

        const { awsProfiles } = pkg;

        return awsProfiles;
    }
}
