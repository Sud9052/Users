import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class UserTile extends NavigationMixin(LightningElement){
    @api user;
    @api userSelectedId;

    @api displayPhoto;

    openUserRecord(){
        this[NavigationMixin.Navigate]({
            type : 'standard__recordPage',
            attributes: {
                recordId: this.user.Id,
                objectApiName: 'User', // objectApiName is optional
                actionName: 'view'
            }
        });
    }

}