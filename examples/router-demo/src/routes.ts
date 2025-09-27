import { createRouter, type PageModule } from '@usezeon/router';

const root = document.getElementById('app')!;
const pages = import.meta.glob<PageModule>('./routes/**/*.ts'); 
export const router = createRouter({ root, pages });
