import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { customIncrement, updateChannelName } from 'src/app/counter/state/counter.actions';
import { getChannelName } from 'src/app/counter/state/counter.selectors';
import { CounterState } from 'src/app/counter/state/counter.state';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.css']
})
export class CustomCounterInputComponent  implements OnInit{ 

  value!:number;
   

  constructor(private store: Store<AppState>){

  }
  ngOnInit(): void {
   
  }

  onAdd(){
    this.store.dispatch(customIncrement({value:+this.value}));    
  }

  changeChannelName(){
    this.store.dispatch(updateChannelName({value:"new channel name"}));
  }

}
