import {Selector} from 'testcafe';
import randomstring from 'randomstring';

const TEST_URL = process.env.TEST_URL;
const username = randomstring.generate(8);
const email = `${username}@test.com`;
const password = randomstring.generate(11);

fixture('/login').page(`${TEST_URL}/login`);

test(`should display the sign in form`, async(t) => {
    await t
        .navigateTo(`${TEST_URL}/login`)
        .expect(Selector('H1').withText('Login').exists).ok()
        .expect(Selector('form').exists).ok()
        .expect(Selector('input[disabled]').exists).ok()
        .expect(Selector('.validation-list').exists).ok()
        .expect(Selector('.validation-list > .error').nth(0)
            .withText('Email must be greater than 5 characters.').exists).ok()
})

test(`should allow a user to sign in`, async(t) => {

    // Register user
    await t
        .navigateTo(`${TEST_URL}/register`)
        .typeText('input[name="username"]', username)
        .typeText('input[name="email"]', email)
        .typeText('input[name="password"]', password)
        .click(Selector('input[type="submit"]'))

    // log a user out
    await t.click(Selector('a').withText('Log Out'))

    // log a user in
    await t
        .navigateTo(`${TEST_URL}/login`)
        .typeText('input[name="email"]', email)
        .typeText('input[name="password"]', password)
        .click(Selector('input[type="submit"]'))

    // assert user is redirected to '/'
    // assert '/' is displayed property
    const tableRow = Selector('td').withText(username).parent();
    await t
        .expect(Selector('H1').withText('All Users').exists).ok()
        .expect(tableRow.child().withText(username).exists).ok()
        .expect(tableRow.child().withText(email).exists).ok()
        .expect(Selector('a').withText('User Status').exists).ok()
        .expect(Selector('a').withText('Log Out').exists).ok()
        .expect(Selector('a').withText('Register').exists).notOk()
        .expect(Selector('a').withText('Log In').exists).notOk()
})

test(`should allow a user to sign in`, async(t) => {
    // change user
    let username = randomstring.generate(8);
    let email = `${username}@test.com`;

    // register user
    await t
        .navigateTo(`${TEST_URL}/register`)
        .typeText('input[name="username"]', username)
        .typeText('input[name="email"]', email)
        .typeText('input[name="password"]', password)
        .click(Selector('input[type="submit"]'))

    // log a user out
    await t.click(Selector('a').withText('Log Out'))

    // log a user in
    await t
        .navigateTo(`${TEST_URL}/login`)
        .typeText('input[name="email"]', email)
        .typeText('input[name="password"]', password)
        .click(Selector('input[type="submit"]'))

    // assert user is redirectde to '/'
    // assert '/' is displayed property
    const tableRow = Selector('td').withText(username).parent();
    await t
        .expect(Selector('H1').withText('All Users').exists).ok()
        .expect(tableRow.child().withText(username).exists).ok()
        .expect(tableRow.child().withText(email).exists).ok()
        .expect(Selector('a').withText('User Status').exists).ok()
        .expect(Selector('a').withText('Log Out').exists).ok()
        .expect(Selector('a').withText('Register').exists).notOk()
        .expect(Selector('a').withText('Log In').exists).notOk()

    // log a user out
    await t.click(Selector('a').withText('Log Out'))

    // assert '/logout' is displayed property
    await t
        .expect(Selector('p').withText('You are now logged out').exists).ok()
        .expect(Selector('a').withText('User Status').exists).notOk()
        .expect(Selector('a').withText('Log Out').exists).notOk()
        .expect(Selector('a').withText('Register').exists).ok()
        .expect(Selector('a').withText('Log In').exists).ok()
})

test(`should validate the password field`, async(t) => {
    await t
        .navigateTo(`${TEST_URL}/login`)
        .expect(Selector('H1').withText('Login').exists).ok()
        .expect(Selector('form').exists).ok()
        .expect(Selector('input[disabled]').exists).ok()
        .expect(Selector('.validation-list > .error').nth(2)
            .withText('Password must be greater than 10 characters.').exists).ok()
        .typeText('input[name="password"]', 'greaterthanten')
        .expect(Selector('.validation-list').exists).ok()
        .expect(Selector('.validation-list > .error').nth(2)
            .withText('Password must be greater than 10 characters.').exists).notOk()
        .expect(Selector('.validation-list > .success').nth(0)
            .withText('Password must be greater than 10 characters.').exists).ok()
        .click(Selector('a').withText('Register'))
        .expect(Selector('.validation-list > .error').nth(3)
            .withText('Password must be greater than 10 characters.').exists).ok()
})

