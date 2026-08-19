import linkModel from "../models/link_model";
function findLinkByShortCode(shortCode:string){
    return linkModel.findOne({shortCode:shortCode});
}
export default {findLinkByShortCode}