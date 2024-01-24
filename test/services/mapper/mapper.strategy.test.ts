import {chooseMapper} from "../../../src/services/mapper/mapper.strategy";
import {SUPPORTED_LANGUAGES} from "../../../src/constants/languages";
import {EnglishMapper} from "../../../src/services/mapper/EnglishMapper";


describe('chooseMapper', () => {
    it('should return an EnglishMapper instance for SUPPORTED_LANGUAGES.EN', () => {
        const mapper = chooseMapper(SUPPORTED_LANGUAGES.EN);
        expect(mapper).toBeInstanceOf(EnglishMapper);
    });

    it('should throw an error for unsupported languages', () => {
        const unsupportedLanguage = 'KK' as SUPPORTED_LANGUAGES;
        expect(() => chooseMapper(unsupportedLanguage)).toThrow(`No mapper for language ${unsupportedLanguage}`);
    });

    it('should throw an error for null input', () => {
        expect(() => chooseMapper(null)).toThrow('No mapper for language null');
    });

    it('should throw an error for undefined input', () => {
        expect(() => chooseMapper(undefined)).toThrow('No mapper for language undefined');
    });
});