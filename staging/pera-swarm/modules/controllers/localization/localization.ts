import { AbstractController } from '../';

// TODO
export class VirtualLocalizationController extends AbstractController {
    constructor(publish: Function, publishTopic: string = 'localization/') {
        super(publish, publishTopic);
    }

    defaultSubscriptions = () => {
        return [];
    };
}
