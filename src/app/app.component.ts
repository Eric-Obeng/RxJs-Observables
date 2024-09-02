import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { of, from, interval, take, concat, throwError, concatMap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'RxJs-Observables';
  private favoriteColors = ['red', 'green', 'blue', 'pink', 'white'];

  constructor() {
    // using the 'of' operator
    const numberObservable$ = of(1, 2, 3, 4, 5);

    numberObservable$.subscribe({
      next: (value) => console.log('Emmited value', value),
      error: (error) => console.error('Error', Error),
      complete: () => console.log('Observable Completed'),
    });

    // using the 'from' operator
    const colorObservable$ = from(this.favoriteColors);

    colorObservable$.subscribe({
      next: (color) => console.log('Favorite color:', color),
      error: (error) => console.error('Error', Error),
      complete: () => console.log('Color Observable Completed'),
    });

    // using the 'interval' operator
    const secondsObservable$ = interval(1000);
    const fiveSecondsObservable$ = secondsObservable$.pipe(take(5));

    fiveSecondsObservable$.subscribe({
      next: (value) => console.log('Second:', value + 1),
      error: (error) => console.error('Error', Error),
      complete: () => console.log('Five Seconds Observable Completed'),
    });

    // using the 'concate' operator
    const firstObservable$ = of(1, 2, 3);
    const secondObservable$ = from(['a', 'b', 'c']);
    const combinedObservaable$ = concat(firstObservable$, secondObservable$);

    combinedObservaable$.subscribe({
      next: (value) => console.log('Combined value:', value),
      error: (error) => console.error('Error', Error),
      complete: () => console.log('Combined Observable Completed'),
    });

    // Error handling
    const errorObservable$ = of(1, 2, 3).pipe(
      concatMap((value) => {
        if (value === 3) {
          return throwError('An Error occurred after emitting 3');
        }
        return of(value);
      })
    );

    errorObservable$.subscribe({
      next: (value) => console.log('Emmited value:', value),
      error: (error) => console.error(error),
      complete: () => console.log('Error Observable completed'),
    });
  }
}
