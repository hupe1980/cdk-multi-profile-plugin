import {readProfiles} from "../utils";
import {PackageJsonProfileResolver} from "../profile-resolver";

describe('ensure readProfiles backward compability', () => {
    let profiles: { [key: string]: string };
    beforeEach(() => {
        profiles = readProfiles();
    });
    it('should detect two profiles', async () => {
        expect(Object.keys(profiles).length).toBe(2);
    });

    it('account 123 should point to profile default123', () => {
        expect(profiles['123']).toBe('default123');
    });

    it('account 456 should point to profile default123', () => {
        expect(profiles['456']).toBe('default123');
    });

});

describe('package.json resolver', () => {
    let profiles: { [key: string]: string };
    beforeEach(() => {
        profiles = new PackageJsonProfileResolver().resolve();
    });
    it('should detect two profiles', async () => {
        expect(Object.keys(profiles).length).toBe(2);
    });

    it('account 123 should point to profile default123', () => {
        expect(profiles['123']).toBe('default123');
    });

    it('account 456 should point to profile default123', () => {
        expect(profiles['456']).toBe('default123');
    });
});
