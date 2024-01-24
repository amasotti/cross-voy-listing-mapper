

export class WikitextParser {

    cleanText(text: string): string {
        return this.handlePipedWikilinks(this.removeNewLinesAndSpaces(text));
    }

    removeNewLinesAndSpaces(text: string) {
        return text.replace(/(\r\n|\n|\r)/gm, "");
    }

    handlePipedWikilinks(text: string) {
        return text.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2');
    }

    extractTemplatesFromText(text: string): string[] {
        const templateStrings = [];
        const nestedTemplateStrings = [];
        let depth = 0;
        let startIndex = -1;

        text = this.cleanText(text);

        for (let i = 0; i < text.length; i++) {
            if (text.startsWith('{{', i)) {
                depth++;
                if (depth === 1) {
                    startIndex = i;
                }
                i++; // Skip next '{'
            } else if (text.startsWith('}}', i)) {
                if (depth === 1) {
                    const templateContent = text.substring(startIndex, i + 2);
                    templateStrings.push(templateContent);
                } else if (depth > 1) {
                    const nestedContent = text.substring(startIndex, i + 2);
                    nestedTemplateStrings.push(nestedContent);
                }
                depth--;
                i++; // Skip next '}'
            }
        }

        return this.removeNestedTemplates(templateStrings, nestedTemplateStrings);
    }


    /**
     * Removes nested templates from an array of template strings.
     * @param {string[]} templateStrings - The array of template strings to remove nested templates from.
     * @param {string[]} nestedTemplateStrings - The array of nested templates to remove from the template strings.
     * @return {string[]} - The array of template strings with nested templates removed.
     */
    private removeNestedTemplates(templateStrings: string[], nestedTemplateStrings: string[]): string[] {
        return templateStrings.map(templateString => {
            nestedTemplateStrings.forEach(nested => {
                templateString = templateString.replace(nested, '__NESTED_TEMPLATE__');
            });
            return templateString;
        });
    }

}