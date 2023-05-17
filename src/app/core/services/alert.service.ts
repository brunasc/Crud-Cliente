import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  notifier = new EventEmitter<any>()

  notify(type: string, message: string): void {
    const event = {
      type: type,
      message: message
    }

    this.notifier.emit(event)
  }
}

