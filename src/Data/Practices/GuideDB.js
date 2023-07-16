import { BuddhismDB } from "./BuddhismDB";
import { ChristianityDB } from "./ChristianityDB";
import { HinduismDB } from "./HinduismDB";
import { IslamDB } from "./IslamDB";
import { JudaismDB } from "./JudaismDB";

const getGuide = (title, religionDict) => {
    let religion = religionDict['key']
    // console.log(title, religion)
    // 5-level if-else template
    let guide;
    switch(religion){
        case "Christianity":
            guide = ChristianityDB[title]
            break;
        case "Islam":
            guide = IslamDB[title]
            break;
        case "Hinduism":
            guide = HinduismDB[title]
            break;
        case 'Buddhism':
            guide = BuddhismDB[title]
            break;
        case "Judaism":
            guide = JudaismDB[title]
            break;
        default:
            break;
    };
    if(!guide){
        const errorMsg = `No ${religion}-specific guide found for "${title}".`;
        throw new Error(errorMsg);
    }
    // return guide
    return(guide)
}

export { getGuide } 