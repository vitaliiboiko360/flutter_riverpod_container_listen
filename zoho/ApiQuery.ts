import * as ZOHOCRMSDK from '@zohocrm/nodejs-sdk-7.0';
export class ApiQuery {
  static async sampleCall() {
    let environment1 = ZOHOCRMSDK.USDataCenter.PRODUCTION();

    let token1 = new ZOHOCRMSDK.OAuthBuilder()
      .clientId('clientId')
      .clientSecret('clientSecret')
      .refreshToken('refreshToken')
      .redirectURL('redirectURL')
      .build();

    (await new ZOHOCRMSDK.InitializeBuilder())
      .environment(environment1)
      .token(token1)
      .initialize()
      .catch((err) => {
        console.log(err);
      });

    await ApiQuery.getRecords('Leads').catch((err) => {
      console.log(err);
    });
  }

  static async getRecords(
    moduleAPIName,
    fieldNames = ['Owner', 'Company', 'Email']
  ) {
    try {
      let recordOperations = new ZOHOCRMSDK.Record.RecordOperations(
        moduleAPIName
      );
      let paramInstance = new ZOHOCRMSDK.ParameterMap();
      await paramInstance.add(
        ZOHOCRMSDK.Record.GetRecordsParam.APPROVED,
        'both'
      );
      await paramInstance.add(
        ZOHOCRMSDK.Record.GetRecordsParam.FIELDS,
        fieldNames.toString()
      );
      let headerInstance = new ZOHOCRMSDK.HeaderMap();
      // await headerInstance.add(
      //   ZOHOCRMSDK.Record.GetRecordsHeader.IF_MODIFIED_SINCE,
      //   new Date('2020-01-01T00:00:00+05:30')
      // );
      let response = await recordOperations.getRecords(
        paramInstance,
        headerInstance
      );
      if (response != null) {
        console.log('Status Code: ' + response.getStatusCode());
        if ([204, 304].includes(response.getStatusCode())) {
          console.log(
            response.getStatusCode() == 204 ? 'No Content' : 'Not Modified'
          );
          return;
        }
        let responseObject = response.getObject();
        if (responseObject != null) {
          if (responseObject instanceof ZOHOCRMSDK.Record.ResponseWrapper) {
            let records = responseObject.getData();
            for (let index = 0; index < records.length; index++) {
              let record = records[index];
              console.log('Record ID: ' + record.getId());
              let createdBy = record.getCreatedBy();
              if (createdBy != null) {
                console.log('Record Created By User-ID: ' + createdBy.getId());
                console.log(
                  'Record Created By User-Name: ' + createdBy.getName()
                );
                console.log(
                  'Record Created By User-Email: ' + createdBy.getEmail()
                );
              }
              console.log('Record CreatedTime: ' + record.getCreatedTime());
              let modifiedBy = record.getModifiedBy();
              if (modifiedBy != null) {
                console.log(
                  'Record Modified By User-ID: ' + modifiedBy.getId()
                );
                console.log(
                  'Record Modified By User-Name: ' + modifiedBy.getName()
                );
                console.log(
                  'Record Modified By User-Email: ' + modifiedBy.getEmail()
                );
              }
              console.log('Record ModifiedTime: ' + record.getModifiedTime());
              let tags = record.getTag();
              if (tags != null) {
                tags.forEach((tag) => {
                  console.log('Record Tag Name: ' + tag.getName());
                  console.log('Record Tag ID: ' + tag.getId());
                });
              }
              let keyValues = record.getKeyValues();
              let keyArray = Array.from(keyValues.keys());
              for (let keyIndex = 0; keyIndex < keyArray.length; keyIndex++) {
                const keyName = keyArray[keyIndex];
                let value = keyValues.get(keyName);
                console.log(keyName + ' : ' + value);
              }
            }
          }

          return responseObject;
        }
      }

      return { success: false, response: response };
    } catch (error) {
      console.log(error);

      return { success: false, error: error };
    }
  }
}

ApiQuery.sampleCall();
