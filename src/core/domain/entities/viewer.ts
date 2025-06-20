// 3. Viewer - Different ways to see tech objects
import { ViewerType } from "../value-objects/Viewer";
import { TechObject } from "./TechObject";

// But I'm not sure if its needed
// import { ViewerId } from '../value-objects/ID';

export class Viewer {
    constructor(
        public readonly type: ViewerType, // timeline, abstraction, etc.
        public readonly name: string,
        public readonly isActive: boolean = true
    ) { }

    // Extract specific data from a tech object
    extractData(techObject: TechObject): any {
        switch (this.type) {
            case 'timeline':
                return techObject.viewersData.timeline;
            case 'abstraction':
                return techObject.viewersData.abstraction;
            case 'paradigm':
                return techObject.viewersData.paradigm;
            case 'system':
                return techObject.viewersData.system;
            case 'useCase':
                return techObject.viewersData.useCase;
            case 'experience':
                return techObject.viewersData.experience;
            default:
                return null;
        }
    }
}