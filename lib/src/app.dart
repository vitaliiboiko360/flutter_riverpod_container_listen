import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class App extends StatelessWidget {
  App(this.providerContainer, {super.key});

  ProviderContainer providerContainer;

  @override
  Widget build(BuildContext context) {
    return UncontrolledProviderScope(
      container: providerContainer,
      child: MaterialApp(
        title: 'Flutter',
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        ),
        home: const HomePage(title: 'Flutter'),
      ),
    );
  }
}

class HomePage extends ConsumerWidget {
  const HomePage({super.key, required this.title});

  final String title;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final counter = ref.watch(counterProvider);
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text('Counter counts:'),
            Text(
              'Current value is ${counter.currentValue}\nNumber of times it changed is ${counter.numberOfTimesChanged}',
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      floatingActionButton: Row(
        mainAxisAlignment: MainAxisAlignment.end,
        spacing: 10,
        children: [
          FloatingActionButton(
            onPressed: () {
              ref.read(counterProvider.notifier).incrementByTen();
              // ref.refresh(counterProvider);
            },
            tooltip: 'Increment',
            child: const Icon(Icons.add),
          ),
          FloatingActionButton(
            onPressed: () {
              ref.read(counterProvider.notifier).decrementByTen();
              // ref.refresh(counterProvider);
            },
            tooltip: 'Decrement',
            child: const Icon(Icons.remove),
          ),
        ],
      ),
    );
  }
}

final counterProvider = NotifierProvider<Counter, CounterState>(Counter.new);

class Counter extends Notifier<CounterState> {
  @override
  CounterState build() {
    print('build inside Notifier');
    ref.onDispose(() {
      print('disposed');
    });
    return CounterState();
  }

  void incrementByTen() {
    state.numberOfTimesChanged++;
    state.currentValue = state.currentValue + 10;
    print('test increment');
    ref.notifyListeners();
  }

  void decrementByTen() {
    state.numberOfTimesChanged++;
    state.currentValue = state.currentValue - 10;
    print('test decrement');
    ref.notifyListeners();
  }

  @override
  String toString() {
    return 'Current value is ${state.currentValue}\nNumber of times it changed is ${state.numberOfTimesChanged}';
  }
}

class CounterState {
  int numberOfTimesChanged = 0;
  int currentValue = 0;
}
