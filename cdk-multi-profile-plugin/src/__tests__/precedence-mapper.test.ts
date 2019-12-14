import {readProfiles} from "../utils";
import {EnvironmentAwareGlobalProfileMapper} from "../profile-mapper";

describe('Should resolve profile name from package.json', () => {
    let profiles: { [key: string]: string };
    beforeEach(() => {
        profiles = readProfiles();
    });

    it('should map account 123 to profile default123', () => {
        expect(profiles['123']).toBe('default123');
    });

    it('should map account 456 to profile default456', () => {
        expect(profiles['456']).toBe('default123');
    });
});

describe('Project local cdkmultiprofileplugin.json', () => {
    let profiles: { [key: string]: string };
    beforeEach(() => {
        profiles = readProfiles();
    });

    it('should still map account 123 to profile default123', () => {
        expect(profiles['123']).toBe('default123');
    });

    it('should still map account 456 to profile default123', () => {
        expect(profiles['456']).toBe('default123');
    });

    it('should map account 678 to profile default678', () => {
        expect(profiles['678']).toBe('project678')
    });
    it('cdkmultiprofileplugin.json should have precedence over package.json', () => {
        expect(profiles['435']).toBe('project435');
    });
});

describe('Global configuration', () => {
    let profiles: { [key: string]: string };
    beforeEach(() => {
        process.env[EnvironmentAwareGlobalProfileMapper.environmentVariableName] = `${process.cwd()}/src/__tests__/global.plugin.config.json`;
        profiles = readProfiles();
    });
    it('should map account number 980 to profile global980', () => {
        expect(profiles['980']).toBe('global980');
    });

    it('should have precedence for accountnumber 765 mapped in package.json or project local cdkmultiprofileplugin.json', () => {
        expect(profiles['765']).toBe('global765');
    });

    it('should be undefined if account is not mapped in global, project or package.json scope', () => {
        expect(profiles['999']).toBeUndefined();
    });
});
