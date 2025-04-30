// Then import your scroll logic:
import {initGlobalScroll} from './global.js';
import {initMastheadScroll} from './section-masthead.js';
import {initAboutScroll} from './section-about.js';
import {initWorkScroll} from './section-work.js';
import {initClientsScroll} from './section-clients.js';
import {initContactScroll} from './section-contact.js';

window.addEventListener('DOMContentLoaded', () => {
    console.log('Main entry loaded');

    initGlobalScroll();
    initMastheadScroll();
    initAboutScroll();
    initWorkScroll();
    initClientsScroll();
    initContactScroll();
});
