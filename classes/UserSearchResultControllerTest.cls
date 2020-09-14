@isTest
public class UserSearchResultControllerTest {
    @isTest
    public static  void testUserSearchController() {
        
        
        Profile profileId = [SELECT Id FROM Profile WHERE Name = 'Standard User' LIMIT 1];
        
        User usr = new User(LastName = 'Sam',
                            FirstName='Test',
                            Alias = 'sTest',
                            UserName='sam.test@abc.com',
                            Email = 'sam.test@abc.com',
                            ProfileId = profileId.id,
                            TimeZoneSidKey = 'GMT',
                            LanguageLocaleKey = 'en_US',
                            EmailEncodingKey = 'UTF-8',
                            LocaleSidKey = 'en_US',
                            Title = 'Test Title');
        insert usr;
        String searchCat = 'Title';
        String searchText = 'Test Title';
        List<user> uList = UserSearchResultController.getUsers(searchCat, searchText);
        system.assertEquals('Test Sam',uList[0].Name);
        //test Empty parameters to 100% coverage
        uList = UserSearchResultController.getUsers('', '');
        
    }
}