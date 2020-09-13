import { LightningElement, track,  wire, api } from "lwc";
import getUsers from "@salesforce/apex/UserSearchResultController.getUsers";
export default class userDirectory extends LightningElement {

    //search options(picklist) that displayed in UI
    @track searchOptions = [
        { label: "Name", value: "Name" },
        { label: "Organisation", value: "CompanyName" },
        { label: "Title", value: "Title" }
    ];
    

    @track searchByField; //passed from parent component
    @track searchText; //passed from parent component
    @api displayPhoto; //Get input from while adding the component to display photo.

    //pagination fields
    data = []; //users form Apex
    @track page = 1;  //current Page shown to user
    perpage = 12;
    @track numberOfPages;  // total number of page (noOfUser/perpage)

    handleSearchByChange(event){
        this.searchByField = event.detail.value;
    }
    handleTextChange(event){
        this.searchText = event.detail.value;
    }

    @wire(getUsers, {
        searchByField: "$searchByField",
        searchText: "$searchText"
    })
    wiredUsers({ data, error }) {
        if (data) {
            this.data = data;
            this.calculateNoOfPagesandCurrentPage();

        } else if (error) {
            this.showToast("ERROR", error.body.message, "error");
        }
    }

    calculateNoOfPagesandCurrentPage(){
        this.numberOfPages = Math.ceil(this.data.length / this.perpage);
        //if user alredy navigate to a different page and user searched with a text
        //and return users is less than current page showing then reset current page to 1
        if(this.page >  this.numberOfPages ){
            this.page = 1;
        }
    }
    get usersFound() {
        if (this.data.length > 0) {
            return true;
        }
        return false;
    }

    //set defualt searchBy and searchText
    connectedCallback() {
        this.searchByField = "Name";
        this.searchText = "";
    }

    //set page Data(users displayed in a page) to be display in current page
    pageData = () => {
        let page = this.page;
        let perpage = this.perpage;
        let startIndex = page * perpage - perpage;
        let endIndex = page * perpage;
        return this.data.slice(startIndex, endIndex);
    };

    get hasPrev() {
        return this.page > 1;
    }
    get hasNext() {
        return this.page < this.numberOfPages;
    }
    onNext = () => {
        ++this.page;
    };
    onPrev = () => {
        --this.page;
    };
    onPageClick = (event) => {
        this.page = parseInt(event.target.dataset.id, 10);
    };
    get currentPageData() {
        return this.pageData();
    }

    handlePageNoChange(event) {
        this.page = event.detail.value;
        //if user enters out of range page number reset to 1
        if (this.page <= 0 || this.page > this.numberOfPages) {
            this.page = 1;
        }
    }
}
