import { showDiv, hideDiv } from '@/components/helpers/utilities.js';

// filter generation divs to display
function showHideGenerationDivs(document, dataFilter) {
    switch (dataFilter) {
        case 'nationa':
            showDiv(document, 'generation-i');
            showDiv(document, 'generation-ii');
            showDiv(document, 'generation-iii');
            showDiv(document, 'generation-iv');
            showDiv(document, 'generation-v');
            showDiv(document, 'generation-vi');
            showDiv(document, 'generation-vii');
            showDiv(document, 'generation-viii');
            break;
        case 'generation-i':
            showDiv(document, 'generation-i');
            hideDiv(document, 'generation-ii');
            hideDiv(document, 'generation-iii');
            hideDiv(document, 'generation-iv');
            hideDiv(document, 'generation-v');
            hideDiv(document, 'generation-vi');
            hideDiv(document, 'generation-vii');
            hideDiv(document, 'generation-viii');
            break;
        case 'generation-ii':
            showDiv(document, 'generation-i');
            showDiv(document, 'generation-ii');
            hideDiv(document, 'generation-iii');
            hideDiv(document, 'generation-iv');
            hideDiv(document, 'generation-v');
            hideDiv(document, 'generation-vi');
            hideDiv(document, 'generation-vii');
            hideDiv(document, 'generation-viii');
            break;
        case 'generation-iii':
            showDiv(document, 'generation-i');
            showDiv(document, 'generation-ii');
            showDiv(document, 'generation-iii');
            hideDiv(document, 'generation-iv');
            hideDiv(document, 'generation-v');
            hideDiv(document, 'generation-vi');
            hideDiv(document, 'generation-vii');
            hideDiv(document, 'generation-viii');
            break;
        case 'generation-iv':
            showDiv(document, 'generation-i');
            showDiv(document, 'generation-ii');
            showDiv(document, 'generation-iii');
            showDiv(document, 'generation-iv');
            hideDiv(document, 'generation-v');
            hideDiv(document, 'generation-vi');
            hideDiv(document, 'generation-vii');
            hideDiv(document, 'generation-viii');
            break;
        case 'generation-v':
            showDiv(document, 'generation-i');
            showDiv(document, 'generation-ii');
            showDiv(document, 'generation-iii');
            showDiv(document, 'generation-iv');
            showDiv(document, 'generation-v');
            hideDiv(document, 'generation-vi');
            hideDiv(document, 'generation-vii');
            hideDiv(document, 'generation-viii');
            break;
        case 'generation-vi':
            showDiv(document, 'generation-i');
            showDiv(document, 'generation-ii');
            showDiv(document, 'generation-iii');
            showDiv(document, 'generation-iv');
            showDiv(document, 'generation-v');
            showDiv(document, 'generation-vi');
            hideDiv(document, 'generation-vii');
            hideDiv(document, 'generation-viii');
            break;
        case 'generation-vii':
            showDiv(document, 'generation-i');
            showDiv(document, 'generation-ii');
            showDiv(document, 'generation-iii');
            showDiv(document, 'generation-iv');
            showDiv(document, 'generation-v');
            showDiv(document, 'generation-vi');
            showDiv(document, 'generation-vii');
            hideDiv(document, 'generation-viii');
            break;
        case 'generation-viii':
            showDiv(document, 'generation-i');
            showDiv(document, 'generation-ii');
            showDiv(document, 'generation-iii');
            showDiv(document, 'generation-iv');
            showDiv(document, 'generation-v');
            showDiv(document, 'generation-vi');
            showDiv(document, 'generation-vii');
            showDiv(document, 'generation-viii');
            break;
        default:
            showDiv(document, 'generation-i');
            showDiv(document, 'generation-ii');
            showDiv(document, 'generation-iii');
            showDiv(document, 'generation-iv');
            showDiv(document, 'generation-v');
            showDiv(document, 'generation-vi');
            showDiv(document, 'generation-vii');
            showDiv(document, 'generation-viii');
    }
}

export { showHideGenerationDivs };
