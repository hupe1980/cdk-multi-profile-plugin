import {readProfiles} from "../utils";
import {EnvironmentAwareGlobalProfileMapper, JsonFileProfileMapper} from "../profile-mapper";

// These tests sets ensure the necessary data sets for the following tests.
describe('Ensure testset', () => {
    describe('Profiles that must be configured in package.json', () => {
        let profiles: { [key: string]: string };
        beforeEach(() => {
            profiles = new JsonFileProfileMapper({
                workingDirectory: process.cwd(),
                filename: 'package.json'
            }).resolve();
        });

        it('should contain a mapping for account 123', () => {
            expect(profiles['123']).toBe('default123');
        });

        it('should contain a mapping for account 456', () => {
            expect(profiles['456']).toBe('default123');
        });

        it('should contain a mapping for account 435', () => {
            expect(profiles['435']).toBe('default435');
        });

        it('should contain a mapping for account 765', () => {
            expect(profiles['765']).toBe('default765');
        });
    });

    describe('Profiles that must be configured in cdkmultiprofileplugin.json', () => {
        let profiles: { [key: string]: string };
        beforeEach(() => {
            profiles = new JsonFileProfileMapper({
                workingDirectory: process.cwd(),
                filename: 'cdkmultiprofileplugin.json'
            }).resolve();
        });

        it('should contain a mapping for account 678', () => {
            expect(profiles['678']).toBe('project678');
        });

        it('should contain a mapping for account 345', () => {
            expect(profiles['345']).toBe('project345');
        });

        it('should contain a mapping for account 435', () => {
            expect(profiles['435']).toBe('project435');
        });

        it('should contain a mapping for account 765', () => {
            expect(profiles['765']).toBe('project765');
        });
    });

    describe('Profiles that must be configured in global configuration', () => {
        let profiles: { [key: string]: string };
        beforeEach(() => {
            profiles = new JsonFileProfileMapper({
                workingDirectory: `${process.cwd()}/src/__tests__/`,
                filename: 'global.plugin.config.json'
            }).resolve();
        });

        it('should contain a mapping for account 345', () => {
            expect(profiles['345']).toBe('global345');
        });

        it('should contain a mapping for account 765', () => {
            expect(profiles['765']).toBe('global765');
        });

        it('should contain a mapping for account 980', () => {
            expect(profiles['980']).toBe('global980');
        });

    });
});

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

    it('should override a mapping configured only in package.json', () => {
        expect(profiles['345']).toBe('global345')
    });
});

describe('When an invalid json file format is deteced', () => {
    it('should return an empty profile mapping when json file is not correctly formatted', () => {
        const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
        const profiles = new JsonFileProfileMapper({
            workingDirectory: process.cwd(),
            filename: 'README.md'
        }).resolve();
        expect(profiles).toEqual({});
        expect(consoleSpy).toBeCalledWith('Failed to parse file README.md: ', 'Unexpected token # in JSON at position 0');
        consoleSpy.mockRestore();
    });
});
