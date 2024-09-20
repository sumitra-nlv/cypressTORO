const otplib = require('otplib');
describe('login to TORO system', ()=>{
    beforeEach(() => {
            cy.visit('https://cpq-toro.nextlevelvalue.com/auth/login')
    })
    it('verify user gets logged in with valid credentials', () => {

        cy.fixture('user').then((userData) => {

            cy.get('input[name="email"]').type(userData.email)
            cy.contains('button', 'Next').click();
    
    
            const secret = userData.secret_key;
    
            const otp = otplib.authenticator.generate(secret);
    
            cy.log(`Generated OTP: ${otp}`);
    
            cy.get('#otp').type(otp)
            cy.contains('button', 'Next').click();
    
            cy.get('input[name="password"]').type(userData.password)
            cy.contains('button', 'Login').click()
        })

    
        cy.contains('button', 'salesman').click()

        cy.get('a.text-primary').should('have.text', 'Home');
    })

})