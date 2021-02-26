/// <reference types="cypress" />

import { terminalLog } from '../plugins/log'

context('Actions', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.injectAxe()
    })

    it('Has no detectable a11y violations on load', () => {
        cy.checkA11y(null, null, terminalLog)
    })
})