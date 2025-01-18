import * as ZOHOCRMSDK from '@zohocrm/nodejs-sdk-7.0';

const dealsModuleAPIName = 'Deals';
const accountsModuleAPIName = 'Accounts';

export class ApiClient {
  static async initialize(clientId, clientSecret, accessToken) {
    let environment = ZOHOCRMSDK.USDataCenter.PRODUCTION();
    let token = new ZOHOCRMSDK.OAuthBuilder()
      .clientId(clientId)
      .clientSecret(clientSecret)
      .accessToken(accessToken)
      .build();
    (await new ZOHOCRMSDK.InitializeBuilder())
      .environment(environment)
      .token(token)
      .initialize();
  }

  static async getRecords(moduleAPIName) {
    let recordOperations = new ZOHOCRMSDK.Record.RecordOperations(
      moduleAPIName
    );

    let paramMap = new ZOHOCRMSDK.ParameterMap();
    if (moduleAPIName == accountsModuleAPIName)
      paramMap.add('fields', 'Account_Name,Website,Phone');
    else if (moduleAPIName == dealsModuleAPIName)
      paramMap.add('fields', 'Deal_Name,Stage');
    else paramMap.add('fields', 'Owner');

    paramMap.add('converted', true);
    paramMap.add('per_page', 5);
    let headerInstance = new ZOHOCRMSDK.HeaderMap();
    let response = await recordOperations.getRecords(paramMap, headerInstance);
    if (response != null) {
      let responseObject = response.getObject();
      if (responseObject != null) {
        return responseObject.getDetails();
      }
    }
  }

  static async postAccounts(accountName, accountWebsite, accountPhone) {
    let recordOperations = new ZOHOCRMSDK.Record.RecordOperations(
      accountsModuleAPIName
    );
    let request = new ZOHOCRMSDK.Record.BodyWrapper();
    let recordsArray = [];
    let record = new ZOHOCRMSDK.Record.Record();
    record.addFieldValue(
      ZOHOCRMSDK.Record.Field.Accounts.ACCOUNT_NAME,
      accountName
    );
    record.addFieldValue(
      ZOHOCRMSDK.Record.Field.Accounts.WEBSITE,
      accountWebsite
    );
    record.addFieldValue(ZOHOCRMSDK.Record.Field.Accounts.PHONE, accountPhone);
    recordsArray.push(record);
    request.setData(recordsArray);
    let headerInstance = new ZOHOCRMSDK.HeaderMap();
    let response = await recordOperations.createRecords(
      request,
      headerInstance
    );
    if (response != null) {
      console.log('Status Code: ' + response.getStatusCode());
      let responseObject = response.getObject();
      if (responseObject != null) {
        if (responseObject instanceof ZOHOCRMSDK.Record.ActionWrapper) {
          let actionResponses = responseObject.getData();
          actionResponses.forEach((actionResponse) => {
            if (actionResponse instanceof ZOHOCRMSDK.Record.SuccessResponse) {
              console.log('Status: ' + actionResponse.getStatus().getValue());
              console.log('Code: ' + actionResponse.getCode().getValue());
              console.log('Details');
              let details = actionResponse.getDetails();
              if (details != null) {
                Array.from(details.keys()).forEach((key) => {
                  console.log(key + ': ' + details.get(key));
                });
              }
              console.log('Message: ' + actionResponse.getMessage().getValue());
            } else if (
              actionResponse instanceof ZOHOCRMSDK.Record.APIException
            ) {
              console.log('Status: ' + actionResponse.getStatus().getValue());
              console.log('Code: ' + actionResponse.getCode().getValue());
              console.log('Details');
              let details = actionResponse.getDetails();
              if (details != null) {
                Array.from(details.keys()).forEach((key) => {
                  console.log(key + ': ' + details.get(key));
                });
              }
              console.log('Message: ' + actionResponse.getMessage().getValue());
            }
          });
        }
      }
    }
  }

  static async postDeals(dealName, dealStage) {
    let recordOperations = new ZOHOCRMSDK.Record.RecordOperations(
      dealsModuleAPIName
    );
    let request = new ZOHOCRMSDK.Record.BodyWrapper();
    let recordsArray = [];
    let record = new ZOHOCRMSDK.Record.Record();

    record.addFieldValue(ZOHOCRMSDK.Record.Field.Deals.DEAL_NAME, dealName);
    record.addFieldValue(ZOHOCRMSDK.Record.Field.Deals.STAGE, dealStage);

    recordsArray.push(record);
    request.setData(recordsArray);
    let headerInstance = new ZOHOCRMSDK.HeaderMap();
    let response = await recordOperations.createRecords(
      request,
      headerInstance
    );
    if (response != null) {
      console.log('Status Code: ' + response.getStatusCode());
      let responseObject = response.getObject();
      if (responseObject != null) {
        if (responseObject instanceof ZOHOCRMSDK.Record.ActionWrapper) {
          let actionResponses = responseObject.getData();
          actionResponses.forEach((actionResponse) => {
            if (actionResponse instanceof ZOHOCRMSDK.Record.SuccessResponse) {
              console.log('Status: ' + actionResponse.getStatus().getValue());
              console.log('Code: ' + actionResponse.getCode().getValue());
              console.log('Details');
              let details = actionResponse.getDetails();
              if (details != null) {
                Array.from(details.keys()).forEach((key) => {
                  console.log(key + ': ' + details.get(key));
                });
              }
              console.log('Message: ' + actionResponse.getMessage().getValue());
            } else if (
              actionResponse instanceof ZOHOCRMSDK.Record.APIException
            ) {
              console.log('Status: ' + actionResponse.getStatus().getValue());
              console.log('Code: ' + actionResponse.getCode().getValue());
              console.log('Details');
              let details = actionResponse.getDetails();
              if (details != null) {
                Array.from(details.keys()).forEach((key) => {
                  console.log(key + ': ' + details.get(key));
                });
              }
              console.log('Message: ' + actionResponse.getMessage().getValue());
            }
          });
        }
      }
    }
  }
}
