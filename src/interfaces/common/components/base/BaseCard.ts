/**
 * Defines the essential properties for any "card" component that represents a clickable, summary view of an object.
 */
export interface BaseCardProps {
    id: string;
    title: string;
    subtitle?: string;
    description?: string;
    tags?: string[];
    onClick?: (id: string) => void;
}

export abstract class BaseCard {
    constructor(protected props: BaseCardProps) {}

    // Abstract render method to be implemented by a platform-specific class.
    abstract render(): any; // Return type depends on the UI framework
}