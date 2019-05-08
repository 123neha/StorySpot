import * as _ from 'underscore';
import { AppConfig } from './config';

export function getPager(totalItems: number, currentPage = 1) {
    const totalPages = Math.ceil(totalItems / AppConfig.ITEMS_PER_PAGE);

    const pages = _.range(1, totalPages + 1);

    return {
        itemsPerPage: AppConfig.ITEMS_PER_PAGE,
        currentPage: currentPage,
        totalPages: totalPages,
        pages: pages
    };
}
