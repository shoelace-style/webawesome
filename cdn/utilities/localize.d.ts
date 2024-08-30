import { LocalizeController as DefaultLocalizationController } from '@shoelace-style/localize';
import type { Translation as DefaultTranslation } from '@shoelace-style/localize';
export declare class LocalizeController extends DefaultLocalizationController<Translation> {
}
export { registerTranslation } from '@shoelace-style/localize';
export interface Translation extends DefaultTranslation {
    $code: string;
    $name: string;
    $dir: 'ltr' | 'rtl';
    carousel: string;
    clearEntry: string;
    close: string;
    copied: string;
    copy: string;
    currentValue: string;
    error: string;
    goToSlide: (slide: number, count: number) => string;
    hidePassword: string;
    loading: string;
    nextSlide: string;
    numOptionsSelected: (num: number) => string;
    previousSlide: string;
    progress: string;
    remove: string;
    resize: string;
    scrollToEnd: string;
    scrollToStart: string;
    selectAColorFromTheScreen: string;
    showPassword: string;
    slideNum: (slide: number) => string;
    toggleColorFormat: string;
}
