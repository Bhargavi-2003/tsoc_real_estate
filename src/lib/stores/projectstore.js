import { writable } from 'svelte/store';

export const projectDetails = writable({
  projectName: '',
  projectDescription: '',
  projectLocation: '',
});

export const tokenParameters = writable({
  tokenName: '',
  tokenSymbol: '',
  totalSupply: '',
  additionalFeatures: '',
});
export const finalDetails = writable({});