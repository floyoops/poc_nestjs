import {FakerService} from '../../../../src/modules/faker/faker.service';

const fakerService = new FakerService();
describe('FakerService', () => {
    describe('root', () => {
        it('generate uuid', () => {
            expect(fakerService.generateUUID()).toContain('-');
        });

        it ('generate title', () => {
            expect(fakerService.generateTitle()).not.toBeNull();
        });
    });
});
