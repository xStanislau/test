/*global product*/
import {SWITCH_UNIT_SYSTEM} from "../../constants/actions";

const initialState = {
    product: product,
    isImperial: true
};

export default function handle(state=initialState, action) {
    switch(action.type) {
        case SWITCH_UNIT_SYSTEM: {
            return { ...state, isImperial: action.payload };
        }
        default: break;
    }
    return state;
}