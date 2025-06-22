import { HomePage, LevelPage, TechObjectPage } from '../pages';

export const routes = [
    { path: '/', component: HomePage },
    { path: '/levels/:levelId', component: LevelPage},
    { path: '/tech/:techObjectId', component: TechObjectPage },
    // Add other routes here
];