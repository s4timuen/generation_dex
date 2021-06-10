import { showDivs, hideDivs } from '@/components/helpers/utilities.js';

// filter generation divs to display
function showHideGenerationDivs(document, dataFilter) {
    switch (dataFilter) {
        case 'national':
            showDivs(document, ['generation-i', 'generation-ii', 'generation-iii', 'generation-iv', 'generation-v', 'generation-vi', 'generation-vii', 'generation-viii']);
            break;
        case 'generation-i':
            showDivs(document, ['generation-i']);
            hideDivs(document, ['generation-ii', 'generation-iii', 'generation-iv', 'generation-v', 'generation-vi', 'generation-vii', 'generation-viii']);
            break;
        case 'generation-ii':
            showDivs(document, ['generation-i', 'generation-ii']);
            hideDivs(document, ['generation-iii', 'generation-iv', 'generation-v', 'generation-vi', 'generation-vii', 'generation-viii']);
            break;
        case 'generation-iii':
            showDivs(document, ['generation-i', 'generation-ii', 'generation-iii']);
            hideDivs(document, ['generation-iv', 'generation-v', 'generation-vi', 'generation-vii', 'generation-viii']);
            break;
        case 'generation-iv':
            showDivs(document, ['generation-i', 'generation-ii', 'generation-iii', 'generation-iv']);
            hideDivs(document, ['generation-v', 'generation-vi', 'generation-vii', 'generation-viii']);
            break;
        case 'generation-v':
            showDivs(document, ['generation-i', 'generation-ii', 'generation-iii', 'generation-iv', 'generation-v']);
            hideDivs(document, ['generation-vi', 'generation-vii', 'generation-viii']);
            break;
        case 'generation-vi':
            showDivs(document, ['generation-i', 'generation-ii', 'generation-iii', 'generation-iv', 'generation-v', 'generation-vi']);
            hideDivs(document, ['generation-vii', 'generation-viii']);
            break;
        case 'generation-vii':
            showDivs(document, ['generation-i', 'generation-ii', 'generation-iii', 'generation-iv', 'generation-v', 'generation-vi', 'generation-vii']);
            hideDivs(document, ['generation-viii']);
            break;
        case 'generation-viii':
            showDivs(document, ['generation-i', 'generation-ii', 'generation-iii', 'generation-iv', 'generation-v', 'generation-vi', 'generation-vii', 'generation-viii']);
            break;
        default:
            showDivs(document, ['generation-i', 'generation-ii', 'generation-iii', 'generation-iv', 'generation-v', 'generation-vi', 'generation-vii', 'generation-viii']);
            break;
    }
}

export { showHideGenerationDivs };
