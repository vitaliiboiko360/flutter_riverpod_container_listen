import 'package:flutter/material.dart';
import 'package:riverpod/riverpod.dart';

import 'src/app.dart';

void main() {
  ProviderContainer providerContainer = ProviderContainer();

  providerContainer.listen(counterProvider, (previousValue, newValue) {
    print('newValue has current value : ${newValue.currentValue}');
    print('and number of times it changed : ${newValue.numberOfTimesChanged}');
  });

  runApp(App(providerContainer));
}
