import type { LanguageCardComponent, LanguageCardProps } from '../../abstract/language-card.interface';
import type { Language } from '../../../../core/models/languages/types';

export class VanillaLanguageCard implements LanguageCardComponent {
  private container: HTMLElement | null = null;
  private props: LanguageCardProps | null = null;
  private card: HTMLElement | null = null;
  
  render(container: HTMLElement, props: LanguageCardProps): void {
    this.container = container;
    this.props = props;
    
    this.card = document.createElement('div');
    this.card.className = 'language-card bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200';
    
    this.updateCardContent();
    
    container.appendChild(this.card);
  }
  
  update(props: LanguageCardProps): void {
    this.props = props;
    this.updateCardContent();
  }
  
  destroy(): void {
    if (this.card && this.container) {
      this.container.removeChild(this.card);
    }
    
    this.card = null;
    this.container = null;
    this.props = null;
  }
  
  private updateCardContent(): void {
    if (!this.card || !this.props) return;
    
    const { language, onClick, onCompare, isCompared } = this.props;
    
    this.card.innerHTML = `
      <div class="flex justify-between items-start">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">${language.name}</h3>
        <span class="text-sm text-gray-500 dark:text-gray-400">${language.yearCreated}</span>
      </div>
      
      <div class="mt-2">
        <p class="text-sm text-gray-600 dark:text-gray-300">${language.description.substring(0, 100)}${language.description.length > 100 ? '...' : ''}</p>
      </div>
      
      <div class="mt-3 flex flex-wrap gap-1">
        ${language.core.paradigm.slice(0, 3).map(p => 
          `<span class="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1 rounded">${p}</span>`
        ).join('')}
        ${language.core.paradigm.length > 3 ? '<span class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 px-2 py-1 rounded">+' + (language.core.paradigm.length - 3) + '</span>' : ''}
      </div>
      
      <div class="mt-4 flex justify-between">
        <button class="view-btn text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white py-1 px-3 rounded">
          View Details
        </button>
        <button class="compare-btn text-sm ${isCompared 
          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100' 
          : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white'} py-1 px-3 rounded">
          ${isCompared ? 'Added to Compare' : 'Compare'}
        </button>
      </div>
    `;
    
    // Add event listeners
    const viewBtn = this.card.querySelector('.view-btn');
    if (viewBtn && onClick) {
      viewBtn.addEventListener('click', () => onClick(language));
    }
    
    const compareBtn = this.card.querySelector('.compare-btn');
    if (compareBtn && onCompare) {
      compareBtn.addEventListener('click', () => onCompare(language));
    }
  }
}

// Factory function to create a language card
export function createVanillaLanguageCard(): LanguageCardComponent {
  return new VanillaLanguageCard();
} 