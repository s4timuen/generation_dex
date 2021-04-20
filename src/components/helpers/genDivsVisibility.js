import { showDiv, hideDiv } from '@/components/helpers/utilities.js';

// filter generation divs to display
function showHideGenerationDivs(dataFilter) {
    switch (dataFilter) {
        case '':
            showDiv('generation-i');
            showDiv('generation-ii');
            showDiv('generation-iii');
            showDiv('generation-iv');
            showDiv('generation-v');
            showDiv('generation-vi');
            showDiv('generation-vii');
            showDiv('generation-viii');
            break;
        case 'generation-i':
            showDiv('generation-i');
            hideDiv('generation-ii');
            hideDiv('generation-iii');
            hideDiv('generation-iv');
            hideDiv('generation-v');
            hideDiv('generation-vi');
            hideDiv('generation-vii');
            hideDiv('generation-viii');
            break;
        case 'generation-ii':
            showDiv('generation-i');
            showDiv('generation-ii');
            hideDiv('generation-iii');
            hideDiv('generation-iv');
            hideDiv('generation-v');
            hideDiv('generation-vi');
            hideDiv('generation-vii');
            hideDiv('generation-viii');
            break;
        case 'generation-iii':
            showDiv('generation-i');
            showDiv('generation-ii');
            showDiv('generation-iii');
            hideDiv('generation-iv');
            hideDiv('generation-v');
            hideDiv('generation-vi');
            hideDiv('generation-vii');
            hideDiv('generation-viii');
            break;
        case 'generation-iv':
            showDiv('generation-i');
            showDiv('generation-ii');
            showDiv('generation-iii');
            showDiv('generation-iv');
            hideDiv('generation-v');
            hideDiv('generation-vi');
            hideDiv('generation-vii');
            hideDiv('generation-viii');
            break;
        case 'generation-v':
            showDiv('generation-i');
            showDiv('generation-ii');
            showDiv('generation-iii');
            showDiv('generation-iv');
            showDiv('generation-v');
            hideDiv('generation-vi');
            hideDiv('generation-vii');
            hideDiv('generation-viii');
            break;
        case 'generation-vi':
            showDiv('generation-i');
            showDiv('generation-ii');
            showDiv('generation-iii');
            showDiv('generation-iv');
            showDiv('generation-v');
            showDiv('generation-vi');
            hideDiv('generation-vii');
            hideDiv('generation-viii');
            break;
        case 'generation-vii':
            showDiv('generation-i');
            showDiv('generation-ii');
            showDiv('generation-iii');
            showDiv('generation-iv');
            showDiv('generation-v');
            showDiv('generation-vi');
            showDiv('generation-vii');
            hideDiv('generation-viii');
            break;
        case 'generation-viii':
            showDiv('generation-i');
            showDiv('generation-ii');
            showDiv('generation-iii');
            showDiv('generation-iv');
            showDiv('generation-v');
            showDiv('generation-vi');
            showDiv('generation-vii');
            showDiv('generation-viii');
            break;
        default:
            showDiv('generation-i');
            showDiv('generation-ii');
            showDiv('generation-iii');
            showDiv('generation-iv');
            showDiv('generation-v');
            showDiv('generation-vi');
            showDiv('generation-vii');
            showDiv('generation-viii');
    }
}

export { showHideGenerationDivs };
