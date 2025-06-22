import { TechObjectDto } from '../../../../core/application/dto';
import { navigationActions } from '../state/actions';

/**
 * Encapsulates the logic for a TechObject card.
 * @param techObject The data for the card.
 * @returns Properties and callbacks to be used by the card ocmponent.
 */
export function useCardBehavior(techObject: TechObjectDto) {
    const navigateToTechObject = () => {
        // This action would be handled by the routing/navigation system
        // to change the URL and trigger the appropriate page view.
        navigationActions.navigateTo(`/levels/${techObject.level}/tech/${techObject.id}`);
    };

    return {
        id: techObject.id,
        title: techObject.name,
        level: techObject.level,
        versions: techObject.versions,
        viewersData: techObject.viewersData,
        onClick: navigateToTechObject
    };
}