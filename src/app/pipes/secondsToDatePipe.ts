import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'secondsToHoursMinutesSeconds'
})
export class SecondsToDatePipe implements PipeTransform {
    transform(value: number): string {
        var hours = Math.floor(value / 3600),
            minutes = Math.floor((value % 3600) / 60),
            seconds = Math.floor(value % 60);

        return this.padTime(hours) + ":" + this.padTime(minutes) + ":" + this.padTime(seconds);
    }

    public padTime(t: any) {
        return t < 10 ? "0" + t : t;
    }
}