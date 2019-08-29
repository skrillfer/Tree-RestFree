import {observable} from '../middleware/firebase/rxfirebase.utils.js';

observable.subscribe({
    next(value) { console.log('value', value); }
  });
  