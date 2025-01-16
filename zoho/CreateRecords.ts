import * as ZOHOCRMSDK from '@zohocrm/nodejs-sdk-7.0';

export class CreateRecords {
  static async initialize(clientId, clientSecret, refreshToken) {
    let environment = ZOHOCRMSDK.USDataCenter.PRODUCTION();
    let token = new ZOHOCRMSDK.OAuthBuilder()
      .clientId(clientId)
      .clientSecret(clientSecret)
      .refreshToken(refreshToken)
      .build();
    (await new ZOHOCRMSDK.InitializeBuilder())
      .environment(environment)
      .token(token)
      .initialize();
  }

  static async createRecords(moduleAPIName) {
    //example
    //let moduleAPIName = "module_api_name";
    let recordOperations = new ZOHOCRMSDK.Record.RecordOperations(
      moduleAPIName
    );
    let request = new ZOHOCRMSDK.Record.BodyWrapper();
    let recordsArray = [];
    let record = new ZOHOCRMSDK.Record.Record();
    record.addFieldValue(
      ZOHOCRMSDK.Record.Field.Leads.LAST_NAME,
      'Node JS SDK'
    );
    record.addFieldValue(ZOHOCRMSDK.Record.Field.Leads.FIRST_NAME, 'Node');
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
