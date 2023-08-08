//Example of the API command created in the Cypress with TypeScript course

import Board from "../typings/Board"

export{}
declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Changes board via API
             * @param body changes you want to make to the board
             * @example
             * cy.editBoard(1)
             */


            // editBoard(body: Pick<Board, 'id' | 'name' | 'starred'>):Chainable<Board> 
            // -> The Pick utility method is used when the user is not allowed to change all the parameters in the body, so we pick only the ones that the user have permission.

            // editBoard(body: Omit<Board, 'created' | 'user'>):Chainable<Board>
            // -> The Omit utility method get all the parameters from the interface, and you select the ones that the user is not allowed.
            // It's the opposite of the Pick utility method

            editBoard: typeof editBoard

            // The difference of this method is that, only the id is required, name and starred are optional. Using Pick or Omit, all the attributes will be required. 

        }
    }
}

const editBoard = (body: Partial<Board> & Required<Pick<Board, 'id'>>) => {

    Cypress.log({
        displayName: 'edit board',
        consoleProps() {
            return {
                id: body.id
            }
        }
    })

    return cy.request('PATCH', `/api/boards/${body.id}`, body).its('body');
}

Cypress.Commands.add("editBoard", editBoard)