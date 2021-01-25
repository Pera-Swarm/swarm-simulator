import { AbstractVirtualRelayModule } from '../';

export class VirtualLocalizationRelayModule extends AbstractVirtualRelayModule {
    constructor(publish: Function, publishTopic: string = 'localization/') {
        super(publish, publishTopic);
    }

    defaultSubscriptions = () => {
        return [];
    };
}
