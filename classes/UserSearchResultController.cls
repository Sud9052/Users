public with sharing class UserSearchResultController {
    @AuraEnabled(cacheable=true)
    public static   List<user>  getUsers(String searchByField, String searchText) {
 		String queryString ;
        if(string.isempty(searchByField) ){
            searchByField = 'Name';
        }
        if(string.isempty(searchText))
        {
              queryString = 'Select Id, Name, CompanyName, Title, MediumPhotoUrl, BannerPhotoUrl, SmallBannerPhotoUrl FROM User WHERE iSActive  = true';
        }            
        else
        {
            searchText = '%'+searchText+'%';
             queryString = 'Select Id, Name, CompanyName, Title, MediumPhotoUrl, BannerPhotoUrl, SmallBannerPhotoUrl FROM User WHERE iSActive  = true AND '+searchByField+ ' Like :searchText'; 
             system.debug(queryString);
        }
            

            system.System.debug('The search string is :'+ queryString);
            List<user>  userList =    database.query(queryString);
           
            return userList;
    }
}