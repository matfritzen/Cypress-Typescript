//Example of the API command created in the Cypress with TypeScript course

import Board from "../typings/Board"

export{}
declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Add a new board via API
             * @param name name of the board
             * @example
             * cy.addBoard('new board')
             */
            addBoard(name: string):Chainable<Board>
        }
    }
}

Cypress.Commands.add("addBoard", (name : string) => {

    Cypress.log({
        displayName: 'add board',
        message: name,
        consoleProps() {
            return {
                name
            }
        }
    })

    return cy.request('POST', '/api/boards', {
        name
    }).its('body');
})