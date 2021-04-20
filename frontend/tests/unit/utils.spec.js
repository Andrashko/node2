import {truncTitle} from "../../src/utils";

describe("unti tests for utils", ()=>{
    it("should be the same title when len > title.length", ()=>{
        // Arrange - підготовка оточення
        const title = "Test title";
        const len = 20;
        
        // Act - Виклик функції що тестується
        const trunc = truncTitle(title, len);

         //Assert - твердження яке тестується
        expect(trunc).toEqual(title);
    });

    it("should be '<first letter>...' when len == 1", ()=>{
        const title = "Test title";
        const len = 1;

        const trunc = truncTitle(title, len);

        expect(trunc).toEqual(`${title[0]}...`);
    });

    it("should be 'No title' when title is empty string", ()=>{
        const title = "";
        const len = 20;

        const trunc = truncTitle(title, len);

        expect(trunc).toEqual("No title");
    });
});