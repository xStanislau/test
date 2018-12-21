// import { ROTATE_PRODUCT } from '../../constants/actions';
import { SWITCH_UNIT_SYSTEM } from '../../constants/actions';

// export function rotateProduct(product) {
//     return {
//         type: ROTATE_PRODUCT
//     };
// }

export function switchUnitSystem(payload) {
    return {
        type: SWITCH_UNIT_SYSTEM,
        payload
    };
}
