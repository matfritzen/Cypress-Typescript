import { Placeholders } from "../typings/placeholders"
declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Get a DOM element based on placehoder value
             * @param input placeholder text value
             * @example
             * // this command 
             * cy.getByPlaceholder('Your Email')
             * // will select this element
             * <input placeholder="Your Email" />
             */
            getByPlaceholder(input: Placeholders):Chainable<any>
        }
    }
}

Cypress.Commands.add("getByPlaceholder", (input : Placeholders) => {

    Cypress.log({
        displayName: 'getByPlaceholder',
        message: input,
        consoleProps() {
            return {
                selector : input
            }
        }
    })

    return cy.get(`[placeholder="${input}"]`, {log:false});
})