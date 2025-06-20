import { TechObjectDto } from '../../dto';

// This interface is the inbound port.
// It defines a specific use case that the outside world can trigger.
export interface IGetTechObjectUseCase {
  execute(id: string): Promise<TechObjectDto>;
}