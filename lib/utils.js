"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const os = __importStar(require("os"));
const inquirer = __importStar(require("inquirer"));
exports.tokenCodeFn = async (mfaSerial, callback) => {
    try {
        const { token } = await inquirer.prompt({
            name: 'token',
            type: 'input',
            default: '',
            message: `MFA token for ${mfaSerial}:`
        });
        return callback(undefined, token);
    }
    catch (e) {
        console.error('error:', e);
        return callback(e, undefined);
    }
};
exports.readProfiles = () => {
    const cwd = process.cwd();
    const pkg = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json'), 'utf8'));
    const { awsProfiles } = pkg;
    return awsProfiles;
};
exports.getSharedCredentialsFilename = () => process.env.AWS_SHARED_CREDENTIALS_FILE ||
    path.join(os.homedir(), '.aws', 'credentials');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsNkNBQStCO0FBQy9CLDJDQUE2QjtBQUM3Qix1Q0FBeUI7QUFDekIsbURBQXFDO0FBRXhCLFFBQUEsV0FBVyxHQUFHLEtBQUssRUFDOUIsU0FBaUIsRUFDakIsUUFBK0MsRUFDaEMsRUFBRTtJQUNqQixJQUFJO1FBQ0YsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLE1BQU0sUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUN0QyxJQUFJLEVBQUUsT0FBTztZQUNiLElBQUksRUFBRSxPQUFPO1lBQ2IsT0FBTyxFQUFFLEVBQUU7WUFDWCxPQUFPLEVBQUUsaUJBQWlCLFNBQVMsR0FBRztTQUN2QyxDQUFDLENBQUM7UUFDSCxPQUFPLFFBQVEsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDbkM7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzNCLE9BQU8sUUFBUSxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztLQUMvQjtBQUNILENBQUMsQ0FBQztBQUVXLFFBQUEsWUFBWSxHQUFHLEdBQThCLEVBQUU7SUFDMUQsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzFCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQ3BCLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsY0FBYyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQ3hELENBQUM7SUFFRixNQUFNLEVBQUUsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFDO0lBRTVCLE9BQU8sV0FBVyxDQUFDO0FBQ3JCLENBQUMsQ0FBQztBQUVXLFFBQUEsNEJBQTRCLEdBQUcsR0FBVyxFQUFFLENBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCO0lBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgKiBhcyBvcyBmcm9tICdvcyc7XG5pbXBvcnQgKiBhcyBpbnF1aXJlciBmcm9tICdpbnF1aXJlcic7XG5cbmV4cG9ydCBjb25zdCB0b2tlbkNvZGVGbiA9IGFzeW5jIChcbiAgbWZhU2VyaWFsOiBzdHJpbmcsXG4gIGNhbGxiYWNrOiAoZXJyPzogRXJyb3IsIHRva2VuPzogc3RyaW5nKSA9PiB2b2lkXG4pOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IHRva2VuIH0gPSBhd2FpdCBpbnF1aXJlci5wcm9tcHQoe1xuICAgICAgbmFtZTogJ3Rva2VuJyxcbiAgICAgIHR5cGU6ICdpbnB1dCcsXG4gICAgICBkZWZhdWx0OiAnJyxcbiAgICAgIG1lc3NhZ2U6IGBNRkEgdG9rZW4gZm9yICR7bWZhU2VyaWFsfTpgXG4gICAgfSk7XG4gICAgcmV0dXJuIGNhbGxiYWNrKHVuZGVmaW5lZCwgdG9rZW4pO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5lcnJvcignZXJyb3I6JywgZSk7XG4gICAgcmV0dXJuIGNhbGxiYWNrKGUsIHVuZGVmaW5lZCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCByZWFkUHJvZmlsZXMgPSAoKTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9PiB7XG4gIGNvbnN0IGN3ZCA9IHByb2Nlc3MuY3dkKCk7XG4gIGNvbnN0IHBrZyA9IEpTT04ucGFyc2UoXG4gICAgZnMucmVhZEZpbGVTeW5jKHBhdGguam9pbihjd2QsICdwYWNrYWdlLmpzb24nKSwgJ3V0ZjgnKVxuICApO1xuXG4gIGNvbnN0IHsgYXdzUHJvZmlsZXMgfSA9IHBrZztcblxuICByZXR1cm4gYXdzUHJvZmlsZXM7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0U2hhcmVkQ3JlZGVudGlhbHNGaWxlbmFtZSA9ICgpOiBzdHJpbmcgPT5cbiAgcHJvY2Vzcy5lbnYuQVdTX1NIQVJFRF9DUkVERU5USUFMU19GSUxFIHx8XG4gIHBhdGguam9pbihvcy5ob21lZGlyKCksICcuYXdzJywgJ2NyZWRlbnRpYWxzJyk7XG4iXX0=