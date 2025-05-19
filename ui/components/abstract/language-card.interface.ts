import type { Language } from '../../../core/models/languages/types';

export interface LanguageCardProps {
  language: Language;
  onClick?: (language: Language) => void;
  onCompare?: (language: Language) => void;
  isCompared?: boolean;
}

export interface LanguageCardComponent {
  render(container: HTMLElement, props: LanguageCardProps): void;
  update(props: LanguageCardProps): void;
  destroy(): void;
} 