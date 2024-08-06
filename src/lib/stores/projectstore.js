import { writable } from 'svelte/store';

export const projectDetails = writable({
  projectName: '',
  projectDescription: '',
  projectLocation: '',
  projectId: 0, // Include projectId in the store
});

export const tokenParameters = writable({
  tokenName: '',
  tokenSymbol: '',
  totalSupply: '',
  additionalFeatures: '',
});
export const confirmedDataList = writable([]);
