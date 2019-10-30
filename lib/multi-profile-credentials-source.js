"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const safe_1 = require("colors/safe");
const lodash_isempty_1 = __importDefault(require("lodash.isempty"));
const aws_sdk_1 = require("aws-sdk");
const aws_cdk_1 = require("aws-cdk");
const utils_1 = require("./utils");
class MultiProfileCredentialsSource {
    constructor(name, profiles, filename) {
        this.name = name;
        this.profiles = profiles;
        this.filename = filename;
    }
    canProvideCredentials(accountId) {
        return Promise.resolve(Object.prototype.hasOwnProperty.call(this.profiles, accountId));
    }
    getProvider(accountId, mode) {
        const profile = this.profiles[accountId];
        console.log('\n');
        console.log(` 🚀  Using profile ${safe_1.green(profile)} for account ${safe_1.green(accountId)} in mode ${safe_1.green(aws_cdk_1.Mode[mode])}`);
        console.log('\n');
        const credentials = new aws_sdk_1.SharedIniFileCredentials({
            tokenCodeFn: utils_1.tokenCodeFn,
            filename: this.filename,
            profile
        });
        return Promise.resolve(credentials);
    }
    isAvailable() {
        if (this.filename && !lodash_isempty_1.default(this.profiles))
            return Promise.resolve(true);
        return Promise.resolve(false);
    }
}
exports.MultiProfileCredentialsSource = MultiProfileCredentialsSource;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktcHJvZmlsZS1jcmVkZW50aWFscy1zb3VyY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbXVsdGktcHJvZmlsZS1jcmVkZW50aWFscy1zb3VyY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzQ0FBb0M7QUFDcEMsb0VBQXFDO0FBQ3JDLHFDQUFnRTtBQUNoRSxxQ0FBeUQ7QUFFekQsbUNBQXNDO0FBRXRDLE1BQWEsNkJBQTZCO0lBQ3hDLFlBQ2tCLElBQVksRUFDWCxRQUFtQyxFQUNuQyxRQUFnQjtRQUZqQixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1gsYUFBUSxHQUFSLFFBQVEsQ0FBMkI7UUFDbkMsYUFBUSxHQUFSLFFBQVEsQ0FBUTtJQUNoQyxDQUFDO0lBRUcscUJBQXFCLENBQUMsU0FBaUI7UUFDNUMsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDekYsQ0FBQztJQUVNLFdBQVcsQ0FBQyxTQUFpQixFQUFFLElBQVU7UUFDOUMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQ1Qsc0JBQXNCLFlBQUssQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLFlBQUssQ0FDdkQsU0FBUyxDQUNWLFlBQVksWUFBSyxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQ2pDLENBQUM7UUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxCLE1BQU0sV0FBVyxHQUFHLElBQUksa0NBQXdCLENBQUM7WUFDL0MsV0FBVyxFQUFYLG1CQUFXO1lBQ1gsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLE9BQU87U0FDUixDQUFDLENBQUM7UUFFSCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVNLFdBQVc7UUFDaEIsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsd0JBQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQUUsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTNFLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDO0NBQ0Y7QUFuQ0Qsc0VBbUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ3JlZW4gfSBmcm9tICdjb2xvcnMvc2FmZSc7XG5pbXBvcnQgaXNFbXB0eSBmcm9tICdsb2Rhc2guaXNlbXB0eSc7XG5pbXBvcnQgeyBTaGFyZWRJbmlGaWxlQ3JlZGVudGlhbHMsIENyZWRlbnRpYWxzIH0gZnJvbSAnYXdzLXNkayc7XG5pbXBvcnQgeyBDcmVkZW50aWFsUHJvdmlkZXJTb3VyY2UsIE1vZGUgfSBmcm9tICdhd3MtY2RrJztcblxuaW1wb3J0IHsgdG9rZW5Db2RlRm4gfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGNsYXNzIE11bHRpUHJvZmlsZUNyZWRlbnRpYWxzU291cmNlIGltcGxlbWVudHMgQ3JlZGVudGlhbFByb3ZpZGVyU291cmNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIHJlYWRvbmx5IG5hbWU6IHN0cmluZyxcbiAgICBwcml2YXRlIHJlYWRvbmx5IHByb2ZpbGVzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9LFxuICAgIHByaXZhdGUgcmVhZG9ubHkgZmlsZW5hbWU6IHN0cmluZ1xuICApIHt9XG5cbiAgcHVibGljIGNhblByb3ZpZGVDcmVkZW50aWFscyhhY2NvdW50SWQ6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMucHJvZmlsZXMsIGFjY291bnRJZCkpO1xuICB9XG5cbiAgcHVibGljIGdldFByb3ZpZGVyKGFjY291bnRJZDogc3RyaW5nLCBtb2RlOiBNb2RlKTogUHJvbWlzZTxDcmVkZW50aWFscz4ge1xuICAgIGNvbnN0IHByb2ZpbGUgPSB0aGlzLnByb2ZpbGVzW2FjY291bnRJZF07XG4gICAgY29uc29sZS5sb2coJ1xcbicpO1xuICAgIGNvbnNvbGUubG9nKFxuICAgICAgYCDwn5qAICBVc2luZyBwcm9maWxlICR7Z3JlZW4ocHJvZmlsZSl9IGZvciBhY2NvdW50ICR7Z3JlZW4oXG4gICAgICAgIGFjY291bnRJZFxuICAgICAgKX0gaW4gbW9kZSAke2dyZWVuKE1vZGVbbW9kZV0pfWBcbiAgICApO1xuICAgIGNvbnNvbGUubG9nKCdcXG4nKTtcblxuICAgIGNvbnN0IGNyZWRlbnRpYWxzID0gbmV3IFNoYXJlZEluaUZpbGVDcmVkZW50aWFscyh7XG4gICAgICB0b2tlbkNvZGVGbixcbiAgICAgIGZpbGVuYW1lOiB0aGlzLmZpbGVuYW1lLFxuICAgICAgcHJvZmlsZVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjcmVkZW50aWFscyk7XG4gIH1cblxuICBwdWJsaWMgaXNBdmFpbGFibGUoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgaWYgKHRoaXMuZmlsZW5hbWUgJiYgIWlzRW1wdHkodGhpcy5wcm9maWxlcykpIHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKTtcbiAgfVxufVxuIl19