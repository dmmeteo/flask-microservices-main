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