import {Selector} from 'testcafe';
import randomstring from 'randomstring';

const TEST_URL = process.env.TEST_URL;
const username = randomstring.generate(8);
const email = `${username}@test.com`;
const correntDate = new Date()


fixture('/status').page(`${TEST_URL}/status`);

test(`should display the page if user is not logged in`, async(t) => {
    await t
        .navigateTo(`${TEST_URL}/status`)
        .expect(Selector('a').withText('User Status').exists).notOk()
        .expect(Selector('a').withText('Log Out').exists).notOk()
        .expect(Selector('a').withText('Register').exists).ok()
        .expect(Selector('a').withText('Log In').exists).ok()
})

test(`should display user info if user is logged in`, async(t) => {
    // register user
    await t
        .navigateTo(`${TEST_URL}/register`)
        .typeText('input[name="username"]', username)
        .typeText('input[name="email"]', email)
        .typeText('input[name="password"]', 'test')
        .click(Selector('input[type="submit"]'))

    // assert '/status' is displayed property
    await t
        .navigateTo(`${TEST_URL}/status`)
        // .expect(Selector('li>strong').withText('User ID:').exists).ok()
        .expect(Selector('li > strong').withText('Email:').exists).ok()
        .expect(Selector('li').withText(email).exists).ok()
        .expect(Selector('li > strong').withText('Username:').exists).ok()
        .expect(Selector('li').withText(username).exists).ok()
        .expect(Selector('a').withText('User Status').exists).ok()
        .expect(Selector('a').withText('Log Out').exists).ok()
        .expect(Selector('a').withText('Register').exists).notOk()
        .expect(Selector('a').withText('Log In').exists).notOk()
})




