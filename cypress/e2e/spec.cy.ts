import * as lists from '../fixtures/lists.json'
import Board from '../support/typings/Board';
// import * as lists from '@fixtures/lists.json' -> Using @fixtures as configured in the tsconfig.json

describe('Test suit', () => {
    it.skip('Test case 1', () => {
        const url = 'https://google.com';

        cy.visit(`${url}/`);
        // cy.getByPlaceholder("test placehoder")
        // cy.getByPlaceholder('') -> After adding the typings for the getByPlaceholder() command, where input : Placeholders

        // cy.get('#APjFqb').should('be.visible').type(`${lists[1].name}`);

        lists.forEach(list => {
            cy.get('#APjFqb').should('be.visible').type(`${list.name}{enter}`);
            // cy.contains("Pesquisa Google").should('be.visible').click();
            cy.get(".LC20lb").first().should('be.visible');
            cy.go('back');
        })
        
        // using cypress-real-event plugin
        // cy.get(".LC20lb").first().realHover();
    });


    // This test is not available since the tests are running locally in the Cypress with TypeScript course
    it('Example of addBoard command', () => {
        cy.addBoard('new board')
        .then((body) => {
            // If you have a line of code that is not compiling correctly in TypeScript and you want to skip it, you can use the @ts-ignore as it is below.
            
            // @ts-ignore
            // expect(body.idasfa).to.exist

            Cypress.env('boardID', body.id);
            expect(body.id).to.exist
            expect(body.starred).to.be.false


            cy.editBoard({
                id: body.id,
                name: 'test',
                starred: false
            }).then((bodyEdited) => {
                cy.request({
                    method : 'DELETE',
                    url: 'api/boards/'+bodyEdited.id+''
                })
                .then((response) => {
                    expect(response.status).to.eq(200);
                })
            })
        })

        // cy.editBoard({
        //     id: Cypress.env('boardID'),
        //     name: 'test',
        //     starred: false
        // })
    })

    it.skip('check visual testing', () => {
        
        cy.eyesOpen({
            appName: "Google Test"
        });

        cy.visit("/");
        cy.get('#APjFqb').should('be.visible')

        cy.eyesCheckWindow({
            ignore: {
                selector : '.aajZCb'
            }
        })
        cy.eyesClose();

        //4TRAyLTXmfwT8BROKVgXz4DDxn108109KEzAfJEYmsMxeT0110

    });


});