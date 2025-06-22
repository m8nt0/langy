import { BaseCard } from '../../base';
import { useCardBehavior } from "../../behaviors";
import { TechObjectCardProps } from './TechObjectCard.type';

/**
 * A concrete implementation of a card that displays a TechObject.
 * It is a "dumb" component; all its logic comes from the behavior.
 */
export class TechObjectCard extends BaseCard {
    constructor(props: TechObjectCardProps) {
        // The card's behavior is derived from its data via the hook.
        // The hook provides all the necessary properties and callbacks (title, onClick, etc.).
        const behavior = useCardBehavior(props.techObject);
        super(behavior);
    }

    // The platform-specific implementation of this class will use the
    // `this.props` (from the BaseCard) to render the title, description, etc.
    render(): any {}
}