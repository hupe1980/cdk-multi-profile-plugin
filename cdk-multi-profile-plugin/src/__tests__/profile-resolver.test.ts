import {readProfiles} from "../utils";
import {JsonFileProfileMapper, PackageJsonProfileMapper} from "../profile-mapper";

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
        profiles = new PackageJsonProfileMapper().resolve();
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

describe('JSON mapping resolver', () => {
    let profiles: { [key: string]: string };
    beforeEach(() => {
        profiles = new JsonFileProfileMapper({
            workingDirectory: `${process.cwd()}/src/__tests__`,
            filename: 'resolver.samplesnippet.json'
        }).resolve();
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
