import { BuddhismDB } from "./BuddhismDB";

const getGuide = (title, religionDict) => {
    let religion = religionDict['key']
    console.log(title, religion)
    // 5-level if-else template
    let guide;
    switch(religion){
        case "Christian":
            break;
        case "Islam":
            break;
        case "Hinduism":
            break;
        case 'Buddhism':
            guide = BuddhismDB[title]
            break;
        case "Judaism":
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