// Define your models here.

export interface Model {
  id: string;
  label: string;
  apiIdentifier: string;
  description: string;
}

export const models: Array<Model> = [
  {
    id: 'meta-llama/llama-3.3-70b-instruct:free',
    label: 'Llama 3.3 70B Instruct',
    apiIdentifier: 'meta-llama/llama-3.3-70b-instruct:free',
    description: 'Meta Llama 3.3 70B Instruct (free via OpenRouter)',
  },
] as const;

export const DEFAULT_MODEL_NAME: string = 'meta-llama/llama-3.3-70b-instruct:free';
