import {Selector} from 'testcafe';
import randomstring from 'randomstring';

const TEST_URL = process.env.TEST_URL;
const username = randomstring.generate(8);
const email = `${username}@test.com`;
const password = randomstring.generate(11);

fixture('/register').page(`${TEST_URL}/register`);

test(`should display the registration form`, async(t) => {
    await t
        .navigateTo(`${TEST_URL}/register`)
        .expect(Selector('H1').withText('Register').exists).ok()
        .expect(Selector('form').exists).ok()
        .expect(Selector('input[disabled]').exists).ok()
        .expect(Selector('.validation-list').exists).ok()
        .expect(Selector('.validation-list > .error').nth(0)
            .withText('Username must be greater than 5 characters.').exists).ok()
});

test(`should allow a user to register`, async(t) => {
    // register user
    await t
        .navigateTo(`${TEST_URL}/register`)
        .typeText('input[name="username"]', username)
        .typeText('input[name="email"]', email)
        .typeText('input[name="password"]', password)
        .click(Selector('input[type="submit"]'))

    // assert user is redirected to '/'
    // assert '/' is displayed property
    const tableRow = Selector('td').withText(username).parent();
    await t
        .expect(Selector('h1').withText('All Users').exists).ok()
        .expect(tableRow.child().withText(username).exists).ok()
        .expect(tableRow.child().withText(email).exists).ok()
        .expect(Selector('a').withText('User Status').exists).ok()
        .expect(Selector('a').withText('Log Out').exists).ok()
        .expect(Selector('a').withText('Register').exists).notOk()
        .expect(Selector('a').withText('Log In').exists).notOk()
});

test(`should throw an error if the username is taken`, async(t) => {
    // register user with dublicate user name
    await t
        .navigateTo(`${TEST_URL}/register`)
        .typeText('input[name="username"]', username)
        .typeText('input[name="email"]', `${email}unique`)
        .typeText('input[name="password"]', password)
        .click(Selector('input[type="submit"]'))

    // assert user registration failed
    await t
        .expect(Selector('h1').withText('Register').exists).ok()
        .expect(Selector('a').withText('User Status').exists).notOk()
        .expect(Selector('a').withText('Log Out').exists).notOk()
        .expect(Selector('a').withText('Register').exists).ok()
        .expect(Selector('a').withText('Log In').exists).ok()
        .expect(Selector('.alert-success').exists).notOk()
        .expect(Selector('.alert-danger').withText('That user already exists.').exists).ok()
})

test(`should throw an error if the email is taken`, async(t) => {
    // register user with dublicate user email
    await t
        .navigateTo(`${TEST_URL}/register`)
        .typeText('input[name="username"]', `${username}unique`)
        .typeText('input[name="email"]', email)
        .typeText('input[name="password"]', password)
        .click(Selector('input[type="submit"]'))

    // assert user registration failed
    await t
        .expect(Selector('h1').withText('Register').exists).ok()
        .expect(Selector('a').withText('User Status').exists).notOk()
        .expect(Selector('a').withText('Log Out').exists).notOk()
        .expect(Selector('a').withText('Register').exists).ok()
        .expect(Selector('a').withText('Log In').exists).ok()
        .expect(Selector('.alert-success').exists).notOk()
        .expect(Selector('.alert-danger').withText('That user already exists.').exists).ok()
})




